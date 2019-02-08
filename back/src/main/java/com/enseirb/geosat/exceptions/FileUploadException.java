package com.enseirb.geosat.exceptions;

public class FileUploadException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public FileUploadException(String psMessage, Throwable ptCause) {
		super(psMessage, ptCause);
	}

}

