package com.enseirb.geosat.databaserequester;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.enseirb.geosat.exceptions.EmployeeManagerException;
import com.enseirb.geosat.models.Configuration;
import com.enseirb.geosat.models.Employee;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 *
 * @author Xavier Moreto
 * Class that manages the read/write on the database file of employees
 */
public class EmployeeManagerRequester {
	
	// List of Employees stored in database
	private static List<Employee> slEmployees;
	
	// Path of the employees file
	private static Path soEmployeesFilePath;
	
	// Executed when we make the first call to a static context of this class
	static {
		Configuration oConfig = ConfigurationManagerRequester.getSoConfiguration();
		
		EmployeeManagerRequester.soEmployeesFilePath = Paths.get(oConfig.getMsDatabaseFolder()).resolve(oConfig.getMsEmployees());
		
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oObjectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			
			EmployeeManagerRequester.slEmployees = new ArrayList<>();
			EmployeeManagerRequester.slEmployees.addAll(Arrays.asList(oObjectMapper.readerWithView(Employee.EmployeeView.class)
					.forType(Employee[].class).readValue(EmployeeManagerRequester.soEmployeesFilePath.toFile())));
		} catch (IOException e) {
			// TODO: something
			e.printStackTrace();
			
			EmployeeManagerRequester.slEmployees = new ArrayList<>();
			recordChanges();
		}
	}
	
	/**
	 *
	 * Write the list of employees into the json file
	 */
	private static void recordChanges() {	
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oObjectMapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
			
			//configure Object mapper for pretty print
			oObjectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			
			//writing to console, can write to any output stream such as file
			oObjectMapper.writerWithView(Employee.EmployeeView.class).writeValue(EmployeeManagerRequester.soEmployeesFilePath.toFile(), EmployeeManagerRequester.slEmployees);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 *
	 * @return The list of employees in the file
	 */
	public static List<Employee> getSlEmployees() {
		return slEmployees;
	}
	
	/**
	 *
	 * Gets the index of the requested employee in the database
	 * @param poEmployee The employee to find
	 * @return The index of the employee or -1 if not found
	 */
	public static int findEmployee(Employee poEmployee) {
		int i = 0;
		
		for (Employee oEmployee : slEmployees) {
			if (oEmployee.getIdentifier().equals(poEmployee.getIdentifier())) {
				return i;
			}
			i++;
		}
		
		return -1;
	}

	/**
	 *
	 * Checks if the employee is in the database
	 * @param poEmployee The employee to check
	 * @return true if the employee is in the database, false else
	 */
	public static Boolean employeeExists(Employee poEmployee) {
		return findEmployee(poEmployee) != -1; 
	}
	
	/**
	 *
	 * Adds a new employee in the database
	 * @param poEmployee The employee to add
	 * @throws EmployeeManagerException Thrown if the employee already exists or if the supervisor doesn't exist
	 */
	public static void addEmployee(Employee poEmployee) throws EmployeeManagerException {
		if (findEmployee(poEmployee) == -1) {
			if (poEmployee.getSupervisorIdentifier() != null) {
				String[] lSupervisorIdentifier = poEmployee.getSupervisorIdentifier().split("_");
				if (!employeeExists(new Employee(lSupervisorIdentifier[1], lSupervisorIdentifier[0]))) {
					throw new EmployeeManagerException("Le superviseur de l'employé que vous essayez d'insérer n'existe pas");
				}
			}
			slEmployees.add(poEmployee);
			recordChanges();
		} else {
			throw new EmployeeManagerException("L'employé existe déjà");
		}
	}
	
	/**
	 *
	 * Edits an employee in the database
	 * @param poEmployee The edited employee
	 * @throws EmployeeManagerException Thrown if the employee doesn't exists or if the supervisor doesn't exist
	 */
	public static void editEmployee(Employee poEmployee) throws EmployeeManagerException {
		int i;
		if ((i = findEmployee(poEmployee)) == -1) {
			throw new EmployeeManagerException("L'employé n'existe pas");
		} else {
			if (poEmployee.getSupervisorIdentifier() != null) {
				String[] lSupervisorIdentifier = poEmployee.getSupervisorIdentifier().split("_");
				if (!employeeExists(new Employee(lSupervisorIdentifier[1], lSupervisorIdentifier[0]))) {
					throw new EmployeeManagerException("Le superviseur de l'employé que vous essayez de modifier n'existe pas");
				}
			}
			slEmployees.set(i, poEmployee);
			recordChanges();
		}
	}
	
	/**
	 *
	 * Deletes an employee from the database
	 * @param poEmployee The employee to delete
	 * @throws EmployeeManagerException Thrown if the employee doesn't exists or if he is the supervisor of someone
	 */
	public static void deleteEmployee(Employee poEmployee) throws EmployeeManagerException {
		int i;
		if ((i = findEmployee(poEmployee)) == -1) {
			throw new EmployeeManagerException("L'employé n'existe pas");
		} else {
			for (Employee oEmployee : slEmployees) {
				if (oEmployee.getSupervisorIdentifier() != null && oEmployee.getSupervisorIdentifier().equals(poEmployee.getIdentifier())) {
					throw new EmployeeManagerException("Cet employé ne peut pas être supprimé car il est le superviseur de quelqu'un");
				}
			}
			slEmployees.remove(i);
			recordChanges();
		}
	}

}
