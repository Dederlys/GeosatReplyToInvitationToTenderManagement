package com.enseirb.geosat.models;

import java.util.List;

public class ArchiveContent {
	
	private List<Employee> mlEmployees;
	private List<Equipment> mlEquipments;
	
	public List<Employee> getMlEmployees() {
		return mlEmployees;
	}
	public void setMlEmployees(List<Employee> plEmployees) {
		this.mlEmployees = plEmployees;
	}
	public List<Equipment> getMlEquipments() {
		return mlEquipments;
	}
	public void setMlEquipments(List<Equipment> plEquipments) {
		this.mlEquipments = plEquipments;
	}

}
