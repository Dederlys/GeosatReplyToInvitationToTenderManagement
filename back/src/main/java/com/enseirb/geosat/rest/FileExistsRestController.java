package com.enseirb.geosat.rest;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.controllers.FileExistsController;
import com.enseirb.geosat.exceptions.FileExistsException;
import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Equipment;
import com.enseirb.geosat.databaserequester.ConfigurationManagerRequester;
import com.enseirb.geosat.databaserequester.EquipmentManagerRequester;

@RestController
public class FileExistsRestController {

	private Boolean fileExists(String psFilename) throws FileExistsException { 
		Boolean bFileExists;
		try {
			bFileExists = FileExistsController.fileExists(psFilename);
		} catch (FileExistsException e) {
			throw new FileExistsException("Exception raised in rest controller : Problem enconted when looking for file", e);
		}
		try {
			return bFileExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when creating response entity", e);
		}
	}
	
	@GetMapping("/rest/presentation/exists")
	public Boolean companyDescriptionFileExists() throws FileExistsException {
		try {
			Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String sCompanyDescriptionFile = pDatabaseFolderPath.resolve(FileConstants.COMPANY_DESCRIPTION_FILE).toString();
			return fileExists(sCompanyDescriptionFile);
		} catch (FileExistsException e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when creating response", e);
		}
	}
	
	@GetMapping("/rest/person/bio/exists")
	public Boolean personBioExists(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileExistsException {
		Boolean bFileExists;
		try {
			Employee pTempEmployee = new Employee(psNationality, psIdNumber);
			String sFileName = FileConstants.BIO_FILENAME_FUNCTION.apply(pTempEmployee);
			Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String sBioFolderPath = pDatabaseFolderPath.resolve(FileConstants.BIOS_FOLDER).toString();
			bFileExists = FileExistsController.fileExists(Paths.get(sBioFolderPath, sFileName).toString());
			return bFileExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}	
	}
	
	@GetMapping("/rest/person/cv/exists")
	public Boolean personCVExists(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileExistsException {
		Boolean bFileExists;
		try {
			Employee pTempPerson = new Employee(psNationality, psIdNumber);
			String sFileName = FileConstants.CV_FILENAME_FUNCTION.apply(pTempPerson);
			Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String sCVFolderPath = pDatabaseFolderPath.resolve(FileConstants.CV_FOLDER ).toString();
			bFileExists = FileExistsController.fileExists(Paths.get(sCVFolderPath, sFileName).toString());
			return bFileExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}	
	}
	
	@GetMapping("/rest/person/diplomas/exists")
	public Boolean personDiplomasExists(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws FileExistsException {
		try {
			Employee pTempPerson = new Employee(psNationality, psIdNumber);
			String sFileName = FileConstants.DIPLOMAS_FILENAME_FUNCTION.apply(pTempPerson);
			Path pDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String sDiplomasFolderPath = pDatabaseFolderPath.resolve(FileConstants.DIPLOMAS_FOLDER ).toString();
			Boolean bFileExists = FileExistsController.fileExists(Paths.get(sDiplomasFolderPath, sFileName).toString());
			return bFileExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}	
	}
	
	@GetMapping("/rest/equipment/documentation/exists")
	public Boolean equipmentDocumentationExists(@RequestParam("name") String psName) throws FileExistsException {
		try {
			Equipment oTempEquipment = new Equipment(psName);
			int index = EquipmentManagerRequester.findEquipment(oTempEquipment);
			if(index == -1) {
				throw new FileExistsException("Exception  raised in rest controller : equipment not found");
			}
			oTempEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
			String sFileName = FileConstants.EQUIPMENT_DOCUMENTATION_FILENAME_FUNCTION.apply(oTempEquipment);
			String sDocumentationFolderPath = Paths.get(oTempEquipment.getEquipmentDocumentationFilename()).getParent().toString();
			Boolean bDocumentationExists = FileExistsController.fileExists(Paths.get(sDocumentationFolderPath, sFileName).toString());
			return bDocumentationExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}
	}
	
	@GetMapping("/rest/equipment/equipment/exists")
	public Boolean equipmentEquipmentFileExists(@RequestParam("name") String psName) throws FileExistsException {
		try {
			Equipment oTempEquipment = new Equipment(psName);
			int index = EquipmentManagerRequester.findEquipment(oTempEquipment);
			if(index == -1) {
				throw new FileExistsException("Exception  raised in rest controller : equipment not found");
			}
			oTempEquipment = EquipmentManagerRequester.getSlEquipments().get(index);
			String sFileName = FileConstants.EQUIPMENT_FILENAME_FUNCTION.apply(oTempEquipment);
			String sEquipmentFolderPath = Paths.get(oTempEquipment.getEquipmentFilename()).getParent().toString();
			System.out.println(sFileName);
			System.out.println(sEquipmentFolderPath);
			Boolean bEquipmentExists = FileExistsController.fileExists(Paths.get(sEquipmentFolderPath, sFileName).toString());
			return bEquipmentExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}
	}
	
	@GetMapping("/rest/habilitations/file/exists")
	public Boolean habilitationFileExists(@RequestParam("name") String psName) throws FileExistsException {
		try {
			Path oDatabaseFolderPath = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			String sFileName = FileConstants.AUTHORIZATION_FILENAME_FUNCTION.apply(psName);
			String sHabilitationsFolderPath = oDatabaseFolderPath.resolve(FileConstants.AUTHORIZATIONS_FOLDER).toString();
			Boolean oHabilitationExists = FileExistsController.fileExists(Paths.get(sHabilitationsFolderPath, sFileName).toString());
			return oHabilitationExists;
		} catch (Exception e) {
			throw new FileExistsException("Exception  raised in rest controller : Problem encountered when checking file existance", e);
		}
	}
	
}
