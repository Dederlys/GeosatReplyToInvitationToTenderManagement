package com.enseirb.geosat.controllers;

import java.util.List;

import com.enseirb.geosat.databaserequester.EmployeeManagerRequester;
import com.enseirb.geosat.databaserequester.ValueTypesManager;
import com.enseirb.geosat.exceptions.EmployeeManagerException;
import com.enseirb.geosat.models.Employee;

/**
 * 
 * @author Clément Larcher
 * Controller that manage Employee requests from REST services
 */
public class EmployeeManagerController {
	
	/**
	 *
	 * Checks if the corresponding service of the employee exists
	 * @param poEmployee
	 * @return true if the service exists false else
	 */
	private static boolean serviceExists(Employee poEmployee) {
		return ValueTypesManager.getSoValueTypes().getMlPoles().contains(poEmployee.getDepartment());
	}
	
	/**
	 *
	 * Checks if the employee is present in the database
	 * @param poEmployee
	 * @return true if the employee exists false else
	 */
	public static Boolean employeeExists(Employee poEmployee) {
		return EmployeeManagerRequester.employeeExists(poEmployee);
	}
	
	/**
	 *
	 * Add an employee to the database
	 * @param poEmployee
	 * @throws EmployeeManagerException
	 */
	public static void addEmployee(Employee poEmployee) throws EmployeeManagerException {
		if (!serviceExists(poEmployee)) {
			throw new EmployeeManagerException("Le pôle dans lequel vous essayer de créer un employé n'existe pas");
		}
		EmployeeManagerRequester.addEmployee(poEmployee);
	}
	
	/**
	 *
	 * Edit an employee from the database
	 * @param poEmployee
	 * @throws EmployeeManagerException
	 */
	public static void editEmployee(Employee poEmployee) throws EmployeeManagerException {
		if (!serviceExists(poEmployee)) {
			throw new EmployeeManagerException("Le pôle dans lequel vous essayer de créer un employé n'existe pas");
		}
		EmployeeManagerRequester.editEmployee(poEmployee);
	}
	
	/**
	 *
	 * Deletes an employee from the database
	 * @param poEmployee
	 * @throws EmployeeManagerException
	 */
	public static void deleteEmployee(Employee poEmployee) throws EmployeeManagerException {
		EmployeeManagerRequester.deleteEmployee(poEmployee);
	}
	
	/**
	 *
	 * @return The list of employees
	 */
	public static List<Employee> getAllEmployees() {
		return EmployeeManagerRequester.getSlEmployees();
	}

}
