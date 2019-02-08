package com.enseirb.geosat.databaserequester;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.enseirb.geosat.exceptions.EquipmentManagerException;
import com.enseirb.geosat.models.Configuration;
import com.enseirb.geosat.models.Equipment;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
* @author Xavier Moreto
* Class that manages the read/write on the database file of equipments
*/
public class EquipmentManagerRequester {
	
	// List of Equipments stored in database
	private static List<Equipment> slEquipments;
	
	// Path of the equipments file
	private static Path soEquipmentsFilePath;
	
	// Executed when we make the first call to a static context of this class
	static {
		Configuration oConfig = ConfigurationManagerRequester.getSoConfiguration();
		
		EquipmentManagerRequester.soEquipmentsFilePath = Paths.get(oConfig.getMsDatabaseFolder()).resolve(oConfig.getMsEquipments());
		
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oObjectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			
			EquipmentManagerRequester.slEquipments = new ArrayList<>();
			EquipmentManagerRequester.slEquipments.addAll(Arrays.asList(oObjectMapper.readerWithView(Equipment.EquipmentView.class)
					.forType(Equipment[].class).readValue(EquipmentManagerRequester.soEquipmentsFilePath.toFile())));
		} catch (IOException e) {
			// TODO: something
			e.printStackTrace();
			
			EquipmentManagerRequester.slEquipments = new ArrayList<>();
			try {
				recordChanges();
			} catch (EquipmentManagerException ex) {
				ex.printStackTrace();
			}
		}
	}
	
	/**
	 * Write the list of equipments into the json file
	 */
	private static void recordChanges() throws EquipmentManagerException{
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oObjectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			
			//configure Object mapper for pretty print
			oObjectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			
			//writing to console, can write to any output stream such as file
			oObjectMapper.writerWithView(Equipment.EquipmentView.class).writeValue(EquipmentManagerRequester.soEquipmentsFilePath.toFile(), EquipmentManagerRequester.slEquipments);
		} catch (JsonGenerationException e) {
			throw new EquipmentManagerException("Mise à jour de la base avec les nouvelles informations a échoué, impossible de revenir en arrière", e);
		} catch (JsonMappingException e) {
			throw new EquipmentManagerException("Mise à jour de la base avec les nouvelles informations a échoué, impossible de revenir en arrière", e);
		} catch (IOException e) {
			throw new EquipmentManagerException("Mise à jour de la base avec les nouvelles informations a échoué, impossible de revenir en arrière", e);
		}
	}

	/**
	 * @return The list of equipments in the file
	 */
	public static List<Equipment> getSlEquipments() {
		return slEquipments;
	}
	
	/**
	 *
	 * Gets the index of the requested equipment in the database
	 * @param poEquipment The equipment to find
	 * @return The index of the equipment or -1 if not found
	 */
	public static int findEquipment(Equipment poEquipment) {
		int i = 0;
		for (Equipment oEquipment : slEquipments) {
			if (oEquipment.getName().equals(poEquipment.getName())) {
				return i;
			}
			i++;
		}		
		return -1;
	}

	/**
	 *
	 * Checks if the equipment is in the database
	 * @param poEquipment The equipment to check
	 * @return true if the equipment is in the database, false else
	 */
	public static Boolean equipmentExists(Equipment poEquipment) {
		return findEquipment(poEquipment) != -1; 
	}
	
	/**
	 *
	 * Adds a new equipment in the database
	 * @param poEquipment The equipment to add
	 * @throws EquipmentManagerException Thrown if the equipment already exists
	 */
	public static void addEquipment(Equipment poEquipment) throws EquipmentManagerException {
		if (findEquipment(poEquipment) == -1) {
			slEquipments.add(poEquipment);
			recordChanges();
		} else {
			throw new EquipmentManagerException("L'équipement existe déjà");
		}
	}
	
	/**
	 *
	 * Edits an equipment in the database
	 * @param poEquipment The edited equipment
	 * @throws EquipmentManagerException Thrown if the equipment doesn't exists
	 */
	public static void editEquipment(Equipment poEquipment) throws EquipmentManagerException {
		int i = findEquipment(poEquipment);
		if (i != -1) {
			Equipment oPreviousEquipment = slEquipments.get(i);
			// Handle case where department changes in the update
			if(!oPreviousEquipment.getDepartment().equals(poEquipment.getDepartment())) {
				try {
					Files.move(Paths.get(oPreviousEquipment.getEquipmentDocumentationFilename()),
						Paths.get(poEquipment.getEquipmentDocumentationFilename()));
				} catch (IOException e) {
					throw new EquipmentManagerException("Impossible de déplacer le fichier de documentation de l'equipement, annulation de l'opération", e);
				}
				try {
					Files.move(Paths.get(oPreviousEquipment.getEquipmentFilename()),
							Paths.get(poEquipment.getEquipmentFilename()));
				} catch (IOException e) {
					try {
						Files.move(Paths.get(poEquipment.getEquipmentDocumentationFilename()),
								Paths.get(oPreviousEquipment.getEquipmentDocumentationFilename()));
					} catch (IOException ex) {
						throw new EquipmentManagerException("Impossible de déplacer le fichier de description de l'equipement, annulation de l'opération, fichier de documentation n'a pas pu revenir à sa position initiale", e);
					}
					throw new EquipmentManagerException("Impossible de déplacer le fichier de description de l'equipement, annulation de l'opération", e);
				}
			}
		} else {
			throw new EquipmentManagerException("L'équipement n'a pas été trouvé");
		}
		slEquipments.set(i, poEquipment);
		recordChanges();
	}
	
	/**
	 *
	 * Deletes an equipment from the database
	 * @param poEquipment The equipment to delete
	 * @throws EquipmentManagerException Thrown if the employee doesn't exists
	 */
	public static void deleteEquipment(Equipment poEquipment) throws EquipmentManagerException {
		int i = findEquipment(poEquipment);
		if (i != -1) {
			slEquipments.remove(i);
			recordChanges();
		} else {
			throw new EquipmentManagerException("L'équipement n'a pas été trouvé");
		}
	}
	

}
