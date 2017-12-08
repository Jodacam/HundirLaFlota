/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import java.io.IOException;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author p.rodriguezvic
 */
public class Partida {
    private WebSocketSession jugador1;
    private WebSocketSession jugador2 = null;
    private boolean j1Confirmado = false;
    private boolean j2Confirmado = false;
    
    Partida(WebSocketSession jugador){
        this.jugador1 = jugador;
    }
    
    public boolean Iniciada(){
        return jugador2 !=null;
    }
    
    public void IniciarPartida(WebSocketSession jugador,Integer id) throws IOException{
       this.jugador2=jugador;
       this.jugador2.sendMessage(new TextMessage("{\"tipo\":\"FuncionIniciarPartida\",\"params\":["+id+","+ 2 +"]}"));
       this.jugador1.sendMessage(new TextMessage("{\"tipo\":\"FuncionIniciarPartida\",\"params\":["+id+","+ 1 +"]}"));
    }
    
    //Getters & Setters
    public WebSocketSession getPlayer1(){
        return this.jugador1;
    }
    
    public void setPlayer1(WebSocketSession jugador){
        this.jugador1 = jugador;
    }
    
    public WebSocketSession getPlayer2(){
        return this.jugador2;
    }
    
    public void setPlayer2(WebSocketSession jugador){
        this.jugador2 = jugador;
    }
    public void Hit(int id, int posx, int posy) throws IOException{
        if (id == 1){
            this.jugador2.sendMessage(new TextMessage("{\"tipo\":\"FuncionRecibirHit\",\"params\":["+posx+","+posy+"]}"));
            }
        else {
            this.jugador1.sendMessage(new TextMessage("{\"tipo\":\"FuncionRecibirHit\",\"params\":["+posx+","+posy+"]}")); 
        }
    
    }
    public void Confirmar(int id) throws IOException{
        if (id == 1){
            this.j1Confirmado = true;
            }
        else {
            this.j2Confirmado = true;
        }
        
        if (this.j1Confirmado && this.j2Confirmado){
            this.jugador2.sendMessage(new TextMessage("{\"tipo\":\"FuncionCambiarFase\",\"params\":[\"espera\"]}"));
            this.jugador1.sendMessage(new TextMessage("{\"tipo\":\"FuncionCambiarFase\",\"params\":[\"parte2\"]}"));       
        }
    
    
    }
        public void ReturnHit(int id, int posx, int posy, boolean tocado, String celdasBarco) throws IOException{
        if (id == 1){
            this.jugador2.sendMessage(new TextMessage("{\"tipo\":\"FuncionComprobarAcierto\",\"params\":["+posx+","+posy+"," +tocado+"," + celdasBarco + "]}"));
            }
        else {
            this.jugador1.sendMessage(new TextMessage("{\"tipo\":\"FuncionComprobarAcierto\",\"params\":["+posx+","+posy+"," +tocado+"," + celdasBarco + "]}")); 
        }
    
    }
    
}
