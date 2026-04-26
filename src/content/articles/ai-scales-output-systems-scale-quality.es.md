---
title: La AI escala el output. Los sistemas escalan la calidad.
date: 2026-04-25
readTime: 10 min read
excerpt: Cómo un proceso invisible, un chiste llamado “la pateada” y un design system fallido nos llevaron a Blacklight; y por qué los sistemas son más importantes que nunca en la era de la AI.
coverImage: /ai-scales-output-systems-scale-quality.png
coverAlt: AI scales output. Systems scale quality.
published: true
---

Hubo un momento en el que algo empezó a sentirse raro, incluso cuando, en papel, todo parecía ir bien.

Estábamos shippeando más rápido que nunca. Nuevas features salían constantemente, a veces todos los días, y el equipo se movía con una velocidad que, desde afuera, se veía como progreso.

Y sin embargo, cuando te alejabas un poco y mirabas el producto en su conjunto, algo no terminaba de cerrar.

Cada pantalla nueva se sentía apenas distinta a la anterior. El spacing cambiaba. Las sombras variaban. Los border radius no eran consistentes. Los colores se corrían lo suficiente como para que toda la experiencia se sintiera fragmentada.

No estaba roto.

Pero tampoco estaba cohesivo.

Y detrás de eso, había un proceso que se estaba formando en silencio, uno que nunca diseñamos explícitamente, pero que igual terminó definiendo cómo trabajábamos.

&nbsp;

## La “pateada”

![La imagen que circulaba en el equipo cuando se venia una pateada](/pateada.jpg "max-height=28rem")

Dentro del equipo, le habíamos puesto un nombre a parte de ese proceso.

Le decíamos “la pateada”.

Había también un pequeño juego de palabras detrás. Mi apodo es “Pato”, y *patear* implica justamente eso: pegar una patada. Entonces “la pateada” era, en cierto punto, *Pato entrando al final a arreglar las cosas*.

Al principio era un chiste. Incluso se sentía como un rol.

Pero con el tiempo, se transformó en otra cosa.

Una feature se diseñaba, se implementaba, se shippeaba en un estado funcional… y después yo entraba a pulirla: ajustar spacing, ordenar jerarquías, alinear componentes, limpiar inconsistencias, llevarla más cerca de lo que debería haber sido desde el principio.

Al principio funcionaba.

El producto se veía mejor después de cada “pateada”.

Pero algo empezó a cambiar.

&nbsp;

> Lo que empezó como un chiste, lentamente se volvió parte del sistema.

&nbsp;

## Cuando arreglar se vuelve el sistema

El equipo se adaptó.

No de forma explícita, ni consciente, pero sí natural.

Las features empezaron a construirse con la idea implícita de que después se iban a pulir. La “pateada” dejó de ser una excepción y pasó a ser parte del flujo.

Sin darnos cuenta, habíamos introducido una etapa invisible:

**build → ship → arreglar después**

Y eso empezó a tener consecuencias.

Rehacíamos las mismas cosas una y otra vez.  
Yo me convertí en un bottleneck.  
Y más importante todavía: estábamos optimizando velocidad a costa de calidad.

Estábamos shippeando rápido.

Pero no estábamos shippeando bien.

Y con AI entrando en el flujo de trabajo, este problema no se mantiene lineal.

Se amplifica.

&nbsp;

> La AI acelera el output, pero no crea coherencia.

&nbsp;

## La solución obvia (que no lo era)

![Antigua Home de Autonoma hecha con Pond UI](/old-home.png "max-height=30rem")

Entonces hicimos lo que hacen la mayoría de los equipos.

Armamos un design system.

Lo llamamos *Pond UI*, y la idea era simple: tomar todos los componentes que ya teníamos, organizarlos y empezar a reutilizarlos de forma más estructurada.

Y, siendo justos, ayudó.

Ganamos algo de velocidad, algo de consistencia, algo de orden.

Pero algo seguía sin cerrar.

Porque Pond UI no era realmente un sistema.

Era un archivo.

&nbsp;

## No podés construir consistencia desde el caos

Cada componente venía de un momento distinto. De un contexto distinto, con una intención distinta, hecho por personas distintas.

No estábamos diseñando un sistema.

Estábamos agrupando sobras.

Y eso expone un problema más profundo.

&nbsp;

> No podés construir consistencia a partir de cosas que nunca fueron pensadas para ser consistentes.

&nbsp;

Un design system real no es solo un set de componentes reutilizables. Es un lenguaje compartido que codifica decisiones, intenciones y restricciones. Es lo que hace que, no importa quién construya algo, igual se sienta parte del mismo producto.

Alinea diseño, ingeniería y producto.

Y más importante todavía, te permite escalar sin perder calidad.

Ahí fue cuando algo hizo click.

&nbsp;

> Un design system no es algo a lo que migrás.  
> Es algo que diseñás desde cero.

