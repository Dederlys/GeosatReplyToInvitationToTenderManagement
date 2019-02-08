import { Injectable } from '@angular/core';

import { Equipment } from '../../../data-classes';
import { Subject, Observable, of } from 'rxjs';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ApiRestService } from 'src/app/api-rest.service';

const ADD_EQUIPMENT_REQUEST = '/equipment';
const EDIT_EQUIPMENT_REQUEST = '/equipment';
const DELETE_EQUIPMENT_REQUEST = '/equipment';
const SEND_CONSTRUCTOR_FILE_REQUEST = ADD_EQUIPMENT_REQUEST + '/documentation';
const SEND_EQUIPMENT_INFORMATION_FILE_REQUEST = ADD_EQUIPMENT_REQUEST + '/equipment';

@Injectable({
  providedIn: 'root'
})

export class ManageEquipmentsService {

  selectedEquipmentsToManage: Equipment[];

  private refreshSearchEquipmentsSource = new Subject<any>();
  refreshSearchEquipmentsMethod = this.refreshSearchEquipmentsSource.asObservable();

  private refreshManageEquipmentsSource = new Subject<any>();
  refreshManageEquipmentsMethod = this.refreshManageEquipmentsSource.asObservable();

  constructor(
    private apiRestService: ApiRestService
  ) {
    this.selectedEquipmentsToManage = new Array<Equipment>();
  }

  addEquipment(equipment: Equipment): Observable<boolean> {
    return this.apiRestService.post<boolean>(ADD_EQUIPMENT_REQUEST, equipment);
  }

  addEquipmentToManage(equipment: Equipment): void {
    if (this.selectedEquipmentsToManage.indexOf(equipment) === -1) {
      this.selectedEquipmentsToManage.push(equipment);
    }
  }

  deleteEquipment(equipment: Equipment): Observable<boolean> {
    return this.apiRestService.delete<boolean>(DELETE_EQUIPMENT_REQUEST +
      '/?name=' + equipment.name);
  }

  editEquipment(equipment: Equipment): Observable<boolean> {
    return this.apiRestService.put<boolean>(EDIT_EQUIPMENT_REQUEST, equipment);
  }

  getSelectedEquipmentsToManage(): Observable<Equipment[]> {
    return of(this.selectedEquipmentsToManage);
  }

  refreshManageEquipments(): void {
    this.refreshManageEquipmentsSource.next();
  }

  refreshSearchEquipments(): void {
    this.refreshSearchEquipmentsSource.next();
  }

  removeEquipmentToManage(equipment: Equipment): void {
    this.selectedEquipmentsToManage = this.selectedEquipmentsToManage.filter(
      eq => (eq.name !== equipment.name)
    );
  }

  resetSelectedEquipmentsToManage(): void {
    this.selectedEquipmentsToManage = new Array<Equipment>();
  }

  sendConstructorFile(equipment: Equipment, constructorFile: File): Observable<boolean> {
    const form = new FormData();
    form.append('name', equipment.name);
    return this.apiRestService.postFile<boolean>(
      SEND_CONSTRUCTOR_FILE_REQUEST,
      constructorFile,
      form);
  }

  sendEquipmentInformationFile(equipment: Equipment, informationFile: File): Observable<boolean> {
    const form = new FormData();
    form.append('name', equipment.name);
    return this.apiRestService.postFile<boolean>(
      SEND_EQUIPMENT_INFORMATION_FILE_REQUEST,
      informationFile,
      form);
  }
}
