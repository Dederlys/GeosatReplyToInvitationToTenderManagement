import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/data-classes';
import { PopupService } from '../popup.service';
import { ManageEmployeesService } from 'src/app/manage-data/components/manage-employees/manage-employees.service';
import { Observable, of } from 'rxjs';
import { SelectedDataService } from 'src/app/new-response/components/selected-data.service';

@Component({
  selector: 'app-popup-delete-people',
  templateUrl: './popup-delete-people.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupDeletePeopleComponent implements OnInit {

  isShownDetail = false;
  employeesToDelete: Person[];

  constructor(
    private popupService: PopupService,
    private manageEmployeesService: ManageEmployeesService
  ) {
    this.employeesToDelete = new Array<Person>();
    this.popupService.showPeopleToDeleteMethod.subscribe(
      () => this.showPopup()
    );
  }

  ngOnInit() { }

  showPopup(): void {
    this.employeesToDelete = this.popupService.getShowPeopleToDelete();
    if (this.employeesToDelete.length > 0) {
      this.isShownDetail = true;
    }
  }

  deleteEmployees(): void {
    for (const person of this.employeesToDelete) {
      this.manageEmployeesService.deleteEmployee(person).subscribe(
        () => {
          this.manageEmployeesService.refreshManageEmployees();
          this.manageEmployeesService.refreshSearchPeople();
        }
      );
      this.manageEmployeesService.removePersonToManage(person);
    }

    this.manageEmployeesService.refreshManageEmployees();
    this.manageEmployeesService.refreshSearchPeople();

    this.isShownDetail = false;
    this.employeesToDelete = new Array<Person>();
  }

  closeDetail(): void {
    this.isShownDetail = false;
    this.employeesToDelete = new Array<Person>();
  }
}
