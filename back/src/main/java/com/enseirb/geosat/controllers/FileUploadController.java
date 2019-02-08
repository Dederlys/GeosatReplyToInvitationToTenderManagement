package com.enseirb.geosat.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.enseirb.geosat.databaserequester.FileUploadRequester;
import com.enseirb.geosat.exceptions.FileUploadException;

/**
*
* @author Clément Larcher
* Controller that manages the upload of a file
*/
public class FileUploadController {

	public static void writeUploadedFile(MultipartFile poFile, String psDestinationFolder, String psFileRename) throws FileUploadException {
		try {
			Path oDestinationPath;
			if(psFileRename == null) {
				String sFileName = StringUtils.cleanPath(poFile.getOriginalFilename());
				oDestinationPath = Paths.get(psDestinationFolder, sFileName);
			} else {
				oDestinationPath = Paths.get(psDestinationFolder, psFileRename);
			}
			FileUploadRequester.writeUploadedFile(poFile, oDestinationPath);
		} catch (Exception e) {
			throw new FileUploadException("Exception raised in application controller : Problem encountered when requiring resource", e);
		}
		return;
	}

}
