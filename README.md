# HLF Online
___
## Índice
1. Desarrolladores y Créditos
2. Descripción del Juego
3. Funcionamiento en el Cliente
4. Funcionamiento en el lado del Servidor
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


