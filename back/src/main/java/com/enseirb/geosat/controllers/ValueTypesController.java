package com.enseirb.geosat.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.databaserequester.ConfigurationManagerRequester;
import com.enseirb.geosat.databaserequester.ValueTypesManager;
import com.enseirb.geosat.exceptions.ValueTypeException;

/**
 * 
 * @author Clément Larcher
 * Controller that manage ValueTypes requests from REST services
 */
public class ValueTypesController {
	
	/**
	 *
	 * Gets the list of titles in the databases
	 * @return The list of titles
	 */
	public static List<String> getTitlesValueTypes() {
		List<String> lTitles = ValueTypesManager.getSoValueTypes().getMlTitles();
		return lTitles;
	}
	
	/**
	 *
	 * Adds a title in the database if it isn't already in
	 * @param psTitle The title to add
	 * @throws ValueTypeException
	 */
	public static void addTitleValueType(String psTitle) throws ValueTypeException {
		try {
			//psTitle.
			List<String> lTitles = ValueTypesManager.getSoValueTypes().getMlTitles();
			if(lTitles.contains(psTitle)) {
				throw new ValueTypeException("");
			} else {
			lTitles.add(psTitle);
			ValueTypesManager.getSoValueTypes().setMlTitles(lTitles);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Removes a title in the database
	 * @param psTitle The title to delete
	 * @throws ValueTypeException
	 */
	public static void removeTitleValueType(String psTitle) throws ValueTypeException {
		try {
			List<String> lTitles = ValueTypesManager.getSoValueTypes().getMlTitles();
			if(!lTitles.contains(psTitle)) {
				throw new ValueTypeException("");
			} else {
			lTitles.remove(psTitle);
			ValueTypesManager.getSoValueTypes().setMlTitles(lTitles);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Gets the list of sites in the databases
	 * @return The list of sites
	 */
	public static List<String> getSitesValueTypes() {
		List<String> lSites = ValueTypesManager.getSoValueTypes().getMlSites();
		return lSites;
	}
	
	/**
	 *
	 * Adds a site in the database if it isn't already in
	 * @param psSite The site to add
	 * @throws ValueTypeException
	 */
	public static void addSiteValueType(String psSite) throws ValueTypeException {
		try {
			List<String> lSites = ValueTypesManager.getSoValueTypes().getMlSites();
			if(lSites.contains(psSite)) {
				throw new ValueTypeException("");
			} else {
				lSites.add(psSite);
			ValueTypesManager.getSoValueTypes().setMlSites(lSites);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Removes a site in the database
	 * @param psSite The site to delete
	 * @throws ValueTypeException
	 */
	public static void removeSiteValueType(String psSite) throws ValueTypeException {
		try {
			List<String> lSites = ValueTypesManager.getSoValueTypes().getMlSites();
			if(!lSites.contains(psSite)) {
				throw new ValueTypeException("");
			} else {
				lSites.remove(psSite);
			ValueTypesManager.getSoValueTypes().setMlSites(lSites);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}

	/**
	 *
	 * Gets the list of contracts types in the databases
	 * @return The list of contracts
	 */
	public static List<String> getContractsValueTypes() {
		List<String> lContracts = ValueTypesManager.getSoValueTypes().getMlContracts();
		return lContracts;
	}
	
	/**
	 *
	 * Adds a contract in the database if it isn't already in
	 * @param psContract The contract to add
	 * @throws ValueTypeException
	 */
	public static void addContractValueType(String psContract) throws ValueTypeException {
		try {
			List<String> lContracts = ValueTypesManager.getSoValueTypes().getMlContracts();
			if(lContracts.contains(psContract)) {
				throw new ValueTypeException("");
			} else {
				lContracts.add(psContract);
				ValueTypesManager.getSoValueTypes().setMlContracts(lContracts);
				ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Removes a contract in the database
	 * @param psContract The contract to delete
	 * @throws ValueTypeException
	 */
	public static void removeContractValueType(String psContract) throws ValueTypeException {
		try {
			List<String> lContracts = ValueTypesManager.getSoValueTypes().getMlContracts();
			if(!lContracts.contains(psContract)) {
				throw new ValueTypeException("");
			} else {
				lContracts.remove(psContract);
			ValueTypesManager.getSoValueTypes().setMlContracts(lContracts);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Gets the list of positions in the databases
	 * @return The list of positions
	 */
	public static List<String> getPositionsValueTypes() {
		List<String> lPositions = ValueTypesManager.getSoValueTypes().getMlPositions();
		return lPositions;
	}
	
	/**
	 *
	 * Adds a position in the database if it isn't already in
	 * @param psPosition The position to add
	 * @throws ValueTypeException
	 */
	public static void addPositionValueType(String psPosition) throws ValueTypeException {
		try {
			List<String> lPositions = ValueTypesManager.getSoValueTypes().getMlPositions();
			if(lPositions.contains(psPosition)) {
				throw new ValueTypeException("");
			} else {
				lPositions.add(psPosition);
			ValueTypesManager.getSoValueTypes().setMlPositions(lPositions);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Removes a position in the database
	 * @param psPosition The position to delete
	 * @throws ValueTypeException
	 */
	public static void removePositionValueType(String psPosition) throws ValueTypeException {
		try {
			List<String> lPositions = ValueTypesManager.getSoValueTypes().getMlPositions();
			if(!lPositions.contains(psPosition)) {
				throw new ValueTypeException("");
			} else {
				lPositions.remove(psPosition);
			ValueTypesManager.getSoValueTypes().setMlPositions(lPositions);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Gets the list of poles in the databases
	 * @return The list of poles
	 */
	public static List<String> getPolesValueTypes() {
		List<String> lPoles = ValueTypesManager.getSoValueTypes().getMlPoles();
		return lPoles;
	}
	
	/**
	 *
	 * Adds a pole in the database if it isn't already in
	 * @param psPole The pole to add
	 * @throws ValueTypeException
	 */
	public static void addPoleValueType(String psPole) throws ValueTypeException {
		try {
			List<String> lPoles = ValueTypesManager.getSoValueTypes().getMlPoles();
			if(lPoles.contains(psPole)) {
				throw new ValueTypeException("");
			} else {
				lPoles.add(psPole);
			ValueTypesManager.getSoValueTypes().setMlPoles(lPoles);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	/**
	 *
	 * Removes a pole in the database
	 * @param psPole The pole to delete
	 * @throws ValueTypeException
	 */
	public static void removePoleValueType(String psPole) throws ValueTypeException {
		try {
			List<String> lPoles = ValueTypesManager.getSoValueTypes().getMlPoles();
			if(!lPoles.contains(psPole)) {
				throw new ValueTypeException("");
			} else {
				lPoles.remove(psPole);
			ValueTypesManager.getSoValueTypes().setMlPoles(lPoles);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	public static List<String> getAuthorizationsValueTypes() {
		List<String> lAuthorizations = ValueTypesManager.getSoValueTypes().getMlAuthorizations();
		return lAuthorizations;
	}
	
	public static void addAuthorizationValueType(String psAuthorization) throws ValueTypeException {
		try {
			List<String> lAuthorizations = ValueTypesManager.getSoValueTypes().getMlAuthorizations();
			if(lAuthorizations.contains(psAuthorization)) {
				throw new ValueTypeException("");
			} else {
				lAuthorizations.add(psAuthorization);
			ValueTypesManager.getSoValueTypes().setMlAuthorizations(lAuthorizations);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
	public static void removeAuthorizationValueType(String psAuthorization) throws ValueTypeException {
		try {
			List<String> lAuthorizations = ValueTypesManager.getSoValueTypes().getMlAuthorizations();
			if(!lAuthorizations.contains(psAuthorization)) {
				throw new ValueTypeException("");
			} else {
				lAuthorizations.remove(psAuthorization);
			Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
			Files.delete(oRootDatabase.resolve(FileConstants.AUTHORIZATIONS_FOLDER).resolve(FileConstants.AUTHORIZATION_FILENAME_FUNCTION.apply(psAuthorization)));
			ValueTypesManager.getSoValueTypes().setMlAuthorizations(lAuthorizations);
			ValueTypesManager.recordChanges();
			}
		} catch (Exception e) {
			throw new ValueTypeException("",e);
		}
	}
	
}
