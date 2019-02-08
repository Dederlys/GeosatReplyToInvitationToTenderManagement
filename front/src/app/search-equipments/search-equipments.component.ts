import { Component, OnInit, Input } from '@angular/core';
import { Equipment } from '../data-classes/equipment';
import { SelectedDataService } from '../new-response/components/selected-data.service';
import { PopupService } from '../popup/popup.service';
import { RetrieveDataService } from '../retrieve-data/retrieve-data.service';
import { ManageEquipmentsService } from '../manage-data/components/manage-equipments/manage-equipments.service';
const CALLED_FROM_SELECT_EQUIPMENT = 'select-equipments';
const CALLED_FROM_MANAGE_EQUIPMENT = 'manage-equipments';

@Component({
  selector: 'app-search-equipments',
  templateUrl: './search-equipments.component.html',
  styleUrls: ['./search-equipments.component.scss']
})
export class SearchEquipmentsComponent implements OnInit {
  private allEquipments: Equipment[];
  public equipments: Equipment[];
  public selectedEquipments: Equipment[];
  @Input() calledFrom: string;

  constructor(
    private manageEquipmentsService: ManageEquipmentsService,
    private selectedDataService: SelectedDataService,
    private retrieveDataService: RetrieveDataService,
    private popupService: PopupService
  ) {
    this.allEquipments = new Array<Equipment>();
    this.equipments = new Array<Equipment>();

    this.manageEquipmentsService.refreshSearchEquipmentsMethod.subscribe(
      () => this.refresh()
    );
  }

  ngOnInit() {
    this.getEquipments();
  }

  getEquipments(): void {
    this.retrieveDataService.getEquipments().subscribe(
      equipments => {
        this.equipments = equipments;
        this.allEquipments = equipments;
      }
    );
  }

  search(term: string): void {
    if (!term.trim()) {
      // if no search term, return all
      this.equipments = this.allEquipments;
      return;
    }

    const matchingEquipments = new Array<Equipment>();
    const myRegexp = '((\w?)*(\s?)(\w?)*)*' + term.toLowerCase() + '((\w?)*(\s?)(\w?)*)*';
    let name: string;

    for (const equipment of this.allEquipments) {
      name = '';
      name = equipment.name.toLowerCase();
      if (name.search(myRegexp) !== -1) {
        matchingEquipments.push(equipment);
      }
    }

    this.equipments = matchingEquipments;
  }

  onSelect(equipment: Equipment): void {
    if (this.calledFrom === CALLED_FROM_SELECT_EQUIPMENT) {
      this.selectedDataService.addEquipment(equipment);
    }
    if (this.calledFrom === CALLED_FROM_MANAGE_EQUIPMENT) {
      this.manageEquipmentsService.addEquipmentToManage(equipment);
    }
  }

  showDetail(equipment: Equipment): void {
    this.popupService.callShowEquipment(equipment);
  }

  refresh(): void {
    this.getEquipments();
  }
}
