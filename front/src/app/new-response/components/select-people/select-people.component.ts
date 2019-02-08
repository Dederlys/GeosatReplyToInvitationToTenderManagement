import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedDataService } from '../selected-data.service';
import { Department } from 'src/app/data-classes/department';
import { Person } from 'src/app/data-classes/person';
import { PopupService } from 'src/app/popup/popup.service';

@Component({
  selector: 'app-select-people',
  templateUrl: './select-people.component.html',
  styleUrls: ['./select-people.component.scss']
})
export class SelectPeopleComponent implements OnInit {

  private selectedDepartment: Department;
  public selectedPeople: Person[];
  public componentName: string;

  constructor(
    private selectedDataService: SelectedDataService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.componentName = 'select-people';
  }

  ngOnInit() {
    this.getSelectedDepartment();

    if (this.selectedDepartment == null) {
      this.router.navigate(['/', 'new-response', 'select-department']);
    }

    this.getSelectedPeople();
  }

  getSelectedDepartment(): void {
    this.selectedDataService.getSelectedDepartment().subscribe(selectedDepartment => this.selectedDepartment = selectedDepartment);
  }

  getSelectedPeople(): void {
    this.selectedDataService.getSelectedPeople().subscribe(selectedPeople => this.selectedPeople = selectedPeople);
  }

  onSelectRemove(person: Person): void {
    this.selectedDataService.removePerson(person);
    this.getSelectedPeople();
  }

  showDetail(person: Person): void {
    this.popupService.callShowPerson(person);
  }
}
