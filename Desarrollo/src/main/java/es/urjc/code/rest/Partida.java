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
    
    Partida(WebSocketSession jugador){
        this.jugador1 = jugador;
    }
    
    public boolean Iniciada(){
        return jugador2 !=null;
    }
    
    public void IniciarPartida(WebSocketSession jugador,Integer id) throws IOException{
        jugador2=jugador;
        jugador2.sendMessage(new TextMessage("{\"tipo\":\"FuncionIniciarPartida\",\"params\":["+id+","+ 2 +"]}"));
        jugador1.sendMessage(new TextMessage("{\"tipo\":\"FuncionIniciarPartida\",\"params\":["+id+","+ 1 +"]}"));
    }
    
    //Getters & Setters
    public WebSocketSession getPlayer1(){
        return jugador1;
    }
    
    public void setPlayer1(WebSocketSession jugador){
        jugador1 = jugador;
    }
    
    public WebSocketSession getPlayer2(){
        return jugador2;
    }
    
    public void setPlayer2(WebSocketSession jugador){
        jugador2 = jugador;
    }
    
}
