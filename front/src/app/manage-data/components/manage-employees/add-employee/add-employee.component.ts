import { Component, OnInit } from '@angular/core';
import { Person, Department, Location, ContractType, IdentityPapersType, Authorization } from 'src/app/data-classes';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { Router } from '@angular/router';
import { ManageEmployeesService } from '../manage-employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public newEmployee: Person;

  public resume: File;
  public biography: File;
  public diplomas: File;

  public dayArrival: number;
  public monthArrival: number;
  public yearArrival: number;

  public dayEndOfContract: number;
  public monthEndOfContract: number;
  public yearEndOfContract: number;

  public newEmployeeSupervisor: Person;

  public allAuthorizations: Authorization[];
  public allContractTypes: ContractType[];
  public allDepartments: Department[];
  public allEmployees: Person[];
  public allIdentityPapersTypes: IdentityPapersType[];
  public allLocations: Location[];

  public showNewAuthorization = false;
  public newAuthorization: string;

  showAlertBox = false;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageEmployeesService: ManageEmployeesService,
    private router: Router
  ) {
    this.newEmployee = new Person();
    this.newEmployee.authorizations = new Array<string>();
    this.allContractTypes = new Array<ContractType>();
    this.allDepartments = new Array<Department>();
    this.allEmployees = new Array<Person>();
    this.allIdentityPapersTypes = new Array<IdentityPapersType>();
    this.allLocations = new Array<Location>();
  }

  ngOnInit() {
    this.getAllAuthorizations();
    this.getAllContractTypes();
    this.getAllDepartments();
    this.getAllEmployees();
    this.getAllIdentityPapersTypes();
    this.getAllLocations();
  }

  getAllAuthorizations() {
    this.retrieveDataService.getAuthorizations()
      .subscribe(authorizations => this.allAuthorizations = authorizations);
  }

  getAllContractTypes() {
    this.retrieveDataService.getContractTypes()
      .subscribe(contractTypes => this.allContractTypes = contractTypes);
  }

  getAllDepartments() {
    this.retrieveDataService.getDepartments()
      .subscribe(departments => this.allDepartments = departments);
  }

  getAllEmployees() {
    this.retrieveDataService.getPeople()
      .subscribe(people => this.allEmployees = people);
  }

  getAllIdentityPapersTypes() {
    this.retrieveDataService.getIdentityPapersTypes()
      .subscribe(identityPapersTypes => this.allIdentityPapersTypes = identityPapersTypes);
  }

  getAllLocations() {
    this.retrieveDataService.getLocations()
      .subscribe(locations => this.allLocations = locations);
  }

  addEmployee() {
    if (this.checkIsValidEmployee()) {
      this.newEmployee.arrivalDate = this.yearArrival + '-' + this.monthArrival + '-' + this.dayArrival;

      if (this.newEmployeeSupervisor != null) {
        this.newEmployee.supervisor =
          this.newEmployeeSupervisor.firstName + ' ' + this.newEmployeeSupervisor.lastName;
        this.newEmployee.supervisorIdentifier =
          this.newEmployeeSupervisor.idNumber + '_' + this.newEmployeeSupervisor.nationality;
      }
      // If no date for end of contract, then store arrival date (in case of undefined duration contract)
      if (this.yearEndOfContract != null && this.monthEndOfContract != null && this.dayEndOfContract != null) {
        this.newEmployee.endContractDate = this.yearEndOfContract + '-' + this.monthEndOfContract + '-' + this.dayEndOfContract;
      }

      this.showAlertBox = false;

      this.manageEmployeesService.addEmployee(this.newEmployee)
        .subscribe(res => {
          if (this.resume != null) {
            this.manageEmployeesService.sendResume(this.newEmployee, this.resume).subscribe();
          }
          if (this.biography != null) {
            this.manageEmployeesService.sendBiography(this.newEmployee, this.biography).subscribe();
          }
          if (this.diplomas != null) {
            this.manageEmployeesService.sendDiplomas(this.newEmployee, this.diplomas).subscribe();
          }
          this.getBackToEmployees();
        }
        );
    } else {
      this.showAlertBox = true;
    }
  }

  onResumeChange(event) {
    this.resume = event.target.files[0];
  }

  onBiographyChange(event) {
    this.biography = event.target.files[0];
  }

  onDiplomasChange(event) {
    this.diplomas = event.target.files[0];
  }

  getBackToEmployees() {
    this.router.navigate(['/', 'manage-data', 'employees']);
  }

  addNewAuthorization() {
    this.newEmployee.authorizations.push(this.newAuthorization);
    this.showNewAuthorization = false;
    console.log(this.newEmployee.authorizations);
  }

  deleteAuthorization(authorization: string) {
    this.newEmployee.authorizations =
      this.newEmployee.authorizations.filter(a => a !== authorization);
  }

  checkIsValidEmployee(): boolean {
    return (
      this.newEmployee.firstName != null
      && this.newEmployee.lastName != null
      && this.newEmployee.department != null

      && this.dayArrival != null
      && this.monthArrival != null
      && this.yearArrival != null

      && this.newEmployee.nationality != null
      && this.newEmployee.contractType != null
      && this.newEmployee.position != null
      && this.newEmployee.affiliateOffice != null
      && this.newEmployee.idNumber != null
      && this.newEmployee.identityPapersType != null

      && this.resume != null
      && this.biography != null
      && this.diplomas != null
    );
  }
}
