import { Component, OnInit, Input } from '@angular/core';
import { Person, Authorization, ContractType, Department, IdentityPapersType, Location } from 'src/app/data-classes';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageEmployeesService } from '../manage-employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  @Input() employee: Person;

  public resume: File;
  public biography: File;
  public diplomas: File;

  public dayArrival: number;
  public monthArrival: number;
  public yearArrival: number;

  public dayEndOfContract: number;
  public monthEndOfContract: number;
  public yearEndOfContract: number;

  public employeeSupervisor: Person;

  public allAuthorizations: Authorization[];
  public allContractTypes: ContractType[];
  public allDepartments: Department[];
  public allEmployees: Person[];
  public allIdentityPapersTypes: IdentityPapersType[];
  public allLocations: Location[];

  public showNewAuthorization = false;
  public newAuthorization: string;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageEmployeesService: ManageEmployeesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSelectedEmployee();

    this.getAllAuthorizations();
    this.getAllContractTypes();
    this.getAllDepartments();
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

  getAllIdentityPapersTypes() {
    this.retrieveDataService.getIdentityPapersTypes()
      .subscribe(identityPapersTypes => this.allIdentityPapersTypes = identityPapersTypes);
  }

  getAllLocations() {
    this.retrieveDataService.getLocations()
      .subscribe(locations => this.allLocations = locations);
  }

  getSelectedEmployee(): void {
    this.manageEmployeesService.getSelectedPeopleToManage().subscribe(selectedPeople => {
      if (selectedPeople[0] == null) {
        this.router.navigate(['/', 'manage-data', 'employees']);
      } else {
        this.employee = selectedPeople[0];

        const dateArrival = this.employee.arrivalDate.split('-');
        this.yearArrival = Number.parseInt(dateArrival[0], 10);
        this.monthArrival = Number.parseInt(dateArrival[1], 10);
        this.dayArrival = Number.parseInt(dateArrival[2], 10);

        if (this.employee.endContractDate !== null) {
          const dateEndOfContract = this.employee.endContractDate.split('-');
          this.yearEndOfContract = Number.parseInt(dateEndOfContract[0], 10);
          this.monthEndOfContract = Number.parseInt(dateEndOfContract[1], 10);
          this.dayEndOfContract = Number.parseInt(dateEndOfContract[2], 10);
        }

        this.retrieveDataService.getPeople()
          .subscribe(people => {
            this.allEmployees = people;
            this.employeeSupervisor = this.allEmployees
              .find((employee) => (employee.idNumber + '_' + employee.nationality) === this.employee.supervisorIdentifier);
          });
      }
    });
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
    this.employee.authorizations.push(this.newAuthorization);
    this.showNewAuthorization = false;
  }

  deleteAuthorization(authorization: string) {
    this.employee.authorizations =
      this.employee.authorizations.filter(a => a !== authorization);
  }

  editEmployee() {
    this.employee.arrivalDate = this.yearArrival + '-' + this.monthArrival + '-' + this.dayArrival;

    if (this.employeeSupervisor != null) {
      this.employee.supervisor =
        this.employeeSupervisor.firstName + ' ' + this.employeeSupervisor.lastName;
      this.employee.supervisorIdentifier =
        this.employeeSupervisor.idNumber + '_' + this.employeeSupervisor.nationality;
    }
    // If no date for end of contract, then store arrival date (in case of undefined duration contract)
    if (this.yearEndOfContract != null && this.monthEndOfContract != null && this.dayEndOfContract != null) {
      this.employee.endContractDate = this.yearEndOfContract + '-' + this.monthEndOfContract + '-' + this.dayEndOfContract;
    }

    this.manageEmployeesService.editEmployee(this.employee).subscribe(
      () => {
        if (this.resume != null) {
          this.manageEmployeesService.sendResume(this.employee, this.resume).subscribe();
        }
        if (this.biography != null) {
          this.manageEmployeesService.sendBiography(this.employee, this.biography).subscribe();
        }
        if (this.diplomas != null) {
          this.manageEmployeesService.sendDiplomas(this.employee, this.diplomas).subscribe();
        }
        this.getBackToEmployees();
      }
    );
  }


  downloadBiography() {
    this.retrieveDataService.getBiography(this.employee).subscribe(
      file => saveAs(file, this.employee.firstName + '_' + this.employee.lastName + '_Bio.docx')
    );
  }

  downloadDiplomas() {
    this.retrieveDataService.getDiplomas(this.employee).subscribe(
      file => saveAs(file, this.employee.firstName + '_' + this.employee.lastName + '_Diplomes.docx')
    );
  }

  downloadResume() {
    this.retrieveDataService.getResume(this.employee).subscribe(
      file => saveAs(file, this.employee.firstName + '_' + this.employee.lastName + '_CV.docx')
    );
  }
}
