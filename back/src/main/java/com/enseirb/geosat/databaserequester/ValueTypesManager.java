package com.enseirb.geosat.databaserequester;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.models.Configuration;
import com.enseirb.geosat.models.ValueTypes;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
*
* @author Xavier Moreto
* Class used to manage the read/write on the value types file
*/
public class ValueTypesManager {
	
	// ValueTypes information
	private static ValueTypes soValueTypes;
	
	// Path of the Database Folder
	private static Path soDatabaseFolderPath;
	
	// Executed when we make the first call to a static context of this class
	static {
		Configuration oConfig = ConfigurationManagerRequester.getSoConfiguration();
		
		soDatabaseFolderPath = Paths.get(oConfig.getMsDatabaseFolder());
		
		Path oValueTypesFilePath = soDatabaseFolderPath.resolve(oConfig.getMsValueTypes());
		
		try {
			//read json file data to String
			byte[] oJsonData;
			oJsonData = Files.readAllBytes(oValueTypesFilePath);
			
			//create ObjectMapper instance
			ObjectMapper oObjectMapper = new ObjectMapper();
			
			//convert json string to object
			ValueTypesManager.soValueTypes = oObjectMapper.readValue(oJsonData, ValueTypes.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Le fichier de type de valeurs n'existe pas");
			
			ValueTypesManager.soValueTypes = new ValueTypes();
			
			ValueTypesManager.recordChanges();
		}
		
		writeFolders();
	}
	
	/**
	 *
	 * This file creates the folders of all the poles if they don't exist
	 */
	private static void writeFolders() {
		for (String sPole : ValueTypesManager.soValueTypes.getMlPoles()) {
			Path oPolePath = soDatabaseFolderPath.resolve(sPole);
			
			try {
				if (!Files.exists(oPolePath)) {
					Files.createDirectory(oPolePath);
				}
				if (!Files.exists(oPolePath.resolve(FileConstants.EQUIPMENT_DOC_FOLDER))) {
					Files.createDirectory(oPolePath.resolve(FileConstants.EQUIPMENT_DOC_FOLDER));
				}
				if (!Files.exists(oPolePath.resolve(FileConstants.EQUIPMENT_FOLDER))) {
					Files.createDirectory(oPolePath.resolve(FileConstants.EQUIPMENT_FOLDER));
				}
				if (!Files.exists(oPolePath.resolve(FileConstants.MEAN_FOLDER))) {
					Files.createDirectory(oPolePath.resolve(FileConstants.MEAN_FOLDER));
				}
				if (!Files.exists(oPolePath.resolve(FileConstants.PROJECTS_FOLDER))) {
					Files.createDirectory(oPolePath.resolve(FileConstants.PROJECTS_FOLDER));
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	/**
	 *
	 * Gets the valueTypes information from json file
	 * @return The object representing the valueTypes file
	 */
	public static ValueTypes getSoValueTypes() {
		return ValueTypesManager.soValueTypes;
	}
	
	/**
	 *
	 * Write the valueTypes into the json file
	 */
	public static void recordChanges() {
		Configuration oConfig = ConfigurationManagerRequester.getSoConfiguration();
		
		Path oValueTypesFilePath = Paths.get(oConfig.getMsDatabaseFolder()).resolve(oConfig.getMsValueTypes());
		
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			
			//configure Object mapper for pretty print
			oObjectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			
			//writing to console, can write to any output stream such as file
			File oOutputFile = oValueTypesFilePath.toFile();
			
			oObjectMapper.writeValue(oOutputFile, ValueTypesManager.soValueTypes);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		writeFolders();
	}
}
