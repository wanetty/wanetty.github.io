---
layout: /src/layouts/MDLayout.astro
title: Upgopher, Un Análisis Rápido de un Servidor de Archivos Ligero y Eficiente
description: Este artículo ofrece un análisis rápido de Upgopher, un servidor web simple que permite la subida y administración de archivos, y que está diseñado para ser ejecutado tanto en entornos locales como remotos, maximizando la portabilidad y minimizando los problemas de compatibilidad.
---

![Logo de Upgopher](/static/blog/img/logoper.webp)

## ¿Por qué Upgopher?

Las soluciones convencionales para el manejo de archivos suelen apoyarse en scripts de Python, especialmente por la facilidad con la que se puede configurar un servidor HTTP con `python3 -m http.server`. Sin embargo, este enfoque presenta varias limitaciones importantes:

- **Sin Autenticación:** El servidor básico de Python no tiene opciones de autenticación, lo cual lo hace inseguro si se necesita restringir el acceso a ciertos usuarios.
- **Exploración y Gestión Limitadas:** No permite subir archivos, no tiene exploración efectiva de subcarpetas, ni ofrece opciones para gestionar archivos más allá de servirlos.
- **Falta de Seguridad:** Al no tener soporte para HTTPS de manera nativa, el tráfico no está cifrado, exponiendo los datos a riesgos innecesarios.

**Upgopher** resuelve estos inconvenientes al estar desarrollado en Go, generando binarios autónomos que funcionan sin necesidad de dependencias externas. Esto permite implementar el servidor de manera directa en cualquier plataforma compatible con Go, añadiendo funcionalidades clave que simplifican el proceso de compartir y gestionar archivos.

### Upgopher para Pentesters y Seguridad

Una de las motivaciones clave para crear Upgopher fue simplificar el proceso de transferencia de archivos en contextos específicos, como durante auditorías de seguridad. En particular, los **pentesters** suelen necesitar herramientas que faciliten la transferencia rápida de archivos, tanto para subir payloads a sistemas remotos como para exfiltrar información de manera efectiva.

Por ejemplo, imagina que necesitas subir un archivo a un servidor al que acabas de ganar acceso, pero no deseas instalar dependencias complicadas o quieres evitar problemas de compatibilidad en un sistema operativo particular. Con Upgopher, puedes compilar el binario adecuado para esa máquina y ejecutarlo, facilitando así la transferencia de ficheros de forma rápida y sin complicaciones.

Otra situación común para los pentesters es la necesidad de descargar información obtenida durante la fase de explotación. Upgopher también permite la descarga sencilla de archivos, proporcionando un listado de los archivos disponibles en el servidor, sin depender de servicios externos o métodos engorrosos para transferir archivos entre redes.

## Características Técnicas de Upgopher

A continuación, exploraremos las características técnicas más relevantes de Upgopher:

- **Subida de Archivos Simplificada:** Los usuarios pueden subir archivos mediante una interfaz web muy simple, seleccionando el archivo y haciendo clic en el botón de "Subir". Los archivos subidos se almacenan por defecto en el directorio `uploads`, aunque se puede modificar mediante el flag `-dir`.
- **Exploración de Carpetas y Subcarpetas:** Upgopher permite la exploración del contenido almacenado en el servidor, incluyendo la navegación por subcarpetas. Esto es ideal para gestionar de manera ordenada los archivos subidos sin necesidad de interactuar directamente con el sistema de archivos subyacente.
- **Autenticación Básica:** Para entornos donde se requiere cierto nivel de seguridad, Upgopher ofrece autenticación básica, habilitada a través de los flags `-user` y `-pass`, lo cual asegura que solo los usuarios autorizados puedan acceder al contenido.
- **Descarga de Todo en un ZIP:** Una característica útil para ahorrar tiempo es la posibilidad de descargar todo el contenido de un directorio como un archivo ZIP. Esto es particularmente práctico cuando se necesita transferir una gran cantidad de archivos de una sola vez.
- **HTTPS Opcional:** La seguridad es un punto importante, por lo que Upgopher puede utilizar conexiones HTTPS mediante un certificado proporcionado por el usuario o generando un certificado autofirmado con el flag `-ssl`. Esto protege los archivos durante la transmisión.
- **Modo de Construcción Cross-Platform:** Gracias al uso de Go, se pueden generar binarios para cualquier sistema operativo compatible, lo que lo hace una excelente opción para desplegar servidores de archivos de manera flexible y portátil.
- **Configuracion Rápida:** Cada vez que lo ejecutas puedes cambiar múltiples parámetros, como el directorio de subida, el puerto, la autenticación básica, si permites ver ficheros ocultos, etc.

## Cómo Desplegar Upgopher

