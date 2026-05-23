# Portfolio Vue

[![forthebadge](https://forthebadge.com/badges/made-with-vue.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

Portfolio personal interactivo con secciones animadas, proyectos, audio, WebGL y escenas 3D. El sitio combina UI en Vue con una escena `three.js` que contiene habitación, avatar, laboratorio/contacto, modelos GLB, shaders GLSL, sonidos y transiciones controladas por scroll.

## Stack

- Vue 3 con `<script setup>`
- TypeScript
- Vite
- SCSS con mixins globales desde `src/assets/styles/mixins.scss`
- three.js para modelos, escenas, materiales, raycast y shaders
- GSAP para timelines, scroll y ticker
- Lenis para smooth scroll
- Howler para audio
- `vite-plugin-glsl` para importar shaders `.glsl`

## Requisitos

- Node.js compatible con Vite 7
- npm

El proyecto usa `type: "module"`, así que los scripts y módulos corren como ESM.

## Instalación

```bash
npm install
```

## Levantar en desarrollo

```bash
npm run dev
```

El servidor corre en `http://localhost:3000`.

La configuración está en `vite.config.ts`:

- Puerto fijo `3000`
- `strictPort: true`
- `host: true`
- Soporte de assets para `.glb`, `.gltf`, `.obj`, `.mtl`, imágenes, audio y shaders

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levanta Vite en desarrollo |
| `npm run typecheck` | Ejecuta `vue-tsc -b` |
| `npm run build` | Typecheck y build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |

## Estructura Principal

| Ruta | Uso |
| --- | --- |
| `src/main.ts` | Entrada de la app |
| `src/App.vue` | Composición principal |
| `src/components/` | Componentes UI reutilizables |
| `src/features/` | Secciones de alto nivel del sitio |
| `src/content/` | Contenido de proyectos, previews, textos y social links |
| `src/i18n/` | Helpers de idioma |
| `src/animations/` | Timelines, escenas, waypoints y transiciones |
| `src/three/` | Core WebGL, objetos 3D, materiales, shaders, raycast |
| `src/assets/` | Modelos, texturas, estilos, sonidos, videos e imágenes |
| `capturas/` | Capturas manuales usadas para revisión visual |

## Recursos 3D y Assets

Todos los recursos cargados por la experiencia WebGL se registran en `src/sources.ts`.

Ejemplos actuales:

- `avatar-model`: `src/assets/models/avatar.glb`
- `room-model`: `src/assets/models/room.glb`
- `lab-model`: `src/assets/models/lab.glb`
- `contact-model`: `src/assets/models/contact.glb`
- `elephant-model`: `src/assets/elephant/demo.glb`
- `php-logo-model`: `src/assets/elephant/php.glb`

El loader vive en `src/utils/resources.ts` y soporta:

- `gltfModel` con `GLTFLoader`
- `objModel` con `OBJLoader` y fallback de `.mtl`
- `texture` con `TextureLoader`

Los GLB comprimidos con meshopt requieren `MeshoptDecoder`, ya configurado en `src/utils/resources.ts`.

## Escenas WebGL

Las escenas se ponderan con `sceneWeights` y `sceneWeightsInOut` en `src/animations/scenes.ts`.

Estados principales:

- `hero`: habitación inicial con persona sentada
- `about`: transición a avatar/lab
- `about-1`: primer estado de About
- `about-2`: segundo estado de About
- `projects`: zona de proyectos
- `contact`: contacto

Los puntos de cámara para landscape/portrait están en `src/animations/waypoints-data.ts`.

## Objetos Importantes

- `src/three/objects/room/`: habitación, elementos interactivos, elefante, música, mouse, desktops.
- `src/three/objects/avatar/`: avatar, animaciones, face, desktop izquierdo y logo PHP.
- `src/three/objects/lab/`: escena holográfica/laboratorio.
- `src/three/objects/contact/`: escena de contacto.

## Flujo Para Cambiar Modelos GLB

1. Agregar el archivo en `src/assets/...`.
2. Importarlo en `src/sources.ts`.
3. Registrar el recurso con un nombre estable.
4. Usarlo desde `resources.items["nombre-del-recurso"]` después de que el loader esté listo.
5. Clonar modelos con `resource.scene.clone(true)` o `SkeletonUtils.clone` si tienen skeleton.
6. Normalizar escala, centro y orientación con `Box3` antes de posicionarlo.
7. Ejecutar `npm run typecheck` y `npm run build`.

## Contenido de Proyectos

- Proyectos por idioma: `src/content/projects/{en,de}/<slug>.ts`
- Previews/listado: `src/content/projects/previews/`
- IDs y slugs: `src/content/projects/index.ts`
- Tags y variantes visuales: `src/components/tagVariants.ts`

Los slugs deben mantenerse consistentes entre previews, contenido y `projectIds`.

## Audio

Los sonidos y música están en `src/assets/sounds/` y `src/assets/music/`.

La lógica de audio usa Howler y utilidades bajo `src/features/sounds/`.

## Estilos

Los estilos globales viven en `src/assets/styles/`.

Vite inyecta automáticamente:

```scss
@use "/src/assets/styles/mixins.scss";
```

Por eso los componentes pueden usar mixins compartidos sin importar el archivo manualmente.

## Verificación Antes de Entregar Cambios

```bash
npm run typecheck
npm run build
```

Para cambios visuales, revisar también en navegador en `http://localhost:3000` y crear capturas en `capturas/` cuando el cambio sea de layout, WebGL o animación.

## Notas de Mantenimiento

- No modificar modelos/escenas a ciegas: revisar primero `src/sources.ts`, `src/three/objects/*` y las capturas existentes.
- Los modelos grandes impactan el bundle; preferir GLB optimizados.
- Para assets GLB externos, preferir modelos `Y-up`, centrados en origen y con escala razonable.
- Si el GLB viene comprimido con meshopt, mantener `MeshoptDecoder` configurado.
- El diseño visual de los modelos debe coincidir con el estilo cartoon/low-poly del portfolio.
