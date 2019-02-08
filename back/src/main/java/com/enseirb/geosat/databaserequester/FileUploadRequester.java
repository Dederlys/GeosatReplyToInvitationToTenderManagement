package com.enseirb.geosat.databaserequester;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

import com.enseirb.geosat.exceptions.FileUploadException;

/**
*
* @author Clément Larcher
* Class used to write the file to upload
*/
public class FileUploadRequester {
	
	public static void writeUploadedFile(MultipartFile poSourceFile, Path poDestinationPath) throws FileUploadException {
		try {
			Files.copy(poSourceFile.getInputStream(), poDestinationPath, StandardCopyOption.REPLACE_EXISTING);
		} catch (Exception e) {
			flushWrite(poDestinationPath);
			throw new FileUploadException("Erreur au moment d'écrire le fichier", e);
		}
	}

	public static void flushWrite(Path poDestinationPath) {
		try {
			Files.deleteIfExists(poDestinationPath);
		} catch (IOException e) {
			e.printStackTrace(); 
		}
	}
}
