package es.urjc.code.rest;

public class Anuncio {
	
	private String name;
	private String asunto;
	private String descripcion;
	
	public Anuncio() {
	}
	
	public Anuncio(String name, String asunto, String description) {
		this.name = name;
		this.asunto = asunto;
		this.descripcion = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	
}
