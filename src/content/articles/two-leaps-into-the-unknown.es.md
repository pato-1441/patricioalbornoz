---
title: Dos saltos al vacío
date: 2026-03-17
readTime: 12 min read
excerpt: Un año de decisiones difíciles, saltos al vacío y volver a empezar desde adentro de Autonoma.
coverImage: /two-leaps-into-the-unknown.png
coverAlt: Imagen de cabecera de Dos saltos al vacío.
ogImage: /og-two.webp
ogImageAlt: Open Graph image for Dos saltos al vacío.
pinned: true
published: true
---
Mudarse de ciudad y unirse a un founding team son dos saltos al vacío que se parecen más de lo que uno cree.

&nbsp;

Hace un año mi vida era bastante predecible.

Trabajaba en una empresa de más de 80 personas, con un buen equipo, procesos claros y un ritmo ordenado. Tenía reuniones diarias, tareas asignadas semana a semana, objetivos definidos. Cada semana sabía exactamente qué tenía que hacer.

Y, sin embargo, había algo que no estaba.

No era falta de desafío técnico. Tampoco era el equipo.
Era otra cosa más difícil de explicar: la sensación de que no estaba construyendo algo que realmente pudiera cambiar cómo el mundo funciona.

Una noche, como muchas otras, estaba en Twitter.
Ahí apareció un post de Tom Piaggio, CTO de Autonoma.

Hablaba de lo que estaban construyendo.

El problema me pegó inmediatamente. No porque fuera novedoso, sino porque era exactamente uno con el que me había cruzado muchas veces: los tests end-to-end.

&nbsp;

Siempre eran una fricción.
La inteligencia artificial empezaba a ayudar, pero todavía no existía algo que realmente acelerara el ritmo de trabajo de forma constante.

No pensé demasiado.

Pensé: **esto puede ser grande.**

No era la primera vez que sentía eso. Ya había pasado por un founding team antes, en Sirvana (hoy Melian). Sabía lo que implicaba: incertidumbre, intensidad, decisiones constantes.

Y aun así, decidí hacerlo de nuevo.

&nbsp;

## Un salto doble

El proceso fue rápido. Varias entrevistas en el transcurso de dos semanas.

La noche que me confirmaron que querían que me sume, sentí algo que hacía tiempo no sentía.

No era solo emoción.

Era más bien una sensación de estar alineado conmigo mismo.
Como si algo que tenía adentro volviera a encenderse.

Pero esta vez había algo distinto.

No era solo un cambio de trabajo.
También implicaba mudarme a *Buenos Aires*, dejar la ciudad donde nací, y dejar atrás todo un mundo que habitaba diariamente: familia, amigos, actividades, mi casa.

Era un salto doble.

&nbsp;

## Cinco personas y un producto a medio hacer

