package com.enseirb.geosat.exceptions;

public class FileExistsException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public FileExistsException(String psMessage) {
		super(psMessage);
	}
	
	public FileExistsException(String psMessage, Throwable ptCause) {
		super(psMessage, ptCause);
	}

}
