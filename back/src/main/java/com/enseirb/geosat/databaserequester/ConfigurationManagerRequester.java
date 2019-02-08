package com.enseirb.geosat.databaserequester;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.models.Configuration;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * @author Xavier Moreto
 * Class used to manage the read/write on the configuration file
 */
public class ConfigurationManagerRequester {
	
	// Configuration information
	private static Configuration soConfig;
	
	// Executed when we make the first call to a static context of this class
	static {
		initJson();
	}
	
	/**
	 *
	 * This function reads the configuration file and creates the filesystem of the app
	 */
	private static void initJson() {
		try {
			//read json file data to String
			byte[] oJsonData;
			oJsonData = Files.readAllBytes(Paths.get(FileConstants.CONFIGURATION_FILE));
			
			//create ObjectMapper instance
			ObjectMapper oObjectMapper = new ObjectMapper();
			
			//convert json string to object
			ConfigurationManagerRequester.soConfig = oObjectMapper.readValue(oJsonData, Configuration.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.exit(1);
		}
		
		Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.soConfig.getMsDatabaseFolder());
		
		try {
			if (!Files.exists(oDatabaseFolderPath)) {
				Files.createDirectory(oDatabaseFolderPath);
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.GENERAL_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.GENERAL_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.ENTREPRISE_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.ENTREPRISE_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.AUTHORIZATIONS_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.AUTHORIZATIONS_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.RH_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.RH_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.BIOS_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.BIOS_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.CV_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.CV_FOLDER));
			}
			if (!Files.exists(oDatabaseFolderPath.resolve(FileConstants.DIPLOMAS_FOLDER))) {
				Files.createDirectory(oDatabaseFolderPath.resolve(FileConstants.DIPLOMAS_FOLDER));
			}
			
			
		} catch (IOException e) {
			// Never called. Except for privilege issues
			e.printStackTrace();
			System.exit(1);
		}
	}
	
	/**
	 *
	 * Gets the configuration information from json config file
	 * @return The object representing the config file
	 */
	public static Configuration getSoConfiguration() {
		return ConfigurationManagerRequester.soConfig;
	}
	
}
