package com.enseirb.geosat.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.enseirb.geosat.controllers.EmployeeManagerController;
import com.enseirb.geosat.exceptions.EmployeeManagerException;
import com.enseirb.geosat.models.Employee;
import com.enseirb.geosat.models.Employee.EmployeeView;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
* @author Clément Larcher
* Class answering the requests asking information about employees
*/
@RestController
public class EmployeeManagerRestController {
	// TODO : add exception messages
	
	/**
	 * @param psIdNumber ID number of the employee
	 * @param psNationality Nationality of the employee
	 * @return Boolean Employee exists in database or not
	 */
	@GetMapping("/rest/person/exists")
	public Boolean employeeExists(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) {
		Employee eEmployee = new Employee(psNationality, psIdNumber);
		Boolean employeeExists = EmployeeManagerController.employeeExists(eEmployee);
		return employeeExists;
	}
	
	/**
	 * Adds the given employee in the database
	 * @param psEmployeeInfo JSON file containing the employee information
	 * @throws EmployeeManagerException Adding employee failed
	 */
	@PostMapping("/rest/person")
	public void addEmployee(@RequestBody String psEmployeeInfo) throws EmployeeManagerException {
		Employee oEmployee = null;
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oEmployee = oObjectMapper.readValue(psEmployeeInfo, Employee.class);
		} catch (Exception e) {
			throw new EmployeeManagerException("Erreur à la lecture du fichier JSON d'entrée, impossible d'ajouter l'employé",e);
		}
		EmployeeManagerController.addEmployee(oEmployee);
		return;
	}
	
	/**
	 * Updates the given employee in the database with the new information
	 * @param psEmployeeInfo JSON file containing the employee information
	 * @throws EmployeeManagerException Modifying employee failed
	 */
	@PutMapping("/rest/person")
	public void editEmployee(@RequestBody String psEmployeeInfo) throws EmployeeManagerException {
		Employee oEmployee = null;
		try {
			ObjectMapper oObjectMapper = new ObjectMapper();
			oEmployee = oObjectMapper.readValue(psEmployeeInfo, Employee.class);
		} catch (Exception e) {
			throw new EmployeeManagerException("Erreur à la lecture du fichier JSON d'entrée, impossible d'ajouter l'employé",e);
		}
		EmployeeManagerController.editEmployee(oEmployee);
	}
	
	/**
	 * Deletes from the database the given employee
	 * @param psIdNumber ID number of the employee
	 * @param psNationality Nationality of the employee
	 * @throws EmployeeManagerException Deleting employee failed
	 */
	@DeleteMapping("/rest/person")
	public void deleteEmployee(@RequestParam("idNumber") String psIdNumber, @RequestParam("nationality") String psNationality) throws EmployeeManagerException {
		Employee eEmployee = new Employee(psNationality, psIdNumber);
		EmployeeManagerController.deleteEmployee(eEmployee);
	}
	
	/**
	 * @return ListEmployees 
	 */
	@GetMapping("/rest/person")
	@JsonView(EmployeeView.class)
	public List<Employee> getAllEmployees() {
		List<Employee> lEmployees = EmployeeManagerController.getAllEmployees();
		return lEmployees;
	}
	
	
	
}
