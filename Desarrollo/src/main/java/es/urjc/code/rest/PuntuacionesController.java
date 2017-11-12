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
import java.*;
import java.util.LinkedList;
import org.springframework.web.bind.annotation.*;
import com.google.gson.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Comparator;
import org.springframework.http.HttpStatus;
@RestController
public class PuntuacionesController {
   Gson JsonMapper = new Gson();
   Puntuaciones[] listp = new Puntuaciones[11];
    @RequestMapping(value = "/getPuntuacion", method = RequestMethod.GET)
    public String GetPuntuaciones() throws FileNotFoundException, IOException{                        
        if ( listp[0] == null ) 
        {
        File archivo = new File ("Puntuaciones.json");
        FileReader fr = new FileReader (archivo);
        BufferedReader br = new BufferedReader(fr);        
        listp =  JsonMapper.fromJson(br, Puntuaciones[].class);               
        }
               
        return JsonMapper.toJson(listp);
    }
    
    @RequestMapping(value = "/setPuntuacion", method = RequestMethod.POST)
    public void AddPuntuacion(@RequestBody String puntos) throws FileNotFoundException, IOException{
      if ( listp[0] == null ) 
        {
        File archivo = new File ("Puntuaciones.json");
        FileReader fr = new FileReader (archivo);
        BufferedReader br = new BufferedReader(fr);        
        listp =  JsonMapper.fromJson(br, Puntuaciones[].class);               
        }
        
      Puntuaciones  d =JsonMapper.fromJson(puntos, Puntuaciones.class);
        listp[10] = d;
        
        for (int i = 0; i< listp.length-1;i++){
            for (int j = i+1; j< listp.length; j++){
            if (listp[j].getPuntacion() > listp[i].getPuntacion()){
            Puntuaciones p = listp[j];
            listp[j] = listp[i];
            listp[i] = p;
                
            }
            }
        }
        
        String dataText = JsonMapper.toJson(listp);
        File archivo = new File ("Puntuaciones.json");
        FileWriter writer = new FileWriter(archivo);
        PrintWriter pw = new PrintWriter(writer);
        pw.print(dataText);
        pw.close();
        
        
    }
    
    
}