&nbsp;

## Un producto distinto requiere un lenguaje distinto

Al mismo tiempo que esto se hacía evidente, el producto también estaba cambiando.

Autonoma v0 se sentía familiar. Estructurado. Predecible. Algo que podría encajar perfectamente dentro de una suite como Atlassian.

Pero lo que estábamos construyendo después no era eso.

Nos estábamos moviendo hacia un sistema de agents, algo más opinionated, más agresivo, más vivo. Un producto que explora tu codebase, encuentra cosas que no pediste explícitamente y actúa con cierto nivel de autonomía.

En ese punto, la diferencia ya no era solo visual.

Era conceptual.

Entonces, en lugar de iterar, tomamos una decisión.

Resetear.

&nbsp;

## El volantazo

![Preview de Blacklight](/blacklight-preview.png "max-height=30rem")

Cambiamos todo.

Dark mode como base.  
Chau sombras innecesarias.  
Chau discusiones eternas por píxeles.  
Primitivos más simples y coherentes.  
Nueva tipografía. Nuevos íconos. Nueva identidad.

Esto no era estética.

Era alineación.

&nbsp;

> La interfaz tenía que sentirse como el producto que estábamos construyendo.

&nbsp;

## Diseñar en movimiento

El proceso no fue limpio.

No salió de un Figma perfecto ni de un workflow definido. Fue el resultado de conversaciones, iteraciones y ajustes constantes.

Hablé con cada persona del equipo por separado, mostrando ideas iniciales, recibiendo feedback y ajustando la dirección en cada iteración. Cada versión incorporaba algo nuevo de la anterior.

El sistema se fue formando en diálogo.

No en prescripción.

Las herramientas reflejaban lo mismo. Papel, Jitter, DaVinci Resolve, referencias de otros productos, cualquiera que sirviera para avanzar, se usaba.

No había una forma “correcta”.

Había iteración.

&nbsp;

## Blacklight

En algún momento, necesitaba un nombre.

Nacho mencionó la idea de una blacklight, una luz que permite ver lo que no es visible a simple vista.

Resonó inmediatamente.

Porque eso es exactamente lo que hace el producto.

Y lo que habilita el sistema.

Así nació **Blacklight**.

&nbsp;

## Los sistemas no son estáticos

Uno de los errores más comunes con los design systems es pensar que están terminados.

No lo están.

Evolucionan con el producto.

![GIF de Agent Status](/agent-status.gif "max-height=28rem")

Un buen ejemplo fue el componente de **Agent Status**.

No existía al principio, pero apareció cuando necesitábamos visibilidad en tiempo real sobre lo que el agent estaba haciendo.

En lugar de quedar afuera, el sistema lo absorbió.

Se extendió.

Se adaptó.

&nbsp;

> El sistema no dictaba el producto.  
> El producto moldeaba el sistema.

&nbsp;

## La AI no resuelve el diseño

La AI cambia la velocidad a la que podés construir.

Pero no decide cómo deberían verse, sentirse o comportarse las cosas.

Sin un sistema, la AI multiplica la inconsistencia.

Pero con un sistema, todo cambia.

Podés generar UI dentro de restricciones.  
Podés codificar decisiones en documentación.  
Podés hacer que esas reglas estén disponibles para agentes.  

&nbsp;

> La AI no reemplaza el diseño.  
> Escala las decisiones que ya tomaste.

&nbsp;

## Escribirlo

En algún momento hicimos algo simple.

Lo escribimos.

No solo componentes, sino principios, reglas e intenciones, en un formato que pudiera ser consumido no solo por developers, sino también por agentes.

Eso cambió todo.

Porque el sistema dejó de vivir en personas.

Y empezó a vivir en el producto.

&nbsp;

## Diseñándome fuera del proceso

Y entonces pasó algo interesante.

El equipo mejoró.

Y lo hizo rápido.

Empezaron a shippear con mucha más calidad desde el inicio. Menos inconsistencias, menos retrabajo, menos necesidad de una “pateada” final.

La “pateada” empezó a desaparecer.

Y eso llevó a una realización medio irónica.

&nbsp;

> En cierto punto cavé mi propia tumba.

&nbsp;

Porque lo que antes hacía manualmente, ahora no era necesario.
Y ese es el punto.
Un buen sistema no te hace más rápido.
Te hace innecesario en los lugares donde no deberías ser necesario.

&nbsp;

## Pensamiento final

Los design systems muchas veces se entienden como UI kits o librerías de componentes.
Pero su valor real está en otro lado.
Codifican decisiones.  
Generan alineación.  
Permiten escalar.
Y en un mundo donde la AI está cada vez más presente en cómo se construyen productos, se vuelven todavía más críticos.

&nbsp;

> Porque si no diseñás el sistema,  
> lo que terminás diseñando es deuda.