import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Person } from 'src/app/data-classes/person';
import { Equipment } from 'src/app/data-classes/equipment';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  // Observable string sources
  private showPersonSource = new Subject<any>();
  private showEquipmentSource = new Subject<any>();
  private showPeopleToDeleteSource = new Subject<any>();
  private showEquipmentsToDeleteSource = new Subject<any>();
  // Observable string streams
  showPersonMethod = this.showPersonSource.asObservable();
  showEquipmentMethod = this.showEquipmentSource.asObservable();
  showPeopleToDeleteMethod = this.showPeopleToDeleteSource.asObservable();
  showEquipmentsToDeleteMethod = this.showEquipmentsToDeleteSource.asObservable();

  private person: Person;
  private equipment: Equipment;
  private peopleToDelete: Person[];
  private equipmentsToDelete: Equipment[];

  constructor() { }

  // Popup person
  callShowPerson(person: Person) {
    this.person = person;
    this.showPersonSource.next();
  }

  getShowPerson(): Person {
    return this.person;
  }

  // Popup equipment
  callShowEquipment(equipment: Equipment) {
    this.equipment = equipment;
    this.showEquipmentSource.next();
  }

  getShowEquipment(): Equipment {
    return this.equipment;
  }

  // Popup delete people
  callShowPeopleToDelete(people: Person[]): void {
    this.peopleToDelete = people;
    this.showPeopleToDeleteSource.next();
  }

  getShowPeopleToDelete(): Person[] {
    return this.peopleToDelete;
  }

  // Popup delete equipments
  callShowEquipmentsToDelete(equipments: Equipment[]) {
    this.equipmentsToDelete = equipments;
    this.showEquipmentsToDeleteSource.next();
  }

  getShowEquipmentsToDelete(): Equipment[] {
    return this.equipmentsToDelete;
  }
}
