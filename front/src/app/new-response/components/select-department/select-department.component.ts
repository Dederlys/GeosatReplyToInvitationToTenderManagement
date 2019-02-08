import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/data-classes/department';
import { SelectedDataService } from '../selected-data.service';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss']
})
export class SelectDepartmentComponent implements OnInit {

  departments: Department[];
  selectedDepartment: Department;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private selectedDataService: SelectedDataService
    ) { }

  ngOnInit() {
    this.getAllServices();
    this.getSelectedDepartment();
  }

  getAllServices(): void {
    this.retrieveDataService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  getSelectedDepartment(): void {
    this.selectedDataService.getSelectedDepartment().subscribe(selectedDepartment => this.selectedDepartment = selectedDepartment);
  }

  onSelect(department: Department): void {
    this.selectedDataService.changeSelectedDepartment(department);
    this.getSelectedDepartment();
  }
}
