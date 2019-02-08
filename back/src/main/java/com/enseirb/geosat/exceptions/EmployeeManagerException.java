package com.enseirb.geosat.exceptions;

public class EmployeeManagerException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public EmployeeManagerException(String psMessage) {
		super(psMessage);
	}
	
	public EmployeeManagerException(String psMessage, Throwable poCause) {
		super(psMessage, poCause);
	}

}
