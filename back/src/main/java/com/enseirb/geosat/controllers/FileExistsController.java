package com.enseirb.geosat.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;

import com.enseirb.geosat.databaserequester.FileExistsRequester;
import com.enseirb.geosat.exceptions.FileExistsException;

/**
*
* @author Clément Larcher
* Controller that manages the existence of a file
*/
public class FileExistsController {
	
	public static Boolean fileExists(String psFileName) throws FileExistsException {
		try {
			Path oFilePath = Paths.get(psFileName);
			return FileExistsRequester.fileExists(oFilePath);
		} catch (FileExistsException e) {
			throw new FileExistsException("Exception raised in application controller : Problem when requiring resource", e);
		}
	}

}
