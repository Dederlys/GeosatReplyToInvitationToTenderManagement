package com.enseirb.geosat.rest;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.controllers.FileDownloadController;
import com.enseirb.geosat.exceptions.FileDownloadException;
import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Equipment;
import com.enseirb.geosat.databaserequester.ConfigurationManagerRequester;
import com.enseirb.geosat.databaserequester.EquipmentManagerRequester;

@RestController
public class FileDownloadRestController {

	private ResponseEntity<Resource> downloadFile(String psFilename) throws FileDownloadException { 
		UrlResource uRequestedFileContent;
		
		uRequestedFileContent = FileDownloadController.getRequestedFilePath(psFilename);
		
		try {
			String osFilename = Paths.get(psFilename).getFileName().toString();
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType("application/octet-stream"))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + osFilename + "\"")
					.body(uRequestedFileContent);
		} catch (Exception e) {
			throw new FileDownloadException("Exception  raised in rest controller : Problem encountered when creating response entity", e);
		}
	}
	
	@GetMapping("/rest/presentation")
	public ResponseEntity<Resource> downloadCompanyDescriptionFile() throws FileDownloadException {
		Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		String sCompanyDescriptionFile = pDatabaseFolderPath.resolve(FileConstants.COMPANY_DESCRIPTION_FILE).toString();
		return downloadFile(sCompanyDescriptionFile);
	}
	
	@GetMapping("/rest/person/cv")
	public ResponseEntity<Resource> downloadEmployeeCV(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileDownloadException {
		Employee eEmployee = new Employee(psNationality, psIdNumber);
		Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());

		String sCVFolder = pDatabaseFolderPath.resolve(FileConstants.CV_FOLDER).toString();
		String requiredFile = Paths.get(sCVFolder, FileConstants.CV_FILENAME_FUNCTION.apply(eEmployee)).toString();
		return downloadFile(requiredFile);
	}
	
	@GetMapping("/rest/person/bio")
	public ResponseEntity<Resource> downloadEmployeeBio(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileDownloadException {
		Employee eEmployee = new Employee(psNationality, psIdNumber);
		Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());

		String sBioFolder = pDatabaseFolderPath.resolve(FileConstants.BIOS_FOLDER).toString();
		String requiredFile = Paths.get(sBioFolder, FileConstants.BIO_FILENAME_FUNCTION.apply(eEmployee)).toString();
		return downloadFile(requiredFile);
	}
	
	@GetMapping("/rest/person/diplomas")
	public ResponseEntity<Resource> downloadEmployeeDiplomas(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileDownloadException {
		Employee eEmployee = new Employee(psNationality, psIdNumber);
		Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());

		String sDiplomasFolder = pDatabaseFolderPath.resolve(FileConstants.DIPLOMAS_FOLDER).toString();
		String requiredFile = Paths.get(sDiplomasFolder, FileConstants.DIPLOMAS_FILENAME_FUNCTION.apply(eEmployee)).toString();
		return downloadFile(requiredFile);
	}
	
	@GetMapping("/rest/equipment/documentation")
	public ResponseEntity<Resource> downloadEquipmentDocumentation(@RequestParam("name") String psName) throws FileDownloadException {
		Equipment oEquipment = new Equipment(psName);
		int index = EquipmentManagerRequester.findEquipment(oEquipment);
		if(index == -1) {
			throw new FileDownloadException("Exception  raised in rest controller : equipment not found");
		}
		oEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
		String requiredFile = oEquipment.getEquipmentDocumentationFilename();
		return downloadFile(requiredFile);
	}
	
	@GetMapping("/rest/equipment/equipment")
	public ResponseEntity<Resource> downloadEquipmentEquipmentFile(@RequestParam("name") String psName) throws FileDownloadException {
		Equipment oEquipment = new Equipment(psName);
		int index = EquipmentManagerRequester.findEquipment(oEquipment);
		if(index == -1) {
			throw new FileDownloadException("Exception  raised in rest controller : equipment not found");
		}
		oEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
		String requiredFile = oEquipment.getEquipmentFilename();
		return downloadFile(requiredFile);
	}
	
	@GetMapping("/rest/habilitations/file")
	public ResponseEntity<Resource> downloadHabilitationFile(@RequestParam("name") String psName) throws FileDownloadException {
		Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		String sHabilitationFolder = oDatabaseFolderPath.resolve(FileConstants.AUTHORIZATIONS_FOLDER).toString();
		String sFileName = FileConstants.AUTHORIZATION_FILENAME_FUNCTION.apply(psName);
		String requiredFile = Paths.get(sHabilitationFolder, sFileName).toString();
		return downloadFile(requiredFile);
	}
	
	
	
}
