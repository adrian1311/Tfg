Este es el proyecto que se ha desarrollado como parte del TFG de Adrian Nikolaev Ivanov.

Consiste en que cada residente del centro de mayores contará con un dispositivo vestible que recogerá su actividad.
Los pasos registrados en la pulsera se sincronizarán mediante la tecnología bluetooth
con la aplicación Zepp Life que se encargará de guardar la actividad realizada.
De ahí se transferirán a Google Fit, otra aplicación de actividad conectada con una base
de datos en la nube. Los pasos del residente se subirán a dicha base de datos de manera
constante y mediante el servicio desarrollado en Express, se podrán recuperar
realizando la autenticación con el protocolo OAuth 2.0.
Disponiendo de los datos de actividad habrá posibilidad de visualizar diferentes gráficas
en la interfaz de usuario desarrollada en VueJs. Para poder tener varios residentes,
existe la necesidad de realizar un registro de cada uno. Esto se ejecutará mediante el
servicio desarrollado en Spring, que será el encargado de trabajar con la base de datos
del sistema.