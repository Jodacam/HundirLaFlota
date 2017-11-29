/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import org.springframework.web.socket.WebSocketSession;

/**
 *
 * @author jd.campos
 */
public interface Function {   
    public void ExecuteAction(String[] params,WebSocketSession session);
}
