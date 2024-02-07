---
layout: /src/layouts/MDLayout.astro
description: Lately I have been making several phishing attempts. For one thing or another I have had to perform the same configuration of the same applications in different environments. For this reason I have created a DockerFile which once built, can be deployed with different options to perform a phishing exercise.
---

# A new docker for phishing (PoFish)


Repo: [Github Repo](https://github.com/wanetty/PoFish)


## Introduction

<p style="text-align: justify;">
Lately I have been making several phishing attempts. For one thing or another I have had to perform the same configuration of the same applications in different environments. For this reason I have created a DockerFile which once built, can be deployed with different options to perform a phishing exercise.
</p>

## Prerequisites

<p style="text-align: justify;">
Normally when we are going to make a phishing attack, what we are interested in to obtain a good result is that the mails arrive in the inbox. For this we have to have a domain which has the maximum possible "reputation" (there are many sites that talk about how to choose the best domain). 

Once we have the domain and a DNS record, we need a VPS with a public IP to associate this domain with.</p>

_With the execution of this DockerFile it is possible to send mails without having to comply with the above, but it is very likely that the mails will go directly to SPAM._


## Building the docker

<p style="text-align: justify;">
The first thing to do before building the docker is to clone the docker repository. To do this we simply need to do the following: 
</p>

```bash
git clone https://github.com/wanetty/PoFish.git 
```
<p style="text-align: justify;">
Once we have cloned it we simply have to access inside the directory and execute the following command:
</p>

```docker build -t pofish .```
<p style="text-align: justify;">
Simply with these two lines we already have a docker image ready to be deployed.
</p>

### Details
<p style="text-align: justify;">
The construction process can be listed in 3 phases:
</p>

1. Downloading postfix + adding configuration.
2. Downloading the latest gophish version, removing gophish headers (to avoid detection) and compiling.
3. OpenDkim installation, to be able to sign the mails.

## Deployment

<p style="text-align: justify;">
To be able to deploy the image is very simple, the only thing we have to know is the Domain we want to use and our public IP. In addition we must know that in order to access GoPhish we must expose the port 3333 and in the case of wanting to expose the server itself we must also expose the port 80.
</p>

```bash
docker run -it --name pofish -p 80:80 -p 3333:3333 --env DOMAIN=<yourdomain> --env PUBLIC_IP=<your_public_ip> pofish
```


## Postdeployment

<p style="text-align: justify;">
Once we have deplored the image we can see how the postfix service starts, the openkdim that is the one who signs the message to us also and proposed that gophish also.</p>

<p style="text-align: justify;">
In the case of gophish we will see the password that we must use the first time we log in to the administrator panel.</p>


![Information after deployment](/static/blog/img/pofish1.png)

<p style="text-align: justify;">
Once we have deployed the container, so that the dkim we have generated can be easily checked, it is necessary to add a TXT entry to our DNS record. To get what needs to be added we can type in a terminal the following command:
</p>

```docker exec pofish cat /etc/opendkim/keys/<yourdomain>/202109.txt```
<p style="text-align: justify;">
An example of how it should look is as follows:
</p>

![DKIM key extracted from the container](/static/blog/img/pofish2.png)


```text
202109._example.com | TXT | v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyg9WF/gtyztDW3YuDI/i+y6K+GabxUWQ3wgNCimk8zdmwlYST4KgdvZAbgT9dHjNcccKOUtj/UhvnYsr1PBuY4EHebXreQOM/C9J0gBfr/OAHEGmBq6zsxutXQ/Pv8Z6yKC1UTfpjJra3lhBGdTCZPiRLuznU/YeoFza8KrpU0ROWJYLm733BjdK3NO4IB4LdZy1KHacanTbhIVvKLBB43pfjtfzA6tPSm1bbYF5Dm2o8lATnNLY3+QmqTHlGyFQ5phJhg9VPSsXuW/WZFH15WUp2U3FzPCYlfrT/3xm+LxXMpBi2WOK1DOxrAEJPwaF3fSYX4AOQJ06naSNof0S+QIDAQAB
```
<p style="text-align: justify;">
Once it has propagated through the network we can check that our dkim is valid as follows:
</p>

https://www.dmarcanalyzer.com/es/dkim-3/dkim-record-check/

### Other TXT records to consider

<p style="text-align: justify;">
In short, I recommend adding the SPF to the DNS records as well. Here is a small wizard on how to configure it.
</p>

_Example:_

```text
v=spf1 mx a ip4:ip.ip.ip.ip ?all
```

https://www.spfwizard.net
<p style="text-align: justify;">
And finally DMARC. Basically this tells you what policy to follow in case your mail has been tampered with. Many times you get blacklisted for not having this record added.
</p>

_Example:_

```text
_dmarc IN (“v=DMARC1; p=quarantine; rua=mailto:admin@example.org”)
```


## GoPhish

<p style="text-align: justify;">
In case you want to know more about how this tool works, I recommend going to its official documentation. In order to test that emails are sent correctly, it is best to go to the browser and access the ip https://127.0.0.1:3333, which is where our administrator panel will be and enter username and password that we have seen previously.</p>

<p style="text-align: justify;">
The next step will be to change the password, I do not think you will have problems with them.
</p>

![Main Panel of Gophish](/static/blog/img/pofish3.png)
<p style="text-align: justify;">
Enter the configuration as shown below and click on send a test email. I recommend to do it to a 10 minutes email, because if we are detected testing, it is very likely to end up in a blacklist.
</p>

![Settings of Sending Profile](/static/blog/img/pofish4.png)


![Sending Test Mail](/static/blog/img/pofish5.png)

  
![Mail in Inbox](/static/blog/img/pofish6.png)


## Interesting links

https://book.hacktricks.xyz/phishing-methodology

https://mxtoolbox.com

<p style="text-align: justify;">
I hope this is clear. If you have any questions, please do not hesitate to contact me via social networks.
</p>
