"use strict";
        var fallos = 0;
        var acierto = 0;
        var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

        var sound = document.getElementById("music");
        sound.volume = 0.2;

        var explosion = document.getElementById("explosion");
        explosion.volume = 0.4;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function Celda(x, y) {
            var posX;
            var posY;

            var rect;

            var colorA;
            var colorB;

            var barco = null;

            this.pintar = function(){
                bmd.rect(rect.x-2, rect.y-2, rect.width+4, rect.height+4, colorB);
                bmd.rect(rect.x+2, rect.y+2, rect.width-4, rect.height-4, colorA);
                bmd.addToWorld();
            };
            this.pintarHundidos = function () {              
                bmd.rect(rect.x - 2, rect.y - 2, rect.width + 4, rect.height + 4, colorB);
                bmd.rect(rect.x + 2, rect.y + 2, rect.width - 4, rect.height - 4, colorA);
                bmd.addToWorld();
            }
            //Getters
            this.getPosX = function(){
                return posX;
            };

            this.getPosY = function(){
                return posY;
            };

            this.getColorA = function(){
                return colorA;
            };

            this.getColorB = function(){
                return colorB;
            };

            this.getRect = function(){
                return rect;
            };

            this.getBarco = function(){
                return barco;
            };

            //Setters
            this.setPosX = function(x){
                posX = x;
            };

            this.setPosY = function(y){
                posY = y;
            };

            this.setColorA = function(a){
                colorA = a;
            };

            this.setColorB = function(b){
                colorB = b;
            };

            this.setRect = function(){
                rect = new Phaser.Rectangle(posX, posY, anchoTablero / 10, anchoTablero / 10);
                
            };

            this.setBarco = function (barca) {
                barco = barca;
            };
        };

        function CeldaA(x, y){
            Celda.call(this, x, y);

            this.setColorA('#0099ff');
            this.setColorB('#FFFFFF');

            var offsetX = (game.width) / 2 + 40;
            var offsetY = (game.height - anchoTablero) / 2;

            var marcado = false;

            this.setPosX(x + offsetX);
            this.setPosY(y + offsetY);

            this.setRect();

            this.getMarcado = function () {
                return marcado;
            }

            this.setMarcado = function (mecagoendios) {
                marcado = mecagoendios;
            }
        };

        function CeldaE(x, y){
            Celda.call(this, x, y);

            this.setColorA('#00ff99');
            this.setColorB('#000000');

            var offsetX = (game.width - anchoTablero * 2) / 2 - 40;
            var offsetY = (game.height - anchoTablero) / 2;

            var marcado = false;

            this.setPosX(x + offsetX);
            this.setPosY(y + offsetY);

            this.setRect();  
            
            this.getMarcado = function(){
                return marcado;
            }

            this.setMarcado = function (mecagoendios) {
                marcado = mecagoendios;
            }
        };

        function Tablero() {
            var tablero = new Array(10);

            for (var i = 0; i < 10; i++)
                tablero[i] = new Array(10);

            this.pintar = function(i, j){
                for(var i = 0; i < 10; i++){
                    for(var j = 0; j < 10; j++){
                        tablero[i][j].pintar();
                    }
                }
            };

            //Getters
            this.getTablero = function(){
                return tablero;
            };
        };

        function TableroA(){
            Tablero.call(this);
            var that = this;
            this.generar = function(){
                for (var i = 0; i < 10; i++){
                    for (var j = 0; j < 10; j++){
                        this.getTablero()[i][j] = new CeldaA(i * anchoTablero / 10, j * anchoTablero / 10);
                    }
                }
            }
            this.checkRectangle = function (barco) {

                for (var i = 0; i < this.getTablero().length; i++) {
                    for (var j = 0; j < this.getTablero()[i].length; j++) {

                        var rect = this.getTablero()[i][j].getRect();

                        if (Phaser.Rectangle.contains(rect, game.input.x, game.input.y)) {
                            if (this.checkCasillasAdyacente(i,j,barco.getAngle(),barco.getCeldas())) {
                                barco.changePosition(rect.x + (anchoTablero / 20), rect.y + (anchoTablero / 20));

                                if (barco.getAngle() === 0) {
                                    for (var v = 0; v < barco.getCeldas(); v++) {
                                        this.getTablero()[i][j + v].setBarco(barco);
                                        barco.setPosParteBarco(i, j + v, v);
                                    }
                                } else if (barco.getAngle() === -90) {
                                    for (var h = 0; h < barco.getCeldas() ; h++) {
                                        this.getTablero()[i + h][j].setBarco(barco);
                                        barco.setPosParteBarco(i + h, j, h);
                                    }
                                }

                                //Comprobamos si todos los barcos se han colocado
                                colocados();

                                return true;

                            }else
                                return false;
                        }    
                    }
                }
                return true;
            }

            this.checkCasillasAdyacente = function (x, y, angle, nzelda) {
                if (angle === 0) {
                    for (var v = 0; v < nzelda ; v++)
                        if (this.getTablero()[x][y + v].getBarco() != null)
                            return false;
                } else {
                    for (var v = 0; v < nzelda ; v++)
                        if (this.getTablero()[x + v][y].getBarco() != null)
                            return false;
                }
                return true;

            }

            this.checkRectangleIA = function () {
                do{
                    var i = Math.floor(Math.random() * 10);
                    var j = Math.floor(Math.random() * 10);

                    var casilla = that.getTablero()[i][j];
                    var rect = casilla.getRect();

                    if (!casilla.getMarcado()) {

                        //Aqui iria la funcion que manda las coordenadas del Input y dependiendo de si hemos acertado o no, nos devolvera un true o false
                        if (ComprobarEnemigoIA(i, j)) {
                            //Funcion que pone en verde la casilla si hemos acertado
                            var sprite = game.add.sprite(rect.centerX, rect.centerY, 'acierto');
                            sprite.anchor.setTo(0.5, 0.5);    //colocamos el centro del sprite
                            sprite.width = anchoTablero / 10;
                            sprite.height = (anchoTablero / 10);
                            flota.add(sprite);
                            ahogarIA = ahogarIA - 1;

                        } else {
                            var sprite = game.add.sprite(rect.centerX, rect.centerY, 'fallo');
                            sprite.anchor.setTo(0.5, 0.5);    //colocamos el centro del sprite
                            sprite.width = anchoTablero / 10;
                            sprite.height = (anchoTablero / 10);
                            flota.add(sprite);
                        }
                        
                    }
                } while (casilla.getMarcado());

                casilla.setMarcado(true);

                if(ahogarIA === 0){
                    gameState = LOSE;
                    var puntuacion = (acierto - fallos) * 100;
                    game.add.text(16, window.innerHeight-100, '¡Has Perdido! Tu Puntuación Final es: ' + puntuacion, { fontSize: '30px', fill: '#000' });
                } else{
                    gameState = PART_TWO;   
                }
            }
        };

        function TableroE(){
            Tablero.call(this);

            this.generar = function(){
                for (var i = 0; i < 10; i++){
                    for (var j = 0; j < 10; j++){
                        this.getTablero()[i][j] = new CeldaE(i * anchoTablero / 10, j * anchoTablero / 10);
                    }
                }
            }
            this.checkRectangle = function () {

                for (var i = 0; i < this.getTablero().length; i++) {
                    for (var j = 0; j < this.getTablero()[i].length; j++) {

                        var casilla = this.getTablero()[i][j];
                        var rect = casilla.getRect();
                        
                        if (Phaser.Rectangle.contains(rect, game.input.x, game.input.y) && !casilla.getMarcado()) {

                            //Aqui iria la funcion que manda las coordenadas del Input y dependiendo de si hemos acertado o no, nos devolvera un true o false
                            if (ComprobarEnemigo(i,j)){
                                //Funcion que pone en verde la casilla si hemos acertado
                                var sprite = game.add.sprite(rect.centerX, rect.centerY, 'acierto');
                                sprite.anchor.setTo(0.5, 0.5);    //colocamos el centro del sprite
                                sprite.width = anchoTablero / 10;
                                sprite.height = (anchoTablero / 10);
                                acierto++;
                                ahogar -= 1;
                                flota.add(sprite);
                                if(ahogar === 0){
                                    gameState = "win";
                                }

                            } else {
                                var sprite =game.add.sprite(rect.centerX, rect.centerY, 'fallo');
                                sprite.anchor.setTo(0.5, 0.5);    //colocamos el centro del sprite
                                sprite.width = anchoTablero / 10;
                                sprite.height = (anchoTablero / 10);
                                fallos++;
                                flota.add(sprite);

                            }
                            casilla.setMarcado(true);

                            if(ahogar === 0){
                                gameState = WIN;
                                var puntuacion = (acierto - fallos) * 100;
                                game.add.text(16, window.innerHeight - 100, '¡Has ganado! Tu Puntuación Final es: ' + puntuacion, { fontSize: '30px', fill: '#ffffff' });
                            } else{
                            gameState = WAIT;   
                            setTimeout(tableroAliado.checkRectangleIA, 600);
                            }
                            
                            return true;
                        }
                    }
                }
            }
        };

        function Barco(sprite, nceldas, x, y) {
            var horizontal = false;
            var barco = game.add.sprite(x, y, sprite);
            barco.anchor.setTo(0.5,0.5/nceldas);    //colocamos el centro del sprite
            barco.width = anchoTablero / 10;
            barco.height = (anchoTablero / 10) * nceldas;
            barco.inputEnabled = true;
            barco.input.start(0, true);
            barco.events.onInputDown.add(select, barco, 0, this);
            flota.add(barco);
            var numCel = nceldas;
            var partesViva = numCel;
            var partes = new Array(numCel);

            //var colocado = false;

            for (var i = 0; i < nceldas; i++) {
                partes[i] = new PartesBarco();
            }
            //funciones
            this.changePosition = function (x, y) {
                barco.x = x;
                barco.y = y;
            }
            this.rotate = function () {
                if (horizontal)
                    barco.angle = 0;
                else
                    barco.angle = -90;

                horizontal = !horizontal;
            }
            //Getters y Setters
            this.getNumCel = function(){
                return numCel;
            }
            this.getSprite = function () {
                return barco;
            }
            this.getAngle = function(){
                return barco.angle;
            }
            this.getCeldas = function(){
                return nceldas;
            }

            this.getColocado = function(){
                var col = partes[0].getX() !== null;

                return col;
            }

            this.setPosParteBarco = function(x,y,indice){
                partes[indice].setCelda(x,y);
            }

            this.exitZelda = function () {
                for (var p in partes) {
                    partes[p].SetCeldaToNone();
                }
            }
            this.ComprobarPartes = function(i,j){

                for (var p in partes) {
                    if (partes[p].ComprobarToque(i, j)) {
                        partesViva--;
                        if (partesViva === 0) {
                            for (var t in partes) {
                                partes[t].CambiarColor("#ffff00");
                                game.world.bringToTop(flota);
                            }
                        }
                        return true;

                    }
                }
                return false;
            }

            this.ComprobarPartesIA = function(i,j){

                for (var p in partes) {
                    if (partes[p].ComprobarToqueIA(i, j))
                        return true;
                }
                return false;
            }
        };

        function PartesBarco() {
            var x = null;
            var y = null;
            var Tocada = false;
            var TocadoIA = false;

            this.setCelda = function (posX, posY) {
                x = posX;
                y = posY;
            }

            this.SetCeldaToNone = function () {
                if (x != null)
                    tableroAliado.getTablero()[x][y].setBarco(null);
                x = null;
                y = null;
            }

            this.ComprobarToque = function (posx, posy) {               
                if (!Tocada)
                    return Tocada = (posx === x && posy === y);
                else
                    return false;
            }

            this.getX = function(){
                return x;
            }
            this.getY = function(){
                return y;
            }

            this.ComprobarToqueIA = function (posx, posy) {               
                if (!TocadoIA)
                    return TocadoIA = (posx === x && posy === y);
                else
                    return false;
            }
            this.CambiarColor = function (color) {
                tableroEnemigo.getTablero()[x][y].setColorA(color);
                tableroEnemigo.getTablero()[x][y].pintarHundidos();
                explosion.play();
            }
        }



        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //Herencia
        CeldaA.prototype = new Celda();
        CeldaE.prototype = new Celda();

        TableroA.prototype = new Tablero();
        TableroE.prototype = new Tablero();

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var tableroAliado;
        var tableroEnemigo;
        var bmd;
        var lienzo;
       
        //Grupo en el que colocar los barcos para visualizarlos sobre los tableros
        var flota;
        //Grupo para asignar al barco clicado y que se muestre sobre los demás
        var flotaClick;

        //variable para detectar si se ha clicado
        //Va a almacenar el barco que lleves clicado
        var clicado = null;

        //variables para rotar
        var Rotar;
        //var horizontal = false;
        var pulsado = false;

        //variable barco
        var arrayBarcos;

        //Textos y fondo
        var letreroAliado;
        var letreroEnemigo;
        var letreroR;
        var letreroI;
        var fondo;

        //Cuenta de barcos que quedan
        var ahogar = 0;
        var ahogarIA = 0;

        //Botones
        var button1;
        var button2;
        var button3;

        var anchura = window.innerWidth/2;
        var anchoTablero = anchura*0.6;
        var gameState ='';
        const PART_ONE = "parte1";
        const PART_TWO = 'parte2';
        const WIN = "win";
        const LOSE = "lose";
        const WAIT = 'espera';

        function preload(){
            game.load.image('barco2', 'images/Barco2Solo.png');
            game.load.image('barco3', 'images/Barco3Solo.png');
            game.load.image('barco4', 'images/Barco4Solo.png');
            game.load.image('sea', 'images/fondo.jpg');
            game.load.image('aliado', 'images/tablero_aliado.png');
            game.load.image('enemigo', 'images/tablero_enemigo.png');
            game.load.image('boton1', 'images/Boton1.png');
            game.load.image('boton2', 'images/Boton2.png');
            game.load.image('boton3', 'images/Boton3.png');
            game.load.image('acierto', 'images/acierto.png');
            game.load.image('fallo', 'images/fallo.png');
            game.load.image('info1', 'images/PressR.png');
            game.load.image('info2', 'images/TextTableroIndi.png');
        }

        function create() {
            //Para pintar los rect de las celdas
            gameState = PART_ONE;
            bmd = game.add.bitmapData(game.width, game.height);

            //Distintas formas de cambiar el fondo
            fondo = game.add.image(0,0, 'sea');
            fondo.width = game.width;
            fondo.height = game.height;

            //Crear grupo para mostrar los barcos por encima de los tableros
            flota = game.add.group();
            flotaClick = game.add.group();

            //Tableros
            tableroAliado = new TableroA();
            tableroEnemigo = new TableroE();
            tableroAliado.generar();
            tableroEnemigo.generar();

            //Textos
            letreroAliado = game.add.sprite(0, 0, 'aliado');
            letreroAliado.anchor.setTo(0.5,0.5);
            letreroAliado.width = anchoTablero /2;
            letreroAliado.height = anchoTablero /2.2;
            letreroAliado.x = anchura + anchoTablero/2;
            letreroAliado.y = game.height/2 - (anchoTablero/2) - letreroAliado.height/2.5;

            letreroEnemigo = game.add.sprite(0, 0, 'enemigo');
            letreroEnemigo.anchor.setTo(0.5,0.5);
            letreroEnemigo.width = anchoTablero /2;
            letreroEnemigo.height = anchoTablero /2.2;
            letreroEnemigo.x = anchura - anchoTablero/1.8;
            letreroEnemigo.y = game.height/2 - (anchoTablero/2) - letreroAliado.height/2.5;

            letreroR = game.add.sprite(0, 0, 'info1');
            letreroR.anchor.setTo(0.5,0.5);
            letreroR.width = anchoTablero /2.5;
            letreroR.height = anchoTablero /4.7;
            letreroR.x = anchura - anchoTablero*1.2 - 40;
            letreroR.y = 200;

            letreroI = game.add.sprite(0, 0, 'info2');
            letreroI.anchor.setTo(0.5,0.5);
            letreroI.width = anchoTablero /2.5;
            letreroI.height = anchoTablero /5.2;
            letreroI.x = anchura - anchoTablero*1.2 - 40;
            letreroI.y = 630;

            //Barcos
            arrayBarcos = new Array(6);
            arrayBarcos[0] = new Barco('barco2', 2, 50, 100);
            arrayBarcos[1] = new Barco('barco2', 2, 50, 250);
            arrayBarcos[2] = new Barco('barco3', 3, 50, 500);
            arrayBarcos[3] = new Barco('barco3', 3, 50, 700);
            arrayBarcos[4] = new Barco('barco4', 4, game.width - 65, 100);
            arrayBarcos[5] = new Barco('barco4', 4, game.width - 65, 400);

            //Inicializar los contadores
            for(var i = 0; i < arrayBarcos.length; i++){
                ahogar = ahogar + arrayBarcos[i].getNumCel();
            }
            ahogarIA = ahogar;

            //Botones
            //Boton fase2
            button1 = game.add.button(0, 0, 'boton1', function () { gameState = PART_TWO; game.world.remove(button1); startPart2(); }, this);
            button1.anchor.setTo(0.5,0.5);
            button1.height = anchoTablero/4;
            button1.width = anchoTablero/2;
            button1.y = game.height/2 + anchoTablero/1.5;
            button1.x = anchura;
            button1.visible = false;

            //Boton reinicio
            button2 = game.add.button(0, 0, 'boton2', function () { game.world.remove(button2); restart(); }, this);
            button2.anchor.setTo(0.5,0.5);
            button2.height = anchoTablero/4;
            button2.width = anchoTablero/2;
            button2.y = game.height/2.1 + anchoTablero/1.5;
            button2.x = anchura;
            button2.visible = false;
            
            //Boton parra salir al menú
            button3 = game.add.button(0, 0, 'boton3', function () { game.world.remove(button3); load(); }, this);
            button3.anchor.setTo(0.5,0.5);
            button3.height = anchoTablero/4;
            button3.width = anchoTablero/2;
            button3.y = game.height/1.8 + anchoTablero/1.5;
            button3.x = anchura;
            button3.visible = false;

            //flota.add(button1);

            //Pintar tableros
            tableroAliado.pintar();
            tableroEnemigo.pintar();

            //Asignación de tecla para rotación
            Rotar = game.input.keyboard.addKey(Phaser.Keyboard.R);

            game.world.bringToTop(flota);
            game.world.bringToTop(flotaClick);
            jQuery(document).click(function () {
                if (gameState === PART_TWO) {
                    tableroEnemigo.checkRectangle();

                }
            })
        }

        function restart(){
            location.reload();
        }

        function load(){
            location.replace("index.html")
        }

        ///Funciones de evento
        //No se corresponden con los parámetros de entrada
        function select(pointer,click,barco) {
            button1.visible = false;

            if(gameState === PART_ONE){
                if (clicado === null) {
                    clicado = barco;
                    clicado.exitZelda();

                    flotaClick.add(pointer);

                }else {
                    if(tableroAliado.checkRectangle(clicado)){
                        clicado = null;
                        flota.add(pointer);
                    }
                }
            }
            

        }

        function colocados(){
            var col = true;

            for(var i = 0; i < arrayBarcos.length && col; i++){
                col = arrayBarcos[i].getColocado();
            }
            
            if(col){
                //Mostrar botón empezar segunda parte////////////////////////////////////////////////
                button1.visible = true;
            }
        }

        function update() {
            
            if(gameState === PART_ONE){
                if (clicado !== null /*&& gameState === PART_ONE*/) {
                    clicado.changePosition(game.input.x, game.input.y);
                }
                //rotaciones fijas de 90º
                if (clicado !== null && Rotar.isDown && !pulsado) {
                        clicado.rotate();                    
                        pulsado = true;              
                }           
                if (Rotar.isUp)
                        pulsado = false;
            }

            if(gameState === WIN){
                button2.visible = true;
                button3.visible = true;
            }

            if(gameState === LOSE){
                button2.visible = true;
                button3.visible = true;
            }
        }
        //si se hace esto en la funcion de update no se renderiza
        function render(){
          
            
        }
        //Funcion solo para la parte sin red, rellena el tablero enemigo de barcos para comprobar.
        var tableroIA = new TableroA();

        function startPart2() {
            tableroIA = Object.assign({}, tableroAliado);
        }


        //Esto es una prueba
        function ComprobarEnemigo(i, j) {
            if (tableroAliado.getTablero()[i][j].getBarco() != null) {
                return tableroAliado.getTablero()[i][j].getBarco().ComprobarPartes(i,j);
            }
            return false;
        }

        function ComprobarEnemigoIA(i, j) {
            if (tableroIA.getTablero()[i][j].getBarco() != null) {
                return tableroIA.getTablero()[i][j].getBarco().ComprobarPartesIA(i, j);
            }
            return false;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////