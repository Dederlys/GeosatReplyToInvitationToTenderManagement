package com.enseirb.geosat.databaserequester;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.core.io.UrlResource;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.exceptions.ArchiveProviderException;
import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Equipment;

/**
* @author Clement Larcher
* Class requesting the database to generate archive to answer an invitation to tender
*/
public class ArchiveProviderRequester {
	
	public static final String msArchiveFileName = "ReponseAppelOffre.zip";
	private static FileOutputStream moArchiveStream;
	private static ZipOutputStream moZipArchiveStream;
	private static List<String> mlIncludedAuthorizations;
	static int siComptEmployees;
	static int siComptEquipments;
	
	/**
	 * Initializes the internal variables
	 * @throws FileNotFoundException Could not instantiate archive
	 */
	private static void createArchive() throws FileNotFoundException {
		moArchiveStream = new FileOutputStream(msArchiveFileName);
		moZipArchiveStream = new ZipOutputStream(moArchiveStream);
		moZipArchiveStream.setLevel(0);
		mlIncludedAuthorizations = new ArrayList<String>();
		siComptEmployees = 0;
		siComptEquipments = 0;
	}
	
	/**
	 * Closes any initialized variable
	 * @throws FileNotFoundException Could not delete properly archive
	 */
	private static void deleteArchive() throws IOException {
		try {
			moZipArchiveStream.close();
		} catch (NullPointerException e) {}
		Files.deleteIfExists(Paths.get("ReponseAppelOffre.zip"));
		moArchiveStream = null;
		moZipArchiveStream = null;
		mlIncludedAuthorizations = null;
		siComptEmployees = 0;
		siComptEquipments = 0;
	}
	
	/**
	 * Adds to the archive the files that refer to the employees of the list, and their authorizations
	 * @param plEmployees List of the requested employees
	 * @throws ArchiveProviderException Adding employees in the archive failed
	 */
	private static void addEmployees(List<Employee> plEmployees) throws ArchiveProviderException {
		List<Employee> lAllEmployees = EmployeeManagerRequester.getSlEmployees();
		Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		for(Employee oEmployee : plEmployees) {
			int index = EmployeeManagerRequester.findEmployee(oEmployee);
			Employee oChosenEmployee = lAllEmployees.get(index);
			try {
				Path oCVFilePath = oRootDatabase.resolve(FileConstants.CV_FOLDER).resolve(oChosenEmployee.getCVFilename());
				ZipEntry oFileToAdd = new ZipEntry("Moyens_Humains/" + siComptEmployees + "_" + oChosenEmployee.getCVArchiveFilename());
				moZipArchiveStream.putNextEntry(oFileToAdd);
				writeFile(oCVFilePath);
				Path oBioFilePath = oRootDatabase.resolve(FileConstants.BIOS_FOLDER).resolve(oChosenEmployee.getBioFilename());
				oFileToAdd = new ZipEntry("Moyens_Humains/" + siComptEmployees + "_" + oChosenEmployee.getBioArchiveFilename());
				moZipArchiveStream.putNextEntry(oFileToAdd);
				writeFile(oBioFilePath);
				Path oDiplomasFilePath = oRootDatabase.resolve(FileConstants.DIPLOMAS_FOLDER).resolve(oChosenEmployee.getDiplomaFilename());
				oFileToAdd = new ZipEntry("Moyens_Humains/" + siComptEmployees + "_" + oChosenEmployee.getDiplomaArchiveFilename());
				moZipArchiveStream.putNextEntry(oFileToAdd);
				writeFile(oDiplomasFilePath);
			} catch (Exception e) {
				throw new ArchiveProviderException("Fichiers d'employés n'ont pas pu être ajoutés à l'archive, annulation de la requête", e);
			}
			List<String> lAuthorizations = oChosenEmployee.getAuthorizations();
			addAuthorizations("Moyens_Humains/", lAuthorizations);
			siComptEmployees++;
		}
		
	}
	
	/**
	 * Adds to the archive the files that refer to the authorizations of the list
	 * @param plAuthorizations List of the requested authorizations
	 * @throws ArchiveProviderException Adding authorizations in the archive failed
	 */
	private static void addAuthorizations(String psFolder, List<String> plAuthorizations) throws ArchiveProviderException {
		Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		try {
			for (String sAuthorization : plAuthorizations) {
				if(!mlIncludedAuthorizations.contains(sAuthorization)) {
					mlIncludedAuthorizations.add(sAuthorization);
					String sFileName = FileConstants.AUTHORIZATION_FILENAME_FUNCTION.apply(sAuthorization);
					Path oFilePath = (oRootDatabase.resolve(FileConstants.AUTHORIZATIONS_FOLDER)).resolve(sFileName);
					ZipEntry oFileToAdd = new ZipEntry(psFolder + oFilePath.getFileName().toString());
					moZipArchiveStream.putNextEntry(oFileToAdd);
					writeFile(oFilePath);
				}
			}
		} catch (IOException e) {
			throw new ArchiveProviderException("Fichiers d'habilitations n'ont pas pu être ajoutés à l'archive, annulation de la requête", e);
		}
	}
	
