package com.enseirb.geosat.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.UrlResource;

import com.enseirb.geosat.databaserequester.FileDownloadRequester;
import com.enseirb.geosat.exceptions.FileDownloadException;

/**
 *
 * @author Clément Larcher
 * Controller that manages the download of a file
 */
public class FileDownloadController {
	
	public static UrlResource getRequestedFilePath(String psFilename) throws FileDownloadException {
		try {
			Path oRequestedResourcePath = Paths.get(psFilename).toAbsolutePath().normalize();
			UrlResource oRequestedResourceContent = FileDownloadRequester.getFileFromDatabase(oRequestedResourcePath);
			return oRequestedResourceContent;
		} catch (Exception e) {
			throw new FileDownloadException("Exception raised in application controller : Problem encountered when requiring resource", e);
		}
	}

}
