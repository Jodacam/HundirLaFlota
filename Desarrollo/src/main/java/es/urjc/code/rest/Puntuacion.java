/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

/**
 *
 * @author Brisin
 */
public class Puntuacion {
    private String name;
    private int puntuacion;
    
    public Puntuacion(){}
    
    public Puntuacion(String name, int puntuacion){
    this.name = name;
    this.puntuacion = puntuacion;
    }
            
    public void setName(String name){
    this.name = name;
    }
    public void setPuntuacion (int puntos){
    this.puntuacion = puntos;
    }
    public String getName(){
        return this.name;
    }
    public int getPuntuacion(){
        return this.puntuacion;
    }
}
