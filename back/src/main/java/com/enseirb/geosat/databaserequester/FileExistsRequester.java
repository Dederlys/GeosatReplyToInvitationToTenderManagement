package com.enseirb.geosat.databaserequester;

import java.nio.file.Files;
import java.nio.file.Path;

import com.enseirb.geosat.exceptions.FileExistsException;

/**
*
* @author Clément Larcher
* Class used to check if a file exists
*/
public class FileExistsRequester {
	
	public static Boolean fileExists(Path poFilePath) throws FileExistsException {
		try {
			return Files.exists(poFilePath);
		} catch (Exception e) {
			throw new FileExistsException("Erreur au moment de vérifier l'existence du fichier", e);
		}
	}

}
