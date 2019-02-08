import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedDataService } from '../selected-data.service';
import { Equipment } from 'src/app/data-classes/equipment';
import { Department } from 'src/app/data-classes/department';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { PopupService } from 'src/app/popup/popup.service';

@Component({
  selector: 'app-select-equipments',
  templateUrl: './select-equipments.component.html',
  styleUrls: ['./select-equipments.component.scss']
})
export class SelectEquipmentsComponent implements OnInit {

  private selectedDepartment: Department;
  private equipments: Equipment[];
  public selectedEquipments: Equipment[];
  public componentName: string;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private selectedDataService: SelectedDataService,
    private router: Router,
    private popupService: PopupService
  ) {
    this.componentName = 'select-equipments';
  }

  ngOnInit() {
    this.getSelectedDepartment();

    if (this.selectedDepartment == null) {
      this.router.navigate(['/', 'new-response', 'select-department']);
    }

    this.getSelectedEquipments();
  }

  getSelectedDepartment(): void {
    this.selectedDataService.getSelectedDepartment().subscribe(selectedDepartment => this.selectedDepartment = selectedDepartment);
  }

  getAllEquipments(): void {
    this.retrieveDataService.getEquipments().subscribe(equipments => this.equipments = equipments);
  }

  getSelectedEquipments(): void {
    this.selectedDataService.getSelectedEquipments().subscribe(selectedEquipments => this.selectedEquipments = selectedEquipments);
  }

  onSelect(equipment: Equipment): void {
    this.selectedDataService.addEquipment(equipment);
    this.getSelectedEquipments();
  }

  onSelectRemove(equipment: Equipment): void {
    this.selectedDataService.removeEquipment(equipment);
    this.getSelectedEquipments();
  }

  showDetail(equipment: Equipment): void {
    this.popupService.callShowEquipment(equipment);
  }
}
