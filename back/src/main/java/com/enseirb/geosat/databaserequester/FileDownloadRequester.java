package com.enseirb.geosat.databaserequester;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.UrlResource;

import com.enseirb.geosat.exceptions.FileDownloadException;

/**
 *
 * @author Clément Larcher
 * Class used to gets the file to download
 */
public class FileDownloadRequester {
	
	public static UrlResource getFileFromDatabase(Path poFilePath) throws FileDownloadException {
		if(Files.exists(poFilePath)) {
			try {
				UrlResource oRequestedFile = new UrlResource(poFilePath.toUri());
				return oRequestedFile;
			} catch (MalformedURLException e) {
				throw new FileDownloadException("Erreur lors de la lecture du fichier à télécharger", e);
			}	
		} else {
			throw new FileDownloadException("Le fichier requêté n'existe pas : " + poFilePath.toString());
		}
	}
}
