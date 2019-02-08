import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { RetrieveMockDataService } from 'src/app/retrieve-data/retrieve-mock-data.service';
import { Equipment } from 'src/app/data-classes';

@Injectable({
  providedIn: 'root'
})
export class MockManageEquipmentsService {

  selectedEquipmentsToManage: Equipment[];

  private refreshSearchEquipmentsSource = new Subject<any>();
  refreshSearchEquipmentsMethod = this.refreshSearchEquipmentsSource.asObservable();

  private refreshManageEquipmentsSource = new Subject<any>();
  refreshManageEquipmentsMethod = this.refreshManageEquipmentsSource.asObservable();

  constructor(
    private retrieveDataService: RetrieveMockDataService
  ) {
    this.selectedEquipmentsToManage = new Array<Equipment>();
  }

  addEquipment(equipment: Equipment): Observable<boolean> {
    return this.retrieveDataService.addEquipment(equipment);
  }

  deleteEquipment(equipment: Equipment): Observable<boolean> {
    return this.retrieveDataService.deleteEquipment(equipment);
  }

  refreshSearchEquipments(): void {
    this.refreshSearchEquipmentsSource.next();
  }

  addEquipmentToManage(equipment: Equipment): void {
    if (this.selectedEquipmentsToManage.indexOf(equipment) === -1) {
      this.selectedEquipmentsToManage.push(equipment);
    }
  }

  removeEquipmentToManage(equipment: Equipment): void {
    this.selectedEquipmentsToManage = this.selectedEquipmentsToManage.filter(
      eq => (eq.name !== equipment.name)
    );
  }

  getSelectedEquipmentsToManage(): Observable<Equipment[]> {
    return of(this.selectedEquipmentsToManage);
  }

  refreshManageEquipments(): void {
    this.refreshManageEquipmentsSource.next();
  }

  sendConstructorFile(equipment: Equipment, constructorFile: File): Observable<boolean> {
    return of(true);
  }
}
