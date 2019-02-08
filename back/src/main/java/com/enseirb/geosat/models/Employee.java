package com.enseirb.geosat.models;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.enseirb.geosat.constants.FileConstants;
import com.fasterxml.jackson.annotation.JsonView;

public class Employee {
	
	public class EmployeeView {
		private EmployeeView() {}
	}
	
	private static DateFormat soDateFormatter = new SimpleDateFormat("yyyy-MM-dd");

	private String msFirstName;
	private String msLastName;
	private String msNationality;
	private String msIdNumber;
	
	private String msIdentityPapersType;
	private String msContractType;
	private String msDepartment;
	private Date moArrivalDate;
	private Date moEndContractDate;
	private String msAffiliateOffice;
	private String msPosition;
	
	private List<String> mlAuthorizations;
	private String msSupervisor;
	private String msSupervisorIdentifier;
	
	public Employee() {
		
	}
	
	public Employee(String psFirstName, String psLastName, String psNationality, String psIdNumber, String psIdentityPapersType,
			String psContractType, String psDepartment, Date poArrivalDate, Date poEndContractDate, String psAffiliateOffice,
			String psPosition, List<String> plAuthorizations, String psSupervisor, String psSupervisorIdentifier) {
		msFirstName = psFirstName;
		msLastName = psLastName;
		msNationality = psNationality;
		msIdNumber = psIdNumber;
		msIdentityPapersType = psIdentityPapersType;
		msContractType = psContractType;
		msDepartment = psDepartment;
		moArrivalDate = poArrivalDate;
		moEndContractDate = poEndContractDate;
		msAffiliateOffice = psAffiliateOffice;
		msPosition = psPosition;
		mlAuthorizations = plAuthorizations;
		msSupervisor = psSupervisor;
		msSupervisorIdentifier = psSupervisorIdentifier;
	}
	
	public Employee(String psFirstName, String psLastName, String psNationality, String psIdNumber, String psIdentityPapersType,
			String psContractType, String psDepartment, String psArrivalDate, String psEndContractDate, String psAffiliateOffice,
			String psPosition, List<String> plAuthorizations, String psSupervisor, String psSupervisorIdentifier) {
		try {
			msFirstName = psFirstName;
			msLastName = psLastName;
			msNationality = psNationality;
			msIdNumber = psIdNumber;
			msIdentityPapersType = psIdentityPapersType;
			msContractType = psContractType;
			msDepartment = psDepartment;
			moArrivalDate = Employee.soDateFormatter.parse(psArrivalDate);
			moEndContractDate = Employee.soDateFormatter.parse(psEndContractDate);
			msAffiliateOffice = psAffiliateOffice;
			msPosition = psPosition;
			mlAuthorizations = plAuthorizations;
			msSupervisor = psSupervisor;
			msSupervisorIdentifier = psSupervisorIdentifier;
		} catch (ParseException e) {
			e.printStackTrace();
			moArrivalDate = null;
			moEndContractDate = null;
		}
	}
	
	@JsonView(EmployeeView.class)
	public String getIdentityPapersType() {
		return msIdentityPapersType;
	}
	
	@JsonView(EmployeeView.class)
	public void setIdentityPapersType(String psIdentityPapersType) {
		this.msIdentityPapersType = psIdentityPapersType;
	}

	public Employee(String psIdentifier) {
		String parsedId[] = psIdentifier.split("_");
		if(parsedId.length == 2) {
			msIdNumber = parsedId[0];
			msNationality = parsedId[1];
		} else {
			msIdNumber = null;
			msNationality = null;
		}
	}
	
	public Employee(String psNationality, String psIdNumber) {
		msNationality = psNationality;
		msIdNumber = psIdNumber;
	}
	
	public String getIdentifier() {
		return msIdNumber + "_" + msNationality;
	}
	
	@JsonView(EmployeeView.class)
	public String getFirstName() {
		return msFirstName;
	}
	
	@JsonView(EmployeeView.class)
	public void setFirstName(String psFirstName) {
		this.msFirstName = psFirstName;
	}
	
	@JsonView(EmployeeView.class)
	public String getLastName() {
		return msLastName;
	}
	
	@JsonView(EmployeeView.class)
	public void setLastName(String psLastName) {
		this.msLastName = psLastName;
	}

	@JsonView(EmployeeView.class)
	public String getNationality() {
		return msNationality;
	}

