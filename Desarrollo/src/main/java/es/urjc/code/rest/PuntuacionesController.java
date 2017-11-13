package es.urjc.code.rest;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController
public class PuntuacionesController {
   Gson JsonMapper = new Gson();
   //Puntuaciones[] listp = new Puntuaciones[11];
   @Autowired
   public Puntuaciones puntuaciones;
   
   @RequestMapping(value = "/getPuntuacion", method = RequestMethod.GET)
   public Puntuacion[] GetPuntuaciones() throws FileNotFoundException, IOException{                        
        if (puntuaciones.getPuntuaciones()[0] == null ){
            File archivo = new File ("Puntuaciones.json");
            FileReader fr = new FileReader (archivo);
            BufferedReader br = new BufferedReader(fr);        
            puntuaciones.setPuntuaciones(JsonMapper.fromJson(br, Puntuacion[].class));              
        }
               
        //return JsonMapper.toJson(listp);
        return puntuaciones.getPuntuaciones();
    }
   
   @RequestMapping(value = "/setPuntuacion", method = RequestMethod.POST)
   public void AddPuntuacion(@RequestBody String puntos) throws FileNotFoundException, IOException{
        if (puntuaciones.getPuntuaciones()[0] == null ){
            File archivo = new File ("Puntuaciones.json");
            FileReader fr = new FileReader (archivo);
            BufferedReader br = new BufferedReader(fr);        
            puntuaciones.setPuntuaciones(JsonMapper.fromJson(br, Puntuacion[].class));               
        }
        
        Puntuacion y  = JsonMapper.fromJson(puntos, Puntuacion.class);
        
        puntuaciones.setNum(10, y);
        
        puntuaciones.order();
        
        String dataText = JsonMapper.toJson(puntuaciones.getPuntuaciones());
        File archivo = new File ("Puntuaciones.json");
        FileWriter writer = new FileWriter(archivo);
        PrintWriter pw = new PrintWriter(writer);
        pw.print(dataText);
        pw.close();
    }
}
