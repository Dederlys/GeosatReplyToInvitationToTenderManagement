import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';
import { Equipment } from 'src/app/data-classes';
import { SelectedDataService } from 'src/app/new-response/components/selected-data.service';
import { MockManageEquipmentsService } from 'src/app/manage-data/components/manage-equipments/mock-manage-equipments.service';
import { ManageEquipmentsService } from 'src/app/manage-data/components/manage-equipments/manage-equipments.service';

@Component({
  selector: 'app-popup-delete-equipments',
  templateUrl: './popup-delete-equipments.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupDeleteEquipmentsComponent implements OnInit {

  isShownDetail = false;
  equipmentsToDelete: Equipment[];

  constructor(
    private popupService: PopupService,
    private manageEquipmentsService: ManageEquipmentsService,
    private selectedDataService: SelectedDataService
  ) {
    this.equipmentsToDelete = new Array<Equipment>();
    this.popupService.showEquipmentsToDeleteMethod.subscribe(
      () => this.showPopup()
    );
  }

  ngOnInit() { }

  showPopup(): void {
    this.equipmentsToDelete = this.popupService.getShowEquipmentsToDelete();
    if (this.equipmentsToDelete.length > 0) {
      this.isShownDetail = true;
    }
  }

  deleteEquipments(): void {
    for (const equipment of this.equipmentsToDelete) {
      this.manageEquipmentsService.deleteEquipment(equipment).subscribe();
      this.manageEquipmentsService.removeEquipmentToManage(equipment);
    }

    this.manageEquipmentsService.refreshManageEquipments();
    this.manageEquipmentsService.refreshSearchEquipments();

    this.isShownDetail = false;
    this.equipmentsToDelete = new Array<Equipment>();
  }

  closeDetail(): void {
    this.isShownDetail = false;
    this.equipmentsToDelete = new Array<Equipment>();
  }
}