Existen varias formas de desplegar Upgopher dependiendo de las necesidades del entorno.

### Instalación Automática

La manera más sencilla de instalar Upgopher es utilizando `go install`. Con solo ejecutar el siguiente comando, podemos obtener una versión lista para ser utilizada si ya tenemos Go instalado:
```bash
go install github.com/wanetty/upgopher@latest
```

### Construcción desde el Código Fuente

Para quienes prefieran tener un mayor control sobre el proceso de despliegue, también es posible clonar el repositorio y construir el proyecto manualmente:
```bash
git clone https://github.com/wanetty/upgopher.git
cd upgopher
go build 
```
Esto permite a los usuarios compilar Upgopher para sus plataformas específicas, generando un binario adecuado para sus necesidades.

### Docker

El despliegue mediante Docker también está soportado, lo que es ideal en ambientes donde se buscan implementaciones consistentes y fácilmente replicables:
```bash
docker build . -t upgopher
docker run --name upgopher -p 9090:9090 upgopher
```
Esto facilita la implementación en infraestructuras ya basadas en contenedores y permite manejar instancias aisladas del servidor.

### Releases

La versión actual de Upgopher se encuentra disponible en la [página de releases](https://github.com/wanetty/upgopher/releases) del repositorio de GitHub. Estas versiones se compilan automáticamente y se pueden descargar directamente desde la página de releases.

## Análisis de Uso y Casos de Aplicación

### Casos de Uso Comunes

**Upgopher** resulta especialmente útil en situaciones donde se requiere un servidor de archivos rápido, sin la necesidad de una configuración compleja:
- **Ambientes de Desarrollo:** Ideal para compartir recursos entre desarrolladores dentro de una misma red sin tener que pasar por configuraciones tediosas.
- **Auditorías de Seguridad y Pentesting:** Como pentester, necesitas herramientas rápidas y portátiles. Upgopher te permite subir archivos a máquinas comprometidas sin problemas de compatibilidad y de manera muy discreta, gracias a su diseño ligero y a la capacidad de compilar binarios cross-platform.
- **Pequeñas Infraestructuras Locales:** Para quienes deseen un servidor de archivos para su red doméstica o para una pequeña oficina, sin tener que depender de servicios en la nube o configuraciones complejas.
- **Descargas Masivas y Organizadas:** La capacidad de descargar todo el contenido de un directorio en un archivo ZIP permite ahorrar tiempo y facilita la transferencia masiva de archivos sin procesos complicados.

### Ejemplo de Uso

A continuación, podemos ver un ejemplo de uso de Upgopher, que se realiza en nuestra máquina local.

![Ejemplo de Uso de Upgopher](/static/blog/img/ejemplo_ejecucion_upgopher.webp)

Seguidamente vemos como podemos acceder a la interfaz web de Upgopher, que nos permite subir archivos, descargarlos, eliminarlos, navegar por directorios y descargar archivos en formato ZIP.

![Interfaz web de Upgopher](/static/blog/img/interfaz_web_upgopher.webp)


### Limitaciones y Consideraciones

Aunque Upgopher es una solución efectiva para muchas situaciones, tiene algunas limitaciones inherentes a su simplicidad:
- **Seguridad Limitada:** Aunque soporta autenticación básica y HTTPS, no está pensado para ser un reemplazo de soluciones de alta seguridad. Para entornos donde la privacidad es crítica, se deben considerar métodos adicionales de protección.
- **Funcionalidad Restrictiva:** Upgopher está diseñado para ser simple y directo, lo cual es una ventaja en ciertos contextos, pero podría no ser suficiente para implementaciones que requieran características avanzadas de gestión de archivos, como permisos granulares o integraciones con otros servicios.

## Conclusión

**Upgopher** se presenta como una herramienta robusta y sencilla para resolver la necesidad de un servidor de archivos liviano y multiplataforma. Su desarrollo en Go lo hace idóneo para aquellos que buscan minimizar la dependencia de librerías y evitar los problemas comunes relacionados con el uso de Python en este contexto.

Aunque no pretende ser una solución compleja, su enfoque en la simplicidad y facilidad de uso lo convierten en una opción atractiva para una amplia variedad de casos. Desde ambientes de desarrollo hasta auditorías de seguridad y pequeñas oficinas, Upgopher ofrece una manera eficiente y rápida de compartir y gestionar archivos.

Para aprender más o contribuir al proyecto, puedes visitar el [repositorio de GitHub](https://github.com/wanetty/upgopher).

Si tienes preguntas técnicas o deseas discutir sobre posibles mejoras, también puedes encontrarme en Twitter como [@gm_eduard](https://twitter.com/gm_eduard/).
