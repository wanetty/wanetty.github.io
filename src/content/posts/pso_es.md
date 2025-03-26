---
title: Políticas de seguridad de contraseñas (PSO) en Active Directory (AD)
description: Las políticas de seguridad de contraseñas (PSO) en Active Directory (AD) son un componente crítico en la infraestructura de seguridad de una red corporativa. Las PSO permiten a los administradores del sistema aplicar reglas estrictas y personalizadas para la creación y uso de contraseñas en toda la red, garantizando así que todos los usuarios se adhieran a las mejores prácticas de seguridad de la información.
snippetone: Technologias    
category: Technologias
SEOTitle: PSO
lang: es
date: 2023-08-04
---

## Introducción

Las Políticas de Seguridad de Contraseñas (PSO) en Active Directory (AD) son un componente crítico en la infraestructura de seguridad de una red corporativa. Las PSO permiten a los administradores de sistemas aplicar reglas estrictas y personalizadas para la creación y uso de contraseñas en toda la red, garantizando así que todos los usuarios se adhieran a las mejores prácticas de seguridad de la información.

## Herramientas y utilidades de PSO

Las PSO en AD ofrecen a los administradores la posibilidad de establecer requisitos de longitud, complejidad y antigüedad de las contraseñas. También permiten la implementación de políticas de bloqueo de cuentas después de un número específico de intentos fallidos de inicio de sesión, lo que puede ayudar a disuadir los ataques de fuerza bruta.

Es esencial señalar que las PSO son flexibles y pueden aplicarse a distintos niveles de la estructura de directorios, desde el nivel de dominio hasta unidades organizativas específicas o incluso usuarios individuales. Para la gestión de las PSO, Microsoft ofrece herramientas integradas en su plataforma, como la Consola de gestión de directivas de grupo (GPMC) y el Centro administrativo de Active Directory (ADAC).

Traducción realizada con la versión gratuita del traductor DeepL.com

## Las PSO en AD frente a las políticas de contraseñas tradicionales

Una de las principales ventajas de utilizar PSOs en AD es su integración nativa con la infraestructura de Windows, lo que facilita su despliegue y gestión. A diferencia de otras soluciones, las PSO permiten la aplicación de múltiples políticas de contraseñas en un único dominio, lo que proporciona un alto nivel de flexibilidad en la administración de la seguridad de las contraseñas.

En comparación, las políticas de contraseñas tradicionales que se aplican a nivel de dominio son menos flexibles, ya que aplican la misma política de contraseñas a todos los usuarios de un dominio. Aunque este método garantiza un nivel básico de seguridad, no tiene en cuenta los distintos niveles de roles de usuario y necesidades de seguridad dentro de una organización.

La implementación de PSO también ayuda a cumplir con varias normativas de seguridad de la información, como GDPR, ISO 27001 y PCI DSS, entre otras, que exigen controles estrictos sobre la gestión de contraseñas.



## Enumerando PSO: Una Guía para Profesionales de la Ciberseguridad

Enumerar las Políticas de Seguridad de Contraseñas (PSO) en un entorno Active Directory (AD) es crucial para los profesionales de la ciberseguridad. Esto permite a los administradores revisar y gestionar las PSO de forma efectiva, asegurándose de que se alinean con los estándares de seguridad de la organización. A continuación se explica cómo enumerar PSO en AD:

1. **Usando el Centro Administrativo de Directorio Activo (ADAC):** ADAC es una herramienta GUI en Windows Server que simplifica la administración de AD. Puede navegar a «Sistema» > «Contenedor de configuración de contraseñas» en el ADAC para ver y administrar todos los objetos PSO.

2. **Utilizando PowerShell:** PowerShell es un potente lenguaje de scripting y shell framework utilizado para la automatización de tareas y la gestión de la configuración. Puede enumerar PSO utilizando el cmdlet `Get-ADFineGrainedPasswordPolicy`. He aquí un ejemplo básico de cómo utilizar este cmdlet para enumerar todas las PSO:

```powershell
Import-Module ActiveDirectory
Get-ADFineGrainedPasswordPolicy -Filtro *
```




### Enumeración de OSP para equipos rojos: Utilizando Enfoques Alternativos

Como miembro de un equipo rojo, comprender y enumerar las políticas de seguridad de contraseñas (PSO) en Active Directory (AD) es una parte fundamental de sus tareas. Sin embargo, hay ocasiones en las que los métodos convencionales pueden no proporcionar la imagen completa. Por ejemplo, puede encontrarse con situaciones en las que la política de contraseñas observable no coincide con la política activa. Esta discrepancia puede dar lugar a confusión y a posibles vulnerabilidades.

Para enumerar y escudriñar eficazmente la OSP, es crucial utilizar enfoques alternativos. Una de estas poderosas herramientas a tu disposición, particularmente durante las pruebas de penetración, es [NetExec](https://github.com/Pennyw0rth/NetExec). NetExec es una navaja suiza para los profesionales de la seguridad ofensiva, útil para el reconocimiento y la explotación de vulnerabilidades de la red. Recientemente, se ha [añadido](https://github.com/mpgn/CrackMapExec/pull/3) un nuevo módulo a CME, diseñado específicamente para facilitar la enumeración de PSO en entornos AD.

![Módulo PSO ejecutado](/static/blog/img/pso_cme.png)

## Conclusiones

Las políticas de seguridad de contraseñas en Active Directory son una potente herramienta para mejorar la seguridad de las contraseñas de una organización. Ofrecen flexibilidad, integración y cumplimiento de las normativas de seguridad, lo que las convierte en una opción atractiva para los administradores de sistemas frente a las políticas de contraseñas tradicionales a nivel de dominio.

Es vital comprender que, aunque las PSO son una herramienta valiosa, deben formar parte de una estrategia de seguridad más amplia que incluya otras medidas, como la educación de los usuarios, la supervisión periódica de las cuentas y el uso de la autenticación multifactor, para garantizar una protección completa frente a las amenazas de ciberseguridad.
