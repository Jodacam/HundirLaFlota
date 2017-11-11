package es.urjc.code.rest;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestEjem1bApplication {
static Gson JsonMapper = new Gson();
static Puntuaciones[] listp = new Puntuaciones[11];
public static void main(String[] args) throws IOException {
            
           
		
        
        SpringApplication app = new SpringApplication(RestEjem1bApplication.class);
                Properties properties = new Properties();
               properties.setProperty("spring.resources.staticLocations",
                                       "classpath:/static/");
               app.setDefaultProperties(properties);
             app.run(args);
	}
}
