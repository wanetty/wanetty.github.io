---
title: PoFish, un docker para el phishing
description: Últimamente he realizado varios intentos de phishing. Por una cosa u otra he tenido que realizar la misma configuración de las mismas aplicaciones en diferentes entornos. Por este motivo he creado un DockerFile que una vez construido se puede desplegar con diferentes opciones para realizar un ejercicio de phishing.
snippetone: Tools
category: Tools
SEOTitle: PoFish
lang: es
date: 2023-07-01
---

Repo: [Github Repo](https://github.com/wanetty/PoFish)


## Introducción

<p style="text-align: justify;">

Últimamente he realizado varios intentos de phishing. Por una cosa u otra he tenido que realizar la misma configuración de las mismas aplicaciones en diferentes entornos. Por este motivo he creado un DockerFile que una vez construido, se puede desplegar con diferentes opciones para realizar un ejercicio de phishing.

## Requisitos previos
<p style="text-align: justify;">
Normalmente cuando vamos a realizar un ataque de phishing, lo que nos interesa para obtener un buen resultado es que los correos lleguen a la bandeja de entrada. Para ello tenemos que tener un dominio que tenga la máxima «reputación» posible (hay muchas webs que hablan de cómo elegir el mejor dominio). 
Una vez que tenemos el dominio y un registro DNS, necesitamos un VPS con una IP pública a la que asociar este dominio.</p> <p
Con la ejecución de este DockerFile es posible enviar correos sin tener que cumplir con lo anterior, pero es muy probable que los correos vayan directamente a SPAM.

## Construyendo el docker
<p style="text-align: justify;">
Lo primero que hay que hacer antes de construir el docker es clonar el repositorio docker. Para ello simplemente tenemos que hacer lo siguiente: 
</p>

<p style="text-align: justify;">
Once we have cloned it we simply have to access inside the directory and execute the following command:
</p>

```docker build -t pofish .```
<p style="text-align: justify;">
Simplemente con estas dos líneas ya tenemos una imagen docker lista para ser desplegada.
</p>
### Detalles
<p style="text-align: justify;">
El proceso de construcción se puede enumerar en 3 fases:
</p>
1. Descargar postfix + añadir configuración.
2. Descargando la última versión de gophish, eliminando las cabeceras de gophish (para evitar su detección) y compilando.
3. Instalación de OpenDkim, para poder firmar los correos.

## Despliegue
<p style="text-align: justify;">
Para poder desplegar la imagen es muy sencillo, lo único que tenemos que saber es el Dominio que queremos utilizar y nuestra IP pública. Además debemos saber que para poder acceder a GoPhish debemos exponer el puerto 3333 y en el caso de querer exponer el propio servidor debemos exponer también el puerto 80.

</p>

```bash
docker run -it --name pofish -p 80:80 -p 3333:3333 --env DOMAIN=<yourdomain> --env PUBLIC_IP=<your_public_ip> pofish
```


## Postdespliegue
<p style="text-align: justify;">
Una vez que hemos deplorado la imagen podemos ver como arranca el servicio postfix, el openkdim que es el que nos firma el mensaje también y propuso que gophish también.</p>
<p style="text-align: justify;">
En el caso de gophish veremos la contraseña que debemos utilizar la primera vez que iniciemos sesión en el panel de administrador.</p> <p><strong>Información después del despliegue</strong>.

![Información después del despliegue](/static/blog/img/pofish1.png)
<p style="text-align: justify;">
Una vez desplegado el contenedor, para que se pueda comprobar fácilmente el dkim que hemos generado, es necesario añadir una entrada TXT a nuestro registro DNS. Para obtener lo que hay que añadir podemos escribir en un terminal el siguiente comando:
</p>

```docker exec pofish cat /etc/opendkim/keys/<yourdomain>/202109.txt```
<p style="text-align: justify;">
Un ejemplo de cómo debe quedar es el siguiente:
</p>

![clave DKIM extraída del contenedor](/static/blog/img/pofish2.png)

```text
202109._ejemplo. com | TXT | v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyg9WF/gtyztDW3YuDI/i+y6K+GabxUWQ3wgNCimk8zdmwlYST4KgdvZAbgT9dHjNcccKOUtj/UhvnYsr1PBuY4EHebXreQOM/C9J0gBfr/OAHEGmBq6zsxutXQ/Pv8Z6yKC1UTfpjJra3lhBGdTCZPiRLuznU/YeoFza8KrpU0ROWJYLm733BjdK3NO4IB4LdZy1KHacanTbhIVvKLBB43pfjtfzA6tPSm1bbYF5Dm2o8lATnNLY3+QmqTHlGyFQ5phJhg9VPSsXuW/WZFH15WUp2U3FzPCYlfrT/3xm+LxXMpBi2WOK1DOxrAEJPwaF3fSYX4AOQJ06naSNof0S+QIDAQAB
```
<p style="text-align: justify;">
Una vez que se ha propagado por la red podemos comprobar que nuestro dkim es válido de la siguiente manera:
</p>

https://www.dmarcanalyzer.com/es/dkim-3/dkim-record-check/

### Otros registros TXT a tener en cuenta
<p style="text-align: justify;">
En definitiva, recomiendo añadir el SPF también a los registros DNS. Aquí tienes un pequeño asistente sobre cómo configurarlo.
</p>

_Ejemplo:_
```text
v=spf1 mx a ip4:ip.ip.ip.ip ?all
```

https://www.spfwizard.net

<p style="text-align: justify;">
Y por último DMARC. Básicamente esto te dice qué política seguir en caso de que tu correo haya sido manipulado. Muchas veces te ponen en la lista negra por no tener este registro añadido.
</p>

_Ejemplo:_

```text
_dmarc IN («v=DMARC1; p=quarantine; rua=mailto:admin@example.org»)
```

## GoPhish
<p style="text-align: justify;">
En caso de que quieras saber más sobre el funcionamiento de esta herramienta, te recomiendo acudir a su documentación oficial. Para probar que los correos se envían correctamente, lo mejor es ir al navegador y acceder a la ip https://127.0.0.1:3333, que es donde estará nuestro panel de administrador e introducir usuario y contraseña que hemos visto anteriormente.</p>

<p style="text-align: justify;">
El siguiente paso será cambiar la contraseña, no creo que tengáis problemas con ellas.
</p>

![Panel principal de Gophish](/static/blog/img/pofish3.png)

<p style="text-align: justify;">
Entramos en la configuración como se muestra a continuación y pulsamos en enviar un email de prueba. Recomiendo hacerlo a un email de 10 minutos, ya que si nos detectan pruebas, es muy probable que acabe en una lista negra.
</p>

![Configuración del Perfil de Envío](/static/blog/img/pofish4.png)

![Enviar correo de prueba](/static/blog/img/pofish5.png )
  
![Correo en bandeja de entrada](/static/blog/img/pofish6.png )

## Enlaces de interés

https://book.hacktricks.xyz/phishing-methodology
https://mxtoolbox.com

<p style="text-align: justify;">
Espero que haya quedado claro. Si tienes alguna pregunta, no dudes en ponerte en contacto conmigo a través de las redes sociales.
</p>