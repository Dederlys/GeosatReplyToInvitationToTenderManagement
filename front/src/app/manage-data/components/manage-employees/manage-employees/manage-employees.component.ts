import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { Person } from 'src/app/data-classes/person';
import { SelectedDataService } from 'src/app/new-response/components/selected-data.service';
import { PopupService } from 'src/app/popup/popup.service';
import { Router } from '@angular/router';
import { ManageEmployeesService } from '../manage-employees.service';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  public componentName: string;
  public employees: Person[];
  public employeesToManage: Person[];

  constructor(
    private manageEmployeesService: ManageEmployeesService,
    private retrieveDataService: RetrieveDataService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.componentName = 'manage-employees';
    this.employees = new Array<Person>();
    this.employeesToManage = new Array<Person>();

    this.manageEmployeesService.refreshManageEmployeesMethod.subscribe(
      () => this.refresh()
    );
  }

  ngOnInit() {
    this.manageEmployeesService.resetSelectedPeopleToManage();
    this.refresh();
  }

  getEmployees() {
    this.retrieveDataService.getPeople()
      .subscribe(people => this.employees = people);
  }

  getSelectedPeople(): void {
    this.manageEmployeesService.getSelectedPeopleToManage().subscribe(
      selectedPeople => this.employeesToManage = selectedPeople);
  }

  onSelectRemove(person: Person): void {
    this.manageEmployeesService.removePersonToManage(person);
    this.getSelectedPeople();
  }

  showDetail(person: Person): void {
    this.popupService.callShowPerson(person);
  }

  newEmployee(): void {
    this.router.navigate(['/', 'manage-data', 'add-employee']);
  }

  editEmployee(): void {
    this.router.navigate(['/', 'manage-data', 'edit-employee']);
  }

  deleteEmployees(): void {
    this.popupService.callShowPeopleToDelete(this.employeesToManage);
  }

  public refresh(): void {
    this.getEmployees();
    this.getSelectedPeople();
  }
}
