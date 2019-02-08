package com.enseirb.geosat.rest;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.controllers.ArchiveProviderController;
import com.enseirb.geosat.databaserequester.ArchiveProviderRequester;
import com.enseirb.geosat.exceptions.ArchiveProviderException;
import com.enseirb.geosat.models.ArchiveContent;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
* @author Clément Larcher
* Class answering the request to create the archive
*/
@RestController
public class ArchiveProviderRestController {
	
	/**
	 * Creates the archive with the requested files and returns it
	 * @param poArchiveContentInfo JSON file with the request content
	 * @return ResponseEntity Contains the archive
	 * @throws ArchiveProviderException Creating the archive failed
	 */
	@PostMapping("/rest/archive")
	public static ResponseEntity<Resource> getArchive(@RequestBody String poArchiveContentInfo) throws ArchiveProviderException {
		
		ObjectMapper oMapper = new ObjectMapper();
		ArchiveContent oArchiveFiles = null;
		try {
			oArchiveFiles = oMapper.readValue(poArchiveContentInfo, ArchiveContent.class);
		} catch (Exception e) {
			throw new ArchiveProviderException("Impossible de lire le fichier JSON reçu",e);
		}
		UrlResource oArchiveResource = ArchiveProviderController.getArchive(oArchiveFiles);
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/octet-stream"))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ArchiveProviderRequester.msArchiveFileName + "\"")
				.body(oArchiveResource);
	}

}
