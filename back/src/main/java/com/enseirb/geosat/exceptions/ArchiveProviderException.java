package com.enseirb.geosat.exceptions;

public class ArchiveProviderException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public ArchiveProviderException(String psMessage) {
		super(psMessage);
	}
	
	public ArchiveProviderException(String psMessage, Throwable poCause) {
		super(psMessage, poCause);
	}

}