![Autonoma Office](https://pbs.twimg.com/media/Gm7VkYPWIAAAXrn?format=jpg&name=large "max-height=28rem")


A la semana de haber recibido el sí, me tomé un colectivo y fui a conocer al equipo.

La oficina estaba sobre la calle *Castañeda*, en el barrio de *Belgrano*.

Un solo ambiente.
Una mesa grande.
Dos cafeteras.
Un pizarrón.

Éramos cinco.

El producto existía, pero estaba lejos de ser un producto terminado.

Había una pantalla que llamábamos **Creation**.
Ahí se abría un navegador transmitido en tiempo real, donde cada interacción del usuario se guardaba como un paso. Después esos pasos se reproducían y validaban condiciones.

Era, en esencia, un test.
Pero sin código.

Funcionaba.
A medias.

Si soy honesto, en ese momento casi todo estaba verde:

la experiencia de usuario, la interfaz, la infraestructura, la API, el modelo de negocio.

No teníamos clientes como tal.
Teníamos design partners, pagando entre 199 y 499 dólares, ayudándonos a construir algo que todavía no terminábamos de entender del todo.

No había certezas.

Había algo más sutil.

Una especie de intuición compartida de que algo podía pasar.

&nbsp;

## Que se sienta bien

Mi primera semana fue bastante simple.

Agregué breadcrumbs.

No era una gran feature, pero empezaba a ordenar algo que todavía no lo estaba.

El corazón del producto era **Creation**, y era probablemente la parte más compleja: una mezcla de frontend, streaming, navegador, motor de ejecución y red que funcionaba, pero estaba completamente atada con alambre.

Intentamos construir una feature llamada **Checkpoint**, algo así como un punto de guardado en un juego: poder reproducir un test hasta cierto momento, modificarlo desde ahí y continuar.

Parecía simple.

Nos llevó tres semanas.

Y no funcionó como queríamos.

Ahí me hizo click algo importante:

> hacer algo simple no significa que sea fácil. Muchas veces, es exactamente al revés.

Trabajábamos todos los días conectados por Meet.

Teníamos un documento enorme, infinito, lleno de tareas, bugs, ideas, features.

Todo convivía en el mismo lugar.

Pero había algo que empezó a volverse evidente:

si queríamos que esto creciera, no alcanzaba con que funcione.

> Tenía que sentirse bien.

Ahí fue donde me metí de lleno.

No hicimos un rediseño de golpe.
No hubo un gran refactor.

Fueron cambios constantes, casi invisibles en el día a día.

El layout.
La navegación.
Las páginas.
Las interacciones.

Cada decisión apuntaba a lo mismo:

que el producto se sienta natural.

Que no tengas que pensar antes de hacer click.
Que entiendas lo que va a pasar sin tener que preguntarte.

Con el tiempo, eso empezó a acumularse.

Y mirando hacia atrás, el cambio fue enorme.

Rehicimos prácticamente todo.

La pantalla de creación, la vista de tests, las carpetas, el panel principal, los analytics, las integraciones, la configuración.
Incluso cómo nos mostrábamos en redes.

### Rehacer Creation

Uno de los cambios más grandes fue rehacer **Creation**.

Nos llevó meses.

Pero cuando finalmente empezó a funcionar bien, pasó algo interesante:

no solo destrabó el producto, sino que expuso más de 500 bugs que antes ni veíamos.

No porque no existieran.
Sino porque los usuarios no llegaban tan lejos.

En paralelo empezamos a mostrar lo que hacíamos.

Grabábamos demos.
Compartíamos avances.
Construíamos en público.

Eso generó algo que no esperábamos del todo:

feedback constante, visibilidad y una presión sana por hacer las cosas mejor.

&nbsp;

### El tramo de Vercel

![Vercel Installations Graph](https://pbs.twimg.com/media/G6nylbkWEAAKwvF?format=jpg&name=large)

Con el tiempo, empezaron a aparecer señales.

Clientes como NaranjaX, Ualá, Mercor, Superhuman.
El equipo creciendo.
Un viaje a *São Paulo*.

Y en el medio, una de las etapas más intensas del año:

la integración con **Vercel**.

Fueron semanas largas.
Horas y horas en Meet con todo el equipo, resolviendo problemas en tiempo real.

No había mucho espacio para pensar demasiado.
Era iterar, probar, romper y volver a intentar.

La integración salió.

Y hoy es la más instalada de todo el **Vercel Marketplace**.
Y la única construida en Argentina.

&nbsp;

## Cuando crecer no alcanza

Para ese momento, el producto había cambiado completamente.

Habíamos crecido **10x en ARR**.
Superado los **500.000 dólares**.

Todo indicaba que íbamos en la dirección correcta.

Y sin embargo, había algo que no cerraba.

Cuando empezamos a comparar lo que podía hacer una persona contra lo que podía hacer un agente, un sistema impulsado por inteligencia artificial capaz de ejecutar tareas de forma autónoma, la diferencia era demasiado grande.

El producto validaba algo importante: había valor.

Pero no era suficiente para el cambio que queríamos generar, especialmente en un contexto donde compañías como OpenAI, Anthropic y Google estaban empujando los límites todos los días.

Y ahí aparece una de las decisiones más difíciles de tomar:

> darte cuenta de que lo que construiste… no es el final.

Decidimos empezar de nuevo.

No porque lo anterior estuviera mal.
Sino porque no era lo que queríamos construir a largo plazo.

Desenamorarse de algo que funciona no es fácil.

Hay ansiedad.
Hay incertidumbre.
Hay momentos donde parece que estás tirando meses de trabajo.

Pero con el paso de las semanas aparece algo más:

la sensación de que estás más cerca de lo correcto.

&nbsp;

## El segundo salto

Este año tuvo varios saltos al vacío.

Mudarse de ciudad fue uno.
Volver a fundar algo fue otro.

Pero hay algo que aprendí:

ningún salto es igual al anterior.

Cada vez que lo hacés, llegás con algo más.

Más criterio.
Más intuición.
Más tolerancia al caos.

No lo hace fácil.
Pero sí distinto.

Hoy somos más.

Somos un equipo que creció de cinco a doce personas.
Trabajamos con empresas que hace un año parecían inalcanzables.

Y, más importante, estamos construyendo algo que todavía no sabemos exactamente cómo va a terminar.

Y eso está bien.

El último año me confirmó una vez más algo que vengo validando hace tiempo:

las cosas más importantes no nacen desde la comodidad.

Nacen cuando volvés al barro.

Cuando aceptás no tener todas las respuestas.
Cuando te permitís empezar de nuevo.

Y quizás lo más interesante de todo es esto:

que después de un año entero, con todo lo que pasó…

esta vez se siente distinto.
