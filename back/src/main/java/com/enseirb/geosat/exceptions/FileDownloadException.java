package com.enseirb.geosat.exceptions;

public class FileDownloadException extends Exception {

	private static final long serialVersionUID = 1L;

	public FileDownloadException(String pmMessage) {
		super(pmMessage);
	}
	
	public FileDownloadException(String pmMessage, Throwable ptCause) {
		super(pmMessage, ptCause);
	}

}
