# RESPONDIENDO PREGUNTAS HONESTIDAD

RESPUESTA A PREGUNTAS EN LA PARTE C DE LA SECCION DE IA


### 13. ¿Qué cosas devolvió la IA tal cual usaste y por qué confiabas en ellas?

considero que devolvia cosas como estructuras modeladas, que algunas veces no eran exactamente lo que buscaba para hacerlo, pero me daban una idea para yo poder avanzar con nuevas soluciones

### 14. ¿Qué cosas devolvió la IA que tuviste que corregir manualmente? Da al menos 2 ejemplos concretos.

puntualmente diria que el mapeo de los DTOS a modelos, le consulte la primera vez para ver si era igual en .net core, me dio la alternativa de una libreria pero se solucionaba mas facil de lo que se piensa
- le pregunte una cosa sobre la imagen de docker y no me supo responder, tuve que leer documentación

### 15. ¿Qué validaciones hiciste sobre el código generado? (ej: probaste el endpoint, revisaste SQL, leíste, seguridad)

hice pruebas de nulos, porque muchas veces eso es lo que mata los codigos, verifique que no se fuera la data mas importante con estado nulo y asi poder tener el flujo completo sin errores,
controlar la entrada de data mala con catalogos de responseCode es eficiente, me falto middlewares, pero debido al tiempo no pude completar, yo hubiera hecho un middleware que validara el dataentry
y en caso no viniese algo bien retornara un json response con responseCode y reasonText

### 16. ¿Encontraste algún bug, riesgo de seguridad o decisión cuestionable en el código generado? ¿Cómo lo detectaste?

para mi puntualmente la parte de manejar los parametros que necesitamos para hacer nuestras consultas en nuestras URL se me hace una mala práctica, debido a que es mas propenso
a la inyección de sql (la conocida SQL INJECTION) este es un error critico que puede comprometer la seguridad del sistema, y lo detecte siguiendo las buenas prácticas de desarrollo aprendidas,
yo lo hubiera manejado todo en el body, debido a que no era data tan sensible, en caso ser sensible, lo hubiese manejado en los Headers encriptado


### 17. Si tuvieras que volver a hacerlo, ¿qué prompt o estrategia cambiarías? ¿Por qué?

cambiaria el analisis del requerimiento y la estructura que se usa para definir las urls, por cuestiones de seguridad y para mayor esalabilidad