package com.enseirb.geosat.exceptions;

public class ValueTypeException extends Exception {
	private static final long serialVersionUID = 1L;

	public ValueTypeException(String message) {
		super(message);
	}
	
	public ValueTypeException(String message, Throwable cause) {
		super(message, cause);
	}
}
