package com.enseirb.geosat.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.controllers.ValueTypesController;
import com.enseirb.geosat.exceptions.ValueTypeException;

@RestController
public class ValueTypesRestManager {
	
	@GetMapping("/rest/titles")
	public static List<String> getTitlesValueTypes() {
		return ValueTypesController.getTitlesValueTypes();
	}
	
	@PostMapping("/rest/titles")
	public static void addTitleValueTypes(@RequestBody String psNewTitle) throws ValueTypeException {
		try {
			ValueTypesController.addTitleValueType(psNewTitle);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/titles/{title}")
	public static void removeTitleValueTypes(@PathVariable("title") String psTitle) throws ValueTypeException {
		try {
			ValueTypesController.removeTitleValueType(psTitle);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@GetMapping("/rest/sites")
	public static List<String> getSitesValueTypes() {
		return ValueTypesController.getSitesValueTypes();
	}
	
	@PostMapping("/rest/sites")
	public static void addSiteValueTypes(@RequestBody String psNewSite) throws ValueTypeException {
		try {
			ValueTypesController.addSiteValueType(psNewSite);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/sites/{site}")
	public static void removeSiteValueTypes(@PathVariable("site") String psSite) throws ValueTypeException {
		try {
			ValueTypesController.removeSiteValueType(psSite);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@GetMapping("/rest/contracts")
	public static List<String> getContractsValueTypes() {
		return ValueTypesController.getContractsValueTypes();
	}
	
	@PostMapping("/rest/contracts")
	public static void addContractValueTypes(@RequestBody String psNewContract) throws ValueTypeException {
		try {
			ValueTypesController.addContractValueType(psNewContract);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/contracts/{contract}")
	public static void removeContractValueTypes(@PathVariable("contract") String psContract) throws ValueTypeException {
		try {
			ValueTypesController.removeContractValueType(psContract);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@GetMapping("/rest/positions")
	public static List<String> getPositionsValueTypes() {
		return ValueTypesController.getPositionsValueTypes();
	}
	
	@PostMapping("/rest/positions")
	public static void addPositionValueTypes(@RequestBody String psNewPosition) throws ValueTypeException {
		try {
			ValueTypesController.addPositionValueType(psNewPosition);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/positions/{position}")
	public static void removePositionValueTypes(@PathVariable("position") String psPosition) throws ValueTypeException {
		try {
			ValueTypesController.removePositionValueType(psPosition);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@GetMapping("/rest/poles")
	public static List<String> getPolesValueTypes() {
		return ValueTypesController.getPolesValueTypes();
	}
	
	@PostMapping("/rest/poles")
	public static void addPoleValueTypes(@RequestBody String psNewPole) throws ValueTypeException {
		try {
			ValueTypesController.addPoleValueType(psNewPole);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/poles/{pole}")
	public static void removePoleValueTypes(@PathVariable("pole") String psPole) throws ValueTypeException {
		try {
			ValueTypesController.removePoleValueType(psPole);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@GetMapping("/rest/habilitations")
	public static List<String> getAuthorizationsValueTypes() {
		return ValueTypesController.getAuthorizationsValueTypes();
	}
	
	@PostMapping("/rest/habilitations")
	public static void addAuthorizationsValueTypes(@RequestBody String psNewAuthorization) throws ValueTypeException {
		try {
			ValueTypesController.addAuthorizationValueType(psNewAuthorization);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}
	
	@DeleteMapping("/rest/habilitations/{habilitation}")
	public static void removeAuthorizationValueTypes(@PathVariable("habilitation") String psAuthorization) throws ValueTypeException {
		try {
			ValueTypesController.removeAuthorizationValueType(psAuthorization);
		} catch (ValueTypeException e) {
			throw new ValueTypeException("",e);
		}
	}

}
