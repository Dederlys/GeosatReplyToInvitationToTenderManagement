package com.enseirb.geosat.rest;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.controllers.FileUploadController;
import com.enseirb.geosat.exceptions.FileExistsException;
import com.enseirb.geosat.exceptions.FileUploadException;
import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Equipment;
import com.enseirb.geosat.databaserequester.ConfigurationManagerRequester;
import com.enseirb.geosat.databaserequester.EquipmentManagerRequester;

@RestController
public class FileUploadRestController {

	private void uploadFile(MultipartFile pmFile, String psDestinationFolder, String psFileRename) throws FileUploadException {
		FileUploadController.writeUploadedFile(pmFile, psDestinationFolder, psFileRename);
	}
	
	@PostMapping("/rest/presentation")
	public void uploadCompanyDescriptionFile(@RequestParam("file") MultipartFile poFile) throws FileUploadException {
		try {
			Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			Path pCompanyDescriptionFilePath = pDatabaseFolderPath.resolve(FileConstants.COMPANY_DESCRIPTION_FILE);
			String sDestinationFolder = pCompanyDescriptionFilePath.getParent().toString();
			String sCompanyDescriptionFileName = pCompanyDescriptionFilePath.getFileName().toString();
			uploadFile(poFile, sDestinationFolder, sCompanyDescriptionFileName);
		} catch (FileUploadException e) {
			throw new FileUploadException("Exception  raised in rest controller : Problem encountered in the company description upload", e);
		}
	}
	
	@PostMapping("/rest/person/cv")
	public void uploadCVFile(@RequestParam("file") MultipartFile poFile, @RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileUploadException {
		try {
			Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			Employee oEmployee = new Employee(psNationality, psIdNumber);

			Path oCVPath = oDatabaseFolderPath.resolve(FileConstants.CV_FOLDER);
			String sFileName = oEmployee.getCVFilename();
			uploadFile(poFile, oCVPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	@PostMapping("/rest/person/bio")
	public void uploadBioFile(@RequestParam("file") MultipartFile poFile, @RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileUploadException {
		try {
			Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			Employee oEmployee = new Employee(psNationality, psIdNumber);

			Path oBioPath = oDatabaseFolderPath.resolve(FileConstants.BIOS_FOLDER);
			String sFileName = oEmployee.getBioFilename();
			uploadFile(poFile, oBioPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	@PostMapping("/rest/person/diplomas")
	public void uploadDiplomasFile(@RequestParam("file") MultipartFile poFile, @RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileUploadException {
		try {
			Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			Employee oEmployee = new Employee(psNationality, psIdNumber);

			Path oDiplomasPath = oDatabaseFolderPath.resolve(FileConstants.DIPLOMAS_FOLDER);
			String sFileName = oEmployee.getDiplomaFilename();
			uploadFile(poFile, oDiplomasPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	@PostMapping("/rest/equipment/documentation")
	public void uploadEquipmentDocumentation(@RequestParam("file") MultipartFile poFile, @RequestParam("name") String psName) throws FileUploadException {
		try {
			Equipment oEquipment = new Equipment(psName);
			int index = EquipmentManagerRequester.findEquipment(oEquipment);
			if(index == -1) {
				throw new FileExistsException("Exception  raised in rest controller : equipment not found");
			}
			oEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
			String sFileName = FileConstants.EQUIPMENT_DOCUMENTATION_FILENAME_FUNCTION.apply(oEquipment);
			String sDocumentationFolderPath = Paths.get(oEquipment.getEquipmentDocumentationFilename()).getParent().toString();
			uploadFile(poFile, sDocumentationFolderPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	@PostMapping("/rest/equipment/equipment")
	public void uploadEquipmentEquipmentFile(@RequestParam("file") MultipartFile poFile, @RequestParam("name") String psName) throws FileUploadException {
		try {
			Equipment oEquipment = new Equipment(psName);
			int index = EquipmentManagerRequester.findEquipment(oEquipment);
			if(index == -1) {
				throw new FileExistsException("Exception  raised in rest controller : equipment not found");
			}
			oEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
			String sFileName = FileConstants.EQUIPMENT_FILENAME_FUNCTION.apply(oEquipment);
			String sEquipmentFolderPath = Paths.get(oEquipment.getEquipmentFilename()).getParent().toString();
			uploadFile(poFile, sEquipmentFolderPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	@PostMapping("/rest/habilitations/file")
	public void uploadHabilitationFile(@RequestParam("file") MultipartFile poFile, @RequestParam("name") String psName) throws FileUploadException {
		try {
			Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String oHabiltationPath = oDatabaseFolderPath.resolve(FileConstants.AUTHORIZATIONS_FOLDER).toString();
			String sFileName = FileConstants.AUTHORIZATION_FILENAME_FUNCTION.apply(psName);
			uploadFile(poFile, oHabiltationPath.toString(), sFileName);
		} catch (Exception e) {
			throw new FileUploadException("",e);
		}		
	}
	
	
}
