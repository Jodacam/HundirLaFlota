/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;
import java.*;
import org.springframework.stereotype.Component;
/**
 *
 * @author jd.campos
 */
@Component
public class Puntuaciones {
    private Puntuacion[] puntuaciones = new Puntuacion[11];
    
    public Puntuacion[] getPuntuaciones(){
        return this.puntuaciones;
    }
    
    public void setPuntuaciones(Puntuacion[] x){
        for(int i = 0; i < 11; i++){
            this.puntuaciones[i] = x[i];
        }
    }
    
    public void setNum(int x, Puntuacion y){
        this.puntuaciones[x] = y;
    }
    
    public void order(){
        for (int i = 0; i< getPuntuaciones().length-1;i++){
            for (int j = i+1; j< getPuntuaciones().length; j++){
                if (getPuntuaciones()[j].getPuntuacion() > getPuntuaciones()[i].getPuntuacion()){
                    Puntuacion p = getPuntuaciones()[j];
                    getPuntuaciones()[j] =  getPuntuaciones()[i];
                    getPuntuaciones()[i] = p;
                }
            }
        }
    }
}
