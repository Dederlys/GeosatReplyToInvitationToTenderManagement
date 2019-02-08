package com.enseirb.geosat.controllers;

import java.util.List;

import com.enseirb.geosat.databaserequester.EquipmentManagerRequester;
import com.enseirb.geosat.databaserequester.ValueTypesManager;
import com.enseirb.geosat.exceptions.EquipmentManagerException;
import com.enseirb.geosat.models.Equipment;

/**
 * 
 * @author Clément Larcher
 * Controller that manage Equipment requests from REST services
 */
public class EquipmentManagerController {
	
	/**
	 *
	 * Checks if the corresponding service of the equipment exists
	 * @param poEquipment
	 * @return true if the service exists false else
	 */
	private static boolean serviceExists(Equipment poEquipment) {
		return ValueTypesManager.getSoValueTypes().getMlPoles().contains(poEquipment.getDepartment());
	}
	
	/**
	 *
	 * Checks if the equipment is present in the database
	 * @param poEquipment
	 * @return true if the equipment exists false else
	 */
	public static Boolean equipmentExists(Equipment poEquipment) {
		return EquipmentManagerRequester.equipmentExists(poEquipment);
	}
	
	/**
	 *
	 * Add an equipment to the database
	 * @param poEquipment
	 * @throws EquipmentManagerException
	 */
	public static void addEquipment(Equipment poEquipment) throws EquipmentManagerException {
		if (!serviceExists(poEquipment)) {
			throw new EquipmentManagerException("Le pôle dans lequel vous essayer de créer un équipement n'existe pas");
		}
		EquipmentManagerRequester.addEquipment(poEquipment);
	}
	
	/**
	 *
	 * Edit an equipment from the database
	 * @param poEquipment
	 * @throws EquipmentManagerException
	 */
	public static void editEquipment(Equipment poEquipment) throws EquipmentManagerException {
		if (!serviceExists(poEquipment)) {
			throw new EquipmentManagerException("Le pôle dans lequel vous essayer de modifier un équipement n'existe pas");
		}
		EquipmentManagerRequester.editEquipment(poEquipment);
	}
	
	/**
	 *
	 * Deletes an equipment from the database
	 * @param poEquipment
	 * @throws EquipmentManagerException
	 */
	public static void deleteEquipment(Equipment poEquipment) throws EquipmentManagerException {
		EquipmentManagerRequester.deleteEquipment(poEquipment);
	}
	
	/**
	 *
	 * @return The list of equipments
	 */
	public static List<Equipment> getAllEquipment() {
		return EquipmentManagerRequester.getSlEquipments();
	}

}
