package com.enseirb.geosat.models;

public class Configuration {
	private String msDatabaseFolder;
	private String msEmployees;
	private String msEquipments;
	private String msValueTypes;
	
	public String getMsDatabaseFolder() {
		return msDatabaseFolder;
	}
	
	public void setMsDatabaseFolder(String psDatabaseFolder) {
		this.msDatabaseFolder = psDatabaseFolder;
	}
	
	public String getMsEmployees() {
		return msEmployees;
	}
	
	public void setMsEmployees(String psEmployees) {
		this.msEmployees = psEmployees;
	}
	
	public String getMsEquipments() {
		return msEquipments;
	}

	public void setMsEquipments(String psEquipments) {
		this.msEquipments = psEquipments;
	}

	public String getMsValueTypes() {
		return msValueTypes;
	}
	
	public void setMsValueTypes(String psValueTypes) {
		this.msValueTypes = psValueTypes;
	}

	@Override
	public String toString() {
		return "Configuration [msDatabaseFolder=" + msDatabaseFolder + ", msEmployees=" + msEmployees
				+ ", msEquipments=" + msEquipments + ", msValueTypes=" + msValueTypes + "]";
	}
	
}