	@JsonView(EmployeeView.class)
	public void setNationality(String psNationality) {
		this.msNationality = psNationality;
	}

	@JsonView(EmployeeView.class)
	public String getIdNumber() {
		return msIdNumber;
	}

	@JsonView(EmployeeView.class)
	public void setIdNumber(String psIdNumber) {
		this.msIdNumber = psIdNumber;
	}

	@JsonView(EmployeeView.class)
	public String getContractType() {
		return msContractType;
	}

	@JsonView(EmployeeView.class)
	public void setContractType(String psContractType) {
		this.msContractType = psContractType;
	}

	@JsonView(EmployeeView.class)
	public String getDepartment() {
		return msDepartment;
	}

	@JsonView(EmployeeView.class)
	public void setDepartment(String psDepartment) {
		this.msDepartment = psDepartment;
	}

	public Date getMoArrivalDate() {
		return moArrivalDate;
	}

	public void setMoArrivalDate(Date poArrivalDate) {
		this.moArrivalDate = poArrivalDate;
	}
	
	@JsonView(EmployeeView.class)
	public String getArrivalDate() {
		return this.moArrivalDate != null ? Employee.soDateFormatter.format(this.moArrivalDate) : null;
	}
	
	@JsonView(EmployeeView.class)
	public void setArrivalDate(String psArrivalDate) {
		try {
			this.moArrivalDate = Employee.soDateFormatter.parse(psArrivalDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			this.moArrivalDate = null;
		}
	}

	public Date getMoEndContractDate() {
		return moEndContractDate;
	}

	public void setMoEndContractDate(Date poEndContractDate) {
		this.moEndContractDate = poEndContractDate;
	}
	
	@JsonView(EmployeeView.class)
	public String getEndContractDate() {
		return this.moEndContractDate != null ? Employee.soDateFormatter.format(this.moEndContractDate) : null;
	}
	
	@JsonView(EmployeeView.class)
	public void setEndContractDate(String psEndContractDate) {
		if (psEndContractDate == null) {
			this.moEndContractDate = null;
			return;
		}
		try {
			this.moEndContractDate = Employee.soDateFormatter.parse(psEndContractDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@JsonView(EmployeeView.class)
	public String getPosition() {
		return msPosition;
	}
	
	@JsonView(EmployeeView.class)
	public void setPosition(String psPosition) {
		this.msPosition = psPosition;
	}

	@JsonView(EmployeeView.class)
	public String getAffiliateOffice() {
		return msAffiliateOffice;
	}

	@JsonView(EmployeeView.class)
	public void setAffiliateOffice(String psAffiliateOffice) {
		this.msAffiliateOffice = psAffiliateOffice;
	}

	@JsonView(EmployeeView.class)
	public List<String> getAuthorizations() {
		return mlAuthorizations;
	}

	@JsonView(EmployeeView.class)
	public void setAuthorizations(List<String> plAuthorizations) {
		this.mlAuthorizations = plAuthorizations;
	}

	@JsonView(EmployeeView.class)
	public String getSupervisor() {
		return msSupervisor;
	}

	@JsonView(EmployeeView.class)
	public void setSupervisor(String psSupervisor) {
		this.msSupervisor = psSupervisor;
	}

	@JsonView(EmployeeView.class)
	public String getSupervisorIdentifier() {
		return msSupervisorIdentifier;
	}

	@JsonView(EmployeeView.class)
	public void setSupervisorIdentifier(String msSupervisorIdentifier) {
		this.msSupervisorIdentifier = msSupervisorIdentifier;
	}

	public String getCVFilename() {
		return FileConstants.CV_FILENAME_FUNCTION.apply(this);
	}
	
	public String getCVArchiveFilename() {
		return this.msFirstName + "_" + this.msLastName + "_CV.docx";
	}
	
	public String getBioFilename() {
		return FileConstants.BIO_FILENAME_FUNCTION.apply(this);
	}
	
	public String getBioArchiveFilename() {
		return this.msFirstName + "_" + this.msLastName + "_Bio.docx";
	}
	
	public String getDiplomaFilename() {
		return FileConstants.DIPLOMAS_FILENAME_FUNCTION.apply(this);
	}
	public String getDiplomaArchiveFilename() {
		return this.msFirstName + "_" + this.msLastName + "_Diplomes.docx";
	}
	
}
