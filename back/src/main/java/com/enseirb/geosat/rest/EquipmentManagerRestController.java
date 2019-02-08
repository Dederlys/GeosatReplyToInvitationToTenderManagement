package com.enseirb.geosat.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.controllers.EquipmentManagerController;
import com.enseirb.geosat.exceptions.EquipmentManagerException;
import com.enseirb.geosat.models.Equipment;
import com.enseirb.geosat.models.Equipment.EquipmentView;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
* @author Clément Larcher
* Class answering the requests asking information about equipments
*/
@RestController
public class EquipmentManagerRestController {
	// TODO : add exception messages
	
	/**
	 * @param psName Name of the equipment
	 * @return Boolean Employee exists in database or not
	 */
	@GetMapping("/rest/equipment/exists")
	public Boolean equimentExists(@RequestParam("name") String psName) {
		Equipment oEquipement = new Equipment(psName);
		Boolean oEquipmentExists = EquipmentManagerController.equipmentExists(oEquipement);
		return oEquipmentExists;
	}
	
	/**
	 * Adds the requested equipment to the database
	 * @param psName Name of the equipment
	 * @throws 
	 */
	@PostMapping("/rest/equipment")
	public void addEquipment(@RequestBody String psEquipmentInfo) throws EquipmentManagerException {
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			Equipment oEquipment = oObjectMapper.readValue(psEquipmentInfo, Equipment.class);
			EquipmentManagerController.addEquipment(oEquipment);
			return;
		} catch (Exception e) {
			throw new EquipmentManagerException("",e);
		}
	}
	
	@PutMapping("/rest/equipment")
	public void editEquipment(@RequestBody String psEquipmentInfo) throws EquipmentManagerException {
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			Equipment oEquipment = oObjectMapper.readValue(psEquipmentInfo, Equipment.class);
			EquipmentManagerController.editEquipment(oEquipment);
		} catch (Exception e) {
			throw new EquipmentManagerException("",e);
		}
	}
	
	@DeleteMapping("/rest/equipment")
	public void deleteEquiment(@RequestParam("name") String psName) throws EquipmentManagerException {
		try {
			Equipment eEquipment = new Equipment(psName);
			EquipmentManagerController.deleteEquipment(eEquipment);
		} catch (Exception e) {
			throw new EquipmentManagerException("Exception raised in rest controller : ", e);
		}
	}
	
	@GetMapping("/rest/equipment")
	@JsonView(EquipmentView.class)
	public List<Equipment> getAllEquipments() {
		List<Equipment> lEquipment = EquipmentManagerController.getAllEquipment();
		return lEquipment;
	}
	
	
	
}
