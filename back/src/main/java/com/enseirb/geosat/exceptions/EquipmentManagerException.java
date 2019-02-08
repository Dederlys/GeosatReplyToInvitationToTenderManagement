package com.enseirb.geosat.exceptions;

public class EquipmentManagerException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public EquipmentManagerException(String psMessage) {
		super(psMessage);
	}
	
	public EquipmentManagerException(String psMessage, Throwable poCause) {
		super(psMessage, poCause);
	}

}
