/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;
import java.*;
/**
 *
 * @author jd.campos
 */
public class Puntuaciones {
    
    private String Name;
    private int Puntuacion;
    
    public Puntuaciones(){}
    
    public Puntuaciones(String name, int puntuacion){
    this.Name = name;
    this.Puntuacion = puntuacion;
    }
            
    public void setName(String name){
    this.Name = name;
    }
    public void setPuntuacion (int puntos){
    this.Puntuacion = puntos;
    }
    public String getName(){
        return this.Name;
    }
    public int getPuntacion(){
        return this.Puntuacion;
    }
    
    
}
