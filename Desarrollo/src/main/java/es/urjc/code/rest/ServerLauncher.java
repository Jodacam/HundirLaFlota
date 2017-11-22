package es.urjc.code.rest;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.*;


@SpringBootApplication
@EnableWebSocket
public class ServerLauncher implements WebSocketConfigurer {

    
@Override
public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

   registry.addHandler(echoHandler(), "/echo").setAllowedOrigins("*");
}

@Bean
public WebSocketManager echoHandler() {
            return new WebSocketManager();
}

    
    
    public static void main(String[] args) throws IOException {	
        
        SpringApplication app = new SpringApplication(ServerLauncher.class);
            Properties properties = new Properties();
            properties.setProperty("spring.resources.staticLocations",
                                       "classpath:/static/");
            app.setDefaultProperties(properties);
            app.run(args);
	}
}
