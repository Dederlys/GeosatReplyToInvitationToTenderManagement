import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/data-classes';
import { PopupService } from 'src/app/popup/popup.service';
import { Router } from '@angular/router';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageEquipmentsService } from '../manage-equipments.service';

@Component({
  selector: 'app-manage-equipments',
  templateUrl: './manage-equipments.component.html',
  styleUrls: ['./manage-equipments.component.scss']
})
export class ManageEquipmentsComponent implements OnInit {

  public componentName: string;
  public equipments: Equipment[];
  public equipmentsToManage: Equipment[];

  constructor(
    private manageEquipmentsService: ManageEquipmentsService,
    private retrieveDataService: RetrieveDataService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.componentName = 'manage-equipments';
    this.equipments = new Array<Equipment>();
    this.equipmentsToManage = new Array<Equipment>();

    this.manageEquipmentsService.refreshManageEquipmentsMethod.subscribe(
      () => this.refresh()
    );
  }

  ngOnInit() {
    this.manageEquipmentsService.resetSelectedEquipmentsToManage();
    this.refresh();
  }

  getEquipments() {
    this.retrieveDataService.getEquipments()
      .subscribe(equipments => this.equipments = equipments);
  }

  getSelectedEquipments(): void {
    this.manageEquipmentsService.getSelectedEquipmentsToManage().subscribe(
      selectedEquipment => this.equipmentsToManage = selectedEquipment);
  }

  onSelectRemove(equipment: Equipment): void {
    this.manageEquipmentsService.removeEquipmentToManage(equipment);
    this.getSelectedEquipments();
  }

  showDetail(equipment: Equipment): void {
    this.popupService.callShowEquipment(equipment);
  }

  newEquipment(): void {
    this.router.navigate(['/', 'manage-data', 'add-equipment']);
  }

  editEquipment(): void {
    this.router.navigate(['/', 'manage-data', 'edit-equipment']);
  }

  deleteEquipments(): void {
    this.popupService.callShowEquipmentsToDelete(this.equipmentsToManage);
  }

  public refresh(): void {
    this.getEquipments();
    this.getSelectedEquipments();
  }
}
