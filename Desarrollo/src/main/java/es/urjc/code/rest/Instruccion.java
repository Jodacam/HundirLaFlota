/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

/**
 *
 * @author jd.campos
 */
public class Instruccion {
    private String tipo;
    private String[] params;
    
    public Instruccion(String tipo,String[] params){    
    this.params = params;
    this.tipo = tipo;   
    }
    
    public void setTipo(String tipo){
    this.tipo = tipo;
    }
    
    public void setParams(String[] params){    
    for(int i = 0; i < params.length; i++){
            this.params[i] = params[i];
        }
    }
    
    public String getTipo(){
    return this.tipo;
    }
    
    public String[] getParams(){
    return this.params;
    }
}
