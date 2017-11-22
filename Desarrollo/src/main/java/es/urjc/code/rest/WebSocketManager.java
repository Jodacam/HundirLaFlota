/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import com.google.gson.Gson;
import java.util.Hashtable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 *
 * @author jd.campos
 */
public class WebSocketManager extends TextWebSocketHandler  {
    
Gson JsonMapper = new Gson();
Hashtable<String, Function> Funciones;

    public WebSocketManager() {
        this.Funciones = new Hashtable<String, Function>();
        this.Funciones.put("FucionPrueba", new Function(){   public void ExecuteAction(String[] params){System.out.print(params[0]);} });
    }
        
    
@Override
protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception {
String msg = message.getPayload();
Instruccion i = JsonMapper.fromJson(msg, Instruccion.class);
Function f = Funciones.get(i.getTipo());
f.ExecuteAction(i.getParams());
session.sendMessage(new TextMessage(msg));
}    
}
