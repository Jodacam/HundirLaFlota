/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author jd.campos
 */
public class WebSocketManager extends TextWebSocketHandler  {
    
Gson JsonMapper = new Gson();
ConcurrentHashMap<String, Function> Funciones;
ConcurrentHashMap<Integer,Partida> Partidas;
Integer id = 0;
    public WebSocketManager() {
        this.Funciones = new ConcurrentHashMap<String, Function>();
        this.Partidas = new ConcurrentHashMap<Integer,Partida>();
        
        this.Funciones.put("FuncionBuscarPartida", new Function(){   
            public void ExecuteAction(String[] params,WebSocketSession session){
                for(Map.Entry<Integer, Partida> p: Partidas.entrySet()){
                    if(!p.getValue().Iniciada()){
                        try {
                            p.getValue().IniciarPartida(session,id-1);
                        } catch (IOException ex) {
                            Logger.getLogger(WebSocketManager.class.getName()).log(Level.SEVERE, null, ex);
                        }
                    }
                
                }
                
                    Partidas.put(id,new Partida(session));
                    id++;
            } 
        });
        
        this.Funciones.put("FuncionDestruirPartida", new Function(){
            public void ExecuteAction(String[] params, WebSocketSession session){
                Partidas.remove(Integer.parseInt(params[0]));
            }
        });
        
        this.Funciones.put("FuncionHit", new Function(){   
            public void ExecuteAction(String[] params,WebSocketSession session){
                System.out.print(params[0]);
            } 
        });
        
        this.Funciones.put("FuncionReturnHit", new Function(){   
            public void ExecuteAction(String[] params,WebSocketSession session){
                System.out.print(params[0]);
            } 
        });
        
    }
        
    
    @Override
    protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception {
        String msg = message.getPayload();
        Instruccion i = JsonMapper.fromJson(msg, Instruccion.class);
         Function f = Funciones.get(i.getTipo());
        f.ExecuteAction(i.getParams(),session);
    }    
}
