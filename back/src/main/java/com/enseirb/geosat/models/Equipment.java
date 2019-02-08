package com.enseirb.geosat.models;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.enseirb.geosat.constants.FileConstants;
import com.enseirb.geosat.databaserequester.ConfigurationManagerRequester;
import com.enseirb.geosat.exceptions.EquipmentManagerException;
import com.fasterxml.jackson.annotation.JsonView;

public class Equipment {
	
	public class EquipmentView {
		private EquipmentView() {}
	}
	
	
	private static DateFormat soDateFormatter = new SimpleDateFormat("yyyy-MM-dd");
	
	private String msName;
	private String msDepartment;
	private String msLocation;
	
	private List<String> mlNeededAuthorizations;
	private Date moArrivalDate;
	
	public Equipment() {
		
	}

	public Equipment(String psName, String psDepartment, String psLocation, List<String> plNeededAuthorizations,
			String psArrivalDate) throws EquipmentManagerException {
		this.msName = psName;
		this.msDepartment = psDepartment;
		this.msLocation = psLocation;
		this.mlNeededAuthorizations = plNeededAuthorizations;
		try {
			this.moArrivalDate = soDateFormatter.parse(psArrivalDate);
		} catch (ParseException e) {
			throw new EquipmentManagerException("La date d'arrivée n'a pas pu être parsée pour la création de l'équipement", e);
		}
	}

	public Equipment(String psName) {
		this.msName = psName;
	}

	@JsonView(EquipmentView.class)
	public String getName() {
		return msName;
	}

	@JsonView(EquipmentView.class)
	public void setName(String psName) {
		this.msName = psName;
	}

	@JsonView(EquipmentView.class)
	public String getDepartment() {
		return msDepartment;
	}

	@JsonView(EquipmentView.class)
	public void setDepartment(String psDepartment) {
		this.msDepartment = psDepartment;
	}

	@JsonView(EquipmentView.class)
	public String getLocation() {
		return msLocation;
	}

	@JsonView(EquipmentView.class)
	public void setLocation(String msLocation) {
		this.msLocation = msLocation;
	}

	@JsonView(EquipmentView.class)
	public List<String> getNeededAuthorizations() {
		return mlNeededAuthorizations;
	}

	@JsonView(EquipmentView.class)
	public void setNeededAuthorizations(List<String> mlNeededAuthorizations) {
		this.mlNeededAuthorizations = mlNeededAuthorizations;
	}

	@JsonView(EquipmentView.class)
	public String getArrivalDate() {
		return moArrivalDate != null ? soDateFormatter.format(moArrivalDate) : null;
	}

	@JsonView(EquipmentView.class)
	public void setArrivalDate(String psArrivalDate) {
		if (psArrivalDate == null) {
			this.moArrivalDate = null;
			return;
		}
		try {
			this.moArrivalDate = soDateFormatter.parse(psArrivalDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String getEquipmentFilename() {
		Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		Path oDepartmentFolder = oRootDatabase.resolve(msDepartment);
		Path oDocumentationFolder = oDepartmentFolder.resolve(FileConstants.EQUIPMENT_FOLDER);
		Path oDocumentationPath = oDocumentationFolder.resolve(FileConstants.EQUIPMENT_FILENAME_FUNCTION.apply(this));
		return oDocumentationPath.toString();
	}
	
	public String getArchiveEquipmentFilename() {
		return this.msName + "_Description.docx";
	}
	
	public String getEquipmentDocumentationFilename() {
		Path oRootDatabase = Paths.get(ConfigurationManagerRequester.getSoConfiguration().getMsDatabaseFolder());
		Path oDepartmentFolder = oRootDatabase.resolve(msDepartment);
		Path oEquipmentFolder = oDepartmentFolder.resolve(FileConstants.EQUIPMENT_DOC_FOLDER);
		Path oEquipmentPath =  oEquipmentFolder.resolve(FileConstants.EQUIPMENT_DOCUMENTATION_FILENAME_FUNCTION.apply(this));
		return oEquipmentPath.toString();
	}
	public String getArchiveEquipmentDocumentationFilename() {
		return this.msName + "_Documentation.docx";
	}
}
