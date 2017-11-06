package es.urjc.code.rest;

import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestEjem1bApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(RestEjem1bApplication.class);
                Properties properties = new Properties();
               properties.setProperty("spring.resources.staticLocations",
                                       "classpath:/static/");
               app.setDefaultProperties(properties);
             app.run(args);
	}
}
