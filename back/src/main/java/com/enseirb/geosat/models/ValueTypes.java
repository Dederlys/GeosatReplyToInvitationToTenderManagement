package com.enseirb.geosat.models;

import java.util.ArrayList;
import java.util.List;

public class ValueTypes {
	private List<String> mlTitles;
	private List<String> mlSites;
	private List<String> mlContracts;
	private List<String> mlPositions;
	private List<String> mlPoles;
	private List<String> mlAuthorizations;
	
	public ValueTypes() {
		this.mlTitles = new ArrayList<>();
		this.mlSites = new ArrayList<>();
		this.mlContracts = new ArrayList<>();
		this.mlPositions = new ArrayList<>();
		this.mlPoles = new ArrayList<>();
		this.mlAuthorizations = new ArrayList<>();
	}

	public List<String> getMlAuthorizations() {
		return mlAuthorizations;
	}

	public void setMlAuthorizations(List<String> mlAuthorizations) {
		this.mlAuthorizations = mlAuthorizations;
	}

	public List<String> getMlTitles() {
		return mlTitles;
	}
	
	public void setMlTitles(List<String> plTitles) {
		this.mlTitles = plTitles;
	}
	
	public List<String> getMlSites() {
		return mlSites;
	}
	
	public void setMlSites(List<String> plSites) {
		this.mlSites = plSites;
	}
	
	public List<String> getMlContracts() {
		return mlContracts;
	}
	
	public void setMlContracts(List<String> plContracts) {
		this.mlContracts = plContracts;
	}
	
	public List<String> getMlPositions() {
		return mlPositions;
	}
	
	public void setMlPositions(List<String> plPositions) {
		this.mlPositions = plPositions;
	}
	
	public List<String> getMlPoles() {
		return mlPoles;
	}
	
	public void setMlPoles(List<String> plPoles) {
		this.mlPoles = plPoles;
	}
	
}
