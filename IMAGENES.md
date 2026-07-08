# Imágenes — de placeholder a fotos reales

Todas las imágenes del sitio son **placeholders de Unsplash**, elegidos y
verificados manualmente para que sean coherentes con un consultorio de
neurocirugía (se descartó explícitamente cualquier imagen de otra
especialidad, incluida una silla dental que aparecía en una versión anterior
del sitio). Cuando el cliente entregue fotos reales del consultorio, deben
reemplazarse siguiendo esta tabla.

## Recorrido inmersivo (`lib/data/scenes.ts`)

| Escena (minimapa)      | Placeholder actual                                                      | Archivo real esperado          | Notas |
|-------------------------|---------------------------------------------------------------------------|---------------------------------|-------|
| Recepción               | Recepción/estación de enfermería de una clínica                          | `recepcion.jpg`                 | Foto de la recepción real de Clínica San Felipe, Torre 2. Horizontal, buena luz. |
| Pasillo                 | Pasillo amplio y luminoso de clínica                                      | `pasillo.jpg`                   | Pasillo de acceso al consultorio 511. |
| Sala de procedimientos  | Quirófano equipado                                                        | `sala-procedimientos.jpg`       | Si no se puede fotografiar un quirófano real, usar una foto del equipo médico o instrumental del consultorio. |
| Consultorio             | Sala de consulta privada con ventana                                      | `consultorio.jpg`               | El propio consultorio del Dr. Paino, con escritorio o camilla de evaluación. |

Cada entrada vive en `lib/data/scenes.ts`, campo `image.src`. Para reemplazar:

1. Colocar el archivo real en `public/escenas/<archivo>.jpg` (crear la carpeta).
2. Cambiar `image.src` a `"/escenas/<archivo>.jpg"` (ruta local en vez de URL de Unsplash).
3. Si el `next.config.ts` solo permite `images.unsplash.com` como host remoto, las imágenes locales en `/public` no necesitan configuración adicional — `next/image` las sirve directo.

## Imagen de Open Graph / redes sociales

`app/opengraph-image.tsx` genera automáticamente una imagen de marca (fondo
oscuro + monograma + nombre) sin depender de una foto. Si se prefiere usar una
foto real del consultorio para compartir en WhatsApp/redes, se puede
reemplazar ese archivo por una imagen estática en `public/og.jpg` y actualizar
`openGraph.images` / `twitter.images` en `app/layout.tsx`.

## Favicon

`app/icon.tsx` y `app/apple-icon.tsx` generan un ícono con el monograma "JP".
Si el Dr. Paino tiene un logo o isotipo real, reemplazar estos archivos por
imágenes estáticas (`public/icon.png`, `public/apple-icon.png`) siguiendo la
convención de archivos de Next.js.
