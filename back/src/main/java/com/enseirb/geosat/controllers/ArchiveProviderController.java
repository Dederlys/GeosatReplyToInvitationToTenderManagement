package com.enseirb.geosat.controllers;

import org.springframework.core.io.UrlResource;

import com.enseirb.geosat.databaserequester.ArchiveProviderRequester;
import com.enseirb.geosat.exceptions.ArchiveProviderException;
import com.enseirb.geosat.models.ArchiveContent;

/**
 *
 * @author Clément Larcher
 * Controller that manages the generation of an archive to answer an invitation to tender
 */
public class ArchiveProviderController {
	
	public static UrlResource getArchive(ArchiveContent poArchiveFiles) throws ArchiveProviderException {
		return ArchiveProviderRequester.getZipArchive(poArchiveFiles.getMlEmployees(), poArchiveFiles.getMlEquipments());
	}

}
