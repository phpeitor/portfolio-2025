# Reglas Frontend y WebGL

Este documento resume criterios prácticos para trabajar en la UI, assets 3D y experiencia WebGL del portfolio.

## Principios Visuales

- Mantener el lenguaje visual existente: cartoon, limpio, low-poly, alto contraste y formas legibles.
- No introducir assets realistas si conviven con modelos estilizados como avatar, room o objetos de escritorio.
- En miniatura, la silueta debe entenderse rápido. Si no se reconoce en captura, el asset no sirve aunque sea técnicamente correcto.
- Priorizar consistencia con `room.glb`, `avatar.glb`, `lab.glb` y `contact.glb`.

## Vue y Componentes

- Usar Vue 3 con `<script setup>`.
- Mantener componentes pequeños y alineados con los patrones existentes.
- Evitar helpers nuevos si el cambio cabe claramente en el componente actual.
- Respetar nombres y estructura del proyecto: componentes en PascalCase, utilidades en `src/utils/`, features en `src/features/`.
- Para cambios visuales, probar desktop y mobile.

## SCSS

- Usar los estilos globales de `src/assets/styles/`.
- Los mixins están disponibles por configuración de Vite; no duplicar mixins locales.
- Preferir variables y tokens existentes antes de introducir colores nuevos.
- Evitar CSS genérico que pueda romper transiciones o capas WebGL.

## Animaciones

- GSAP controla timelines, scroll triggers y ticker.
- Revisar `src/animations/transitions/` antes de cambiar estados de secciones.
- Los pesos de escenas viven en `src/animations/scenes.ts`.
- Los waypoints de cámara viven en `src/animations/waypoints-data.ts`.
- No mover objetos WebGL sin entender si dependen de `sceneWeights`, `waypointsPosition`, `waypointsRotation` o `aboutProgress`.

## Uso de GLB

- Registrar todo GLB en `src/sources.ts`.
- Usar `type: "gltfModel"` para `.glb` y `.gltf`.
- Acceder al modelo con `resources.items["resource-name"]`.
- Clonar modelos antes de agregarlos a escena.
- Para modelos con skeleton, usar `SkeletonUtils.clone`.
- Para modelos estáticos, usar `resource.scene.clone(true)`.
- Normalizar centro/suelo con `Box3` si el asset viene desplazado.
- No asumir orientación: validar si el modelo es `Y-up`, `Z-up` o si tiene rotaciones internas.
- Si el GLB usa `EXT_meshopt_compression`, asegurar `MeshoptDecoder` en `src/utils/resources.ts`.

## Requisitos Para Nuevos Modelos

- Formato preferido: `.glb`.
- Estilo: cartoon, low-poly o compatible con el portfolio.
- Escala: razonable y consistente con avatar/room.
- Origen: centrado en la base del objeto cuando sea posible.
- Orientación: `Y-up`.
- Materiales: embebidos o simples; evitar dependencias externas rotas.
- Nombres de nodos/meshes: descriptivos cuando se necesite manipular partes.

## Texturas y Materiales

- Mantener texturas en `src/assets/textures/` si son compartidas.
- Usar `LinearSRGBColorSpace`/`SRGBColorSpace` siguiendo el patrón existente.
- Para matcaps del avatar, revisar `src/three/objects/avatar/index.ts`.
- Para room, revisar `src/three/common/materials.ts` y `room.webp`.
- No reutilizar el atlas del room en modelos externos si genera artefactos visuales.

## Shaders

- Shaders GLSL viven en `src/three/shaders/`.
- Vite compila GLSL mediante `vite-plugin-glsl`.
- Mantener uniformes simples y explícitos.
- Si un shader afecta transparencia o depth, revisar `depthWrite`, `depthTest`, `renderOrder` y `transparent`.

## Interactividad WebGL

- Hitboxes clickables usan `Box3` y `raycast.boxesToCheck`.
- Al destruir objetos, remover su caja de `raycast.boxesToCheck`.
- Mantener `tick()` barato; evitar crear geometrías/materiales/vectores pesados cada frame si no es necesario.
- Reutilizar `Vector3`, `Box3`, `Euler` y objetos temporales cuando se actualicen en ticker.

## Capturas y Revisión Visual

- Usar `capturas/` para comparar iteraciones visuales.
- Para cambios de posición, escala, orientación o visibilidad de GLB, validar con capturas antes de cerrar.
- Nombrar capturas de prueba de forma descriptiva, por ejemplo `php-logo-chest-final.png`.

## Checklist Antes de Entregar

- Ejecutar `npm run typecheck`.
- Ejecutar `npm run build`.
- Revisar visualmente desktop.
- Revisar visualmente mobile si el cambio toca layout o cámara.
- Confirmar que no aparecen errores en consola.
- Confirmar que modelos GLB cargan correctamente y no bloquean el preloader.

## Errores Comunes

- GLB comprimido sin decoder: configurar `MeshoptDecoder` en el `GLTFLoader`.
- Modelo acostado: revisar eje vertical (`Y-up` vs `Z-up`).
- Modelo invisible: revisar escala, centro, `frustumCulled`, `depthTest`, `renderOrder` y materiales transparentes.
- Logo o mesh desplazado: revisar si la geometría interna está lejos del origen y centrar con `Box3`.
- Asset no coincide con el proyecto: buscar un GLB cartoon/low-poly antes de intentar recrearlo con primitivas.
