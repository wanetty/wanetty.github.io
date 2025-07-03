# Wanetty Blog - Instrucciones para Agentes de IA

Este archivo sirve como guía para agentes de IA que trabajen con este repositorio de blog desarrollado con Astro.

## Comandos Principales

### Desarrollo y Construcción
- **Desarrollo local**: `npm run dev` o `npm start` - Inicia el servidor de desarrollo de Astro
- **Construcción**: `npm run build` - Ejecuta la verificación de tipos y construye el proyecto
- **Vista previa**: `npm run preview` - Construye el proyecto y sirve los archivos con Wrangler Pages
- **Despliegue**: `npm run deploy` - Construye el proyecto y despliega en Cloudflare Pages

### Otros Comandos Útiles
- **Astro CLI**: `npm run astro` - Acceso directo al CLI de Astro
- **Generación de tipos Cloudflare**: `npm run cf-typegen` - Genera tipos de TypeScript para Cloudflare

## Arquitectura del Proyecto

### Tecnologías Principales
- **Astro**: Framework web principal para renderizado
- **Tailwind CSS**: Framework de utilidades CSS para estilización
- **Cloudflare Pages**: Plataforma de despliegue
- **Soporte i18n**: Internacionalización integrada para español e inglés

### Estructura de Directorios
- `/src/components/`: Componentes Astro reutilizables
- `/src/content/posts/`: Contenido del blog en formato Markdown
- `/src/i18n/`: Archivos de traducción y utilidades
- `/src/layouts/`: Plantillas de diseño para las páginas
- `/src/pages/`: Rutas de la aplicación
- `/public/static/blog/img/`: Imágenes para los posts del blog

### Layouts
- **Layout.astro**: Layout base para páginas regulares del sitio
- **MDLayout.astro**: Layout específico para los posts en Markdown, incluye:
  - Metadatos estructurados Schema.org para SEO
  - Botón de regreso a la página anterior
  - Formato para título, fecha, autor y categoría
  - Visualización de etiquetas (tags)
  - Botones para compartir en redes sociales
  - Animaciones de transición entre páginas

## Sistema de Contenido

### Esquema de Posts
Cada post del blog debe incluir estos metadatos en su frontmatter:
```md
---
title: Título del Post
description: Descripción detallada para SEO
snippetone: Texto resumen breve
category: Categoría del post
SEOTitle: Título para SEO
lang: es|en (código de idioma)
date: YYYY-MM-DD
---
```

### Internacionalización
- El idioma predeterminado es español (`es`)
- Los posts en inglés llevan el sufijo `_en` y los españoles `_es`
- La configuración i18n se maneja en `/src/i18n/` con traducciones en archivos JSON
- Las rutas en inglés utilizan el prefijo `/en/`

## Convenciones y Estilos

### Estructura de Posts
- Los posts están organizados en pares (español/inglés) con el mismo nombre base
- Las imágenes de posts se almacenan en `/public/static/blog/img/`
- Se recomienda el uso de Markdown para formatear el contenido con secciones claras
- El contenido Markdown se renderiza utilizando el sistema de colecciones de Astro
- Las clases de Tailwind para el contenido Markdown se aplican mediante la clase `prose`
- Para bloques de código, utilizar la sintaxis de Markdown con tres comillas invertidas y el nombre del lenguaje

### Rutas de Navegación
- Los posts individuales siguen el patrón `/post/[id]` o `/en/post/[id]`
- Existe una página 404 personalizada para cada idioma

## Despliegue
- El proyecto se despliega en Cloudflare Pages
- Se genera automáticamente un sitemap para SEO con las configuraciones adecuadas
- La rama de producción es `cloudfare`
