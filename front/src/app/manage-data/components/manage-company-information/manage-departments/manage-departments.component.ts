import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../data-classes/department';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.scss']
})
export class ManageDepartmentsComponent implements OnInit {
  public newDepartment: Department;
  public departments: Department[];

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.departments = new Array<Department>();
    this.newDepartment = new Department('');
   }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.retrieveDataService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  addDepartment() {
    this.manageDataService.addDepartment(this.newDepartment)
      .subscribe(result => {
        this.getDepartments();
        this.newDepartment = new Department('');
      });
  }

  deleteDepartment(department: Department) {
    this.manageDataService.deleteDepartment(department)
      .subscribe(result => this.getDepartments());
  }
}