	/**
	 * Adds to the archive the files that refer to the equipments of the list
	 * @param plEquipments List of the requested equipments
	 * @throws ArchiveProviderException Adding equipments in the archive failed
	 */
	private static void addEquipments(List<Equipment> plEquipments) throws ArchiveProviderException {
		List<Equipment> lAllEquipments = EquipmentManagerRequester.getSlEquipments();
		for (Equipment oEquipment : plEquipments) {
			int index = EquipmentManagerRequester.findEquipment(oEquipment);
			Equipment oChosenEquipment = lAllEquipments.get(index);
			try {
				Path oDocumentationFilePath = Paths.get(oChosenEquipment.getEquipmentDocumentationFilename());
				ZipEntry oFileToAdd = new ZipEntry("Moyens_Materiels/" + siComptEquipments + "_"  + oChosenEquipment.getArchiveEquipmentDocumentationFilename());
				moZipArchiveStream.putNextEntry(oFileToAdd);
				writeFile(oDocumentationFilePath);
				Path oEquipmentFilePath = Paths.get(oChosenEquipment.getEquipmentFilename());
				oFileToAdd = new ZipEntry("Moyens_Materiels/" + siComptEquipments + "_"  + oChosenEquipment.getArchiveEquipmentFilename());
				moZipArchiveStream.putNextEntry(oFileToAdd);
				writeFile(oEquipmentFilePath);
			} catch (IOException e) {
				throw new ArchiveProviderException("Fichiers d'equipements n'ont pas pu être ajoutés à l'archive, annulation de la requête", e);
			}
			List<String> lAuthorizations = oChosenEquipment.getNeededAuthorizations();
			addAuthorizations("Moyens_Materiels/", lAuthorizations);
			siComptEquipments++;
		}
	}
	
	/**
	 * Adds to the archive the company description file
	 * @throws ArchiveProviderException Adding company description in the archive failed
	 */
	public static void addCompanyDescription() throws ArchiveProviderException {
		Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		Path oDescriptionFilePath = oRootDatabase.resolve(FileConstants.COMPANY_DESCRIPTION_FILE);
		try {
			ZipEntry oFileToAdd = new ZipEntry(oDescriptionFilePath.getFileName().toString());
			moZipArchiveStream.putNextEntry(oFileToAdd);
			writeFile(oDescriptionFilePath);
		} catch (Exception e) {
			throw new ArchiveProviderException("Fichiers de description d'entreprise n'ont pas pu être ajoutés à l'archive, annulation de la requête",e);
		}
	}
	
	/**
	 * Writes in the archive the file given in parameter
	 * @param poFileToWrite Path to the file to write from, in the archive
	 * @throws FileNotFoundException Could not find requested file
	 * @throws IOException Could not write requested file in archive 
	 */
	public static void writeFile(Path poFileToWrite) throws FileNotFoundException, IOException {
		FileInputStream oFis = new FileInputStream(poFileToWrite.toString());
		byte[] buffer = new byte[1024];
		int length;
		while ((length = oFis.read(buffer)) > 0) {
			moZipArchiveStream.write(buffer, 0, length);
        }
		moZipArchiveStream.closeEntry();
		oFis.close();
	}
	
	/**
	 * Creates the archive containing all the files needed for the invitation to tender
	 * @param plEmployees List of the requested employees
	 * @param plEquipments List of the requested equipments
	 * @throws ArchiveProviderException Request failed
	 * @return UrlResource Contains the archive
	 */
	public static UrlResource getZipArchive(List<Employee> plEmployees, List<Equipment> plEquipments) throws ArchiveProviderException {
		try {
			deleteArchive();
			createArchive();
		} catch (IOException e) {
			throw new ArchiveProviderException("Reinitialisation de l'archive a echoué, annulation de l'équipement", e);
		}
		addCompanyDescription();
		addEmployees(plEmployees);
		addEquipments(plEquipments);
		try {
			moZipArchiveStream.finish();
		} catch (IOException e) {
			throw new ArchiveProviderException("Erreur lors de la fermeture de l'archive",e);
		}
		try {
			UrlResource oRequestedFile = new UrlResource(Paths.get("ReponseAppelOffre.zip").toUri());
			return oRequestedFile;
		} catch (MalformedURLException e) {
			throw new ArchiveProviderException("Erreur lors du transfers de l'archive", e);
		}
	}
	
	

}
