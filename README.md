# HLF Online
___
## Índice
1. Desarrolladores y Créditos
2. Descripción del Juego
3. Funcionamiento en el Cliente
4. Funcionamiento en el lado del Servidor
5. Diagrama de Juego
6. Diagrama de clases
7. Instrucciones de ejecución
8. Protocolo de WebSockets
9. Desmostración
___
## 1 Desarrolladores y Créditos
#### Pablo Rodríguez  
[p.rodriguezvic@alumnos.urjc.es](p.rodriguezvic@alumnos.urjc.es)  
pabloski300
#### Jose Daniel Campos  
[jd.campos@alumnos.urjc.es](jd.campos@alumnos.urjc.es)  
Jodacam
#### Kevin Carrasco  
[k.carrasco@alumnos.urjc.es](k.carrasco@alumnos.urjc.es)  
Brisingeros
___
## 2 Descripción del Juego
HLF son las siglas para "Hundir la Flota". Nuestro juego consiste en la reproducción del Clásico juego de mesa normalmente conocido como "Los barquitos".
El juego se divide en dos fases.  
En la primera fase colocamos nuestros barcos sobre un tablero de 10x10 casillas. Cada barco ocupa un número de posiciones en el tablero de juego, pudiendo ser en línea horizontal o en vertical.  
En la segunda fase los jugadores se irán turnando, tratando de hundir todos los barcos del contrincante eligiendo cada vez una casilla a la que disparar. Si no acierta, se le indicará que ha tocado agua; si por el contrario, alcanzase un barco se le indicaría que ha acertado. Si un barco es alcanzado en todas sus casillas se le indicará al jugador que ha hundido un barco.  
El juego acabará cuando uno de los jugadores haya hundido todos los barcos del oponente.
___
## 3 Funcionamiento en el Cliente
El Videojuego estará implementado en JavaScript del lado del cliente.  
Cuando abramos el videojuego mediante nuestro navegador web se le mostrará al jugardor el Menú principal. Allí podra buscar partidas con otros jugadores.  
Una vez haya encontrado una partida con otro jugador comenzará la Fase 1 de Hundir la flota. Al jugador se le mostrará su tablero y los barcos. Para colocarlos tendrá que hacer click en uno de los barcos y arrastrarlos en la posición del tablero que se deseé. También podrá hacerlos girar con el click derecho para colocarlos en diferentes posiciones. Una vez haya colocado todos los barcos en su posición, podra hacer click en el botón de confirmar y esperará a que el otro jugador haga lo mismo, comenzando la segunda fase del juego.  
En la segunda fase del juego, los jugadores; en su turno; seleccionarán la casilla al que quieran disparar y la confirmarán mediante el boton de pasar turno.  
Si consigue acertar se mostrará un tick verde en esa casilla; si por el contrario falla, se mostrará un tick rojo. Si consigue hundir un barco, un recuadro verde rodeará todas las casillas pertenecientes a este.
El jugador que consiga hundir todos los barcos del oponente será el vencedor, poniendo fin a la partida y regresando ambos jugadores al menú principal.
___
## 4 Funcionamiento en el lado del Servidor
Los jugadores enviarán y recibirán datos entre ellos. Al final de la primera fase del juego los dos jugadores esperarán la señal del servidor de que los dos jugadores han confirmado sus tableros.
Después del turno de cada jugador, se enviarán los datos de la posicion del disparo que recibirá el otro jugador, que devolvera si ha acertado o no pasando a ser su turno.
Tambien se implementará un chat para conversar entre ellos.
___
## 5 Diagrama de Juego
![Pantalla1](/Diagrama/Captura.PNG "Pantalla 1")
La primera pantalla que encontrará el usuario constará de un menú, donde podrá elegir entre iniciar el juego (Pantalla 3) o revisar la table de puntuaciones (Pantalla 2). Esta pantalla irá acompañada de la canción "Danger Storm - Kevin Macleod".   
![Pantalla2](/Diagrama/Captura2.PNG "Pantalla 2")
Una de las pantallas accesibles desde el menú es la tabla de puntuaciones que se obtienen al final de cada partida. Incluye un botón para regresar a la pantalla menú (Pantalla 1).   
![Pantalla3](/Diagrama/Captura3.PNG "Pantalla 3")
Consta del escenario inicial de juego, que corresponde a la "Fase 1". El jugador deberá colocar sus barcos en el tablero correspondiente, pudiendo rotarlos con la tecla "R", tal como se le indica con diversos textos. Esta y las siguientes pantallas van acompañadas de la canción "Crossing the Chasm - Kevin Macleod".   
![Pantalla4](/Diagrama/Captura4.PNG "Pantalla 4")
Corresponde al final de la "Fase 1", apareciendo un botón que da inicio a la "Fase 2", donde el jugador deberá hacer click sobre el tablero enemigo para eliminar sus barcos, a la vez que una IA trata de acabar con su flota. Puede desembocar en victoria (Pantalla 5) o derrota (Pantalla 6).   
![Pantalla5](/Diagrama/Captura5.PNG "Pantalla 5")
![Pantalla6](/Diagrama/Captura6.PNG "Pantalla 6")
Ambas pantallas muestran el fin de la "Fase 2", ya corresponda la victoria al jugador o a la IA. Esto se indicará con un mensaje en la esquina inferior izquierda, junto con los puntos obtenidos en esta partida. Dos botones acompañan a estas pantallas: El primero para dar comienzo de nuevo al juego (Pantalla 3), y el segundo para regresar al menú (Pantalla 1).   
![Pantalla7](/Diagrama/Captura7.PNG "Pantalla 7")
A partir de la Fase 3, al finalizar el juego, aparece un cuadro de inserción de texto, pidiendo un nombre al usuario. Esto permitirá almacenar su puntuación actual asociada a su nick.   
![Diagrama](/Diagrama/DiagramaJR.PNG "Diagrama")
___
## 6 Diagrama de clases
![Diagrama2](/Diagrama/Diagrama_UML.PNG "Diagrama UML")  
Nuestra API REST tiene un único @RestController que maneja un objeto "Puntuaciones", compuesto a su vez de un array de objetos "Puntuacion". Implementa una petición GET, que solicita la totalidad del top 10 de puntuaciones; y un método POST, que almacena una nueva puntuación y ordena de mayor a menor el array de puntuaciones.   
___
## 7 Instrucciones de ejecución
Para ejecutar la Aplicacion HLFOnline hay que realizar los pasos siguientes:
1. Primero descargamos el codigo fuente de https://github.com/Jodacam/HundirLaFlota.
2. Descomprimimos el archivo zip.
3. Dentro de Desarrollo/target abrimos la consola de comandos.
4. Escribimos java -jar HLFOnline-1.0.jar.
5. Esperamos hasta que la consola deje de escribir.
6. Abrimos nuestro navegador y escrbimos la url localhost:8080
7. Comenzamos a jugar.
___
## 8 Protocolo de WebSockets
El cliente y el servidor se comunican intercambiando mensajes mediante websockets durante el transcurso de la partida. La información de cada mensaje esta estructurada en dos partes:
La primera es el nombre de la función que se ha de ejecutar y la segunda contiene los parametros de esa función en forma de strings.   
Al recibir un mensaje tanto el servidor como el cliente lo transforman en un objeto, ya que el mensaje tiene un formato JSON, después con el atributo tipo se selecciona la función correspondiente mediante una colección de esas funciones y se ejecuta.
___
## 9 Demostración
[![Video](/Diagrama/Video.PNG "Video")](https://www.youtube.com/watch?v=FOmyoDLA3jM&feature=youtu.be)