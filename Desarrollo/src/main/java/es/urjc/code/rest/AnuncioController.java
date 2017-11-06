package es.urjc.code.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnuncioController {
	
	@GetMapping("/anuncios")
	public Anuncio anuncios() {
		return new Anuncio("Pepe", "Vendo moto", "Barata");
	}

}
