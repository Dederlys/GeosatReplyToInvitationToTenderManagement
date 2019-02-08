package com.enseirb.geosat.constants;

import java.util.function.Function;

import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Equipment;

/**
 *
 * @author Xavier Moreto
 * Constants related to the filenames and path in the application except those who can change in the config file
 */
public class FileConstants {
	
	// To avoid instantiation
	private FileConstants() { }

	// Path of the configuration file
	public static final String CONFIGURATION_FILE = "config.json";
	
	// Name of the general folder
	public static final String GENERAL_FOLDER = "general";
	// Path of the folder that contains the company description
	public static final String ENTREPRISE_FOLDER = GENERAL_FOLDER + "/entreprise";
	// Path of the folder that contains the authorizations files
	public static final String AUTHORIZATIONS_FOLDER = GENERAL_FOLDER + "/habilitations";
	
	// Name of the rh folder
	public static final String RH_FOLDER = "rh";
	// Path of the folder that contains the biographies of the employees
	public static final String BIOS_FOLDER = RH_FOLDER + "/bios";
	// Path of the folder that contains the CVs of the employees
	public static final String CV_FOLDER = RH_FOLDER + "/cv";
	// Path of the folder that contains the diplomas of the employees
	public static final String DIPLOMAS_FOLDER = RH_FOLDER + "/diplomes";
	
	// Name of the folders in services
	public static final String EQUIPMENT_DOC_FOLDER = "fiches";
	public static final String EQUIPMENT_FOLDER = "materiels";
	public static final String MEAN_FOLDER = "methodes";
	public static final String PROJECTS_FOLDER = "projets";
	
	// Path of the company description file
	public static final String COMPANY_DESCRIPTION_FILE = ENTREPRISE_FOLDER + "/Description Entreprise.docx";
	
	// Function that gives the filename of the CV in function of an employee
	public static final Function<Employee, String> CV_FILENAME_FUNCTION = (Employee poPerson) -> (poPerson.getIdentifier() + "_CV.docx");
	// Function that gives the filename of the Bios in function of an employee
	public static final Function<Employee, String> BIO_FILENAME_FUNCTION = (Employee poPerson) -> (poPerson.getIdentifier() + "_Bio.docx");
	// Function that gives the filename of the Diploma in function of an employee
	public static final Function<Employee, String> DIPLOMAS_FILENAME_FUNCTION = (Employee poPerson) -> (poPerson.getIdentifier() + "_Diplômes.docx");
	
	// Function that gives the filename of the Equipment filename
	public static final Function<Equipment, String> EQUIPMENT_FILENAME_FUNCTION = (Equipment poEquipment) -> (poEquipment.getName() + "_Equipment.docx");
	// Function that gives the filename of the Equipment documentation filename
	public static final Function<Equipment, String> EQUIPMENT_DOCUMENTATION_FILENAME_FUNCTION = (Equipment poEquipment) -> (poEquipment.getName() + "_DocumentationEquipment.docx");
	
	// Function that gives the authorization path for an authorization
	public static final Function<String, String> AUTHORIZATION_FILENAME_FUNCTION = (String psName) -> (psName + ".docx");
	
}
