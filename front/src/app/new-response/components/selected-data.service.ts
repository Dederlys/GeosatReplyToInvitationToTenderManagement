import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../data-classes/person';
import { Equipment } from '../../data-classes/equipment';
import { Department } from 'src/app/data-classes/department';

@Injectable({
  providedIn: 'root'
})
export class SelectedDataService {

  selectedDepartment: Department;
  selectedPeople: Person[];
  selectedEquipments: Equipment[];

  constructor() {
    this.selectedPeople = new Array<Person>();
    this.selectedEquipments = new Array<Equipment>();
  }

  // Select department
  changeSelectedDepartment(department: Department): void {
    this.selectedDepartment = department;
  }

  getSelectedDepartment(): Observable<Department> {
    return of(this.selectedDepartment);
  }

  // Select people
  addPerson(person: Person): void {
    if (this.selectedPeople.indexOf(person) === -1) {
      this.selectedPeople.push(person);
    }
  }

  removePerson(person: Person): void {
    this.selectedPeople = this.selectedPeople.filter(
      p => (p.idNumber !== person.idNumber && p.nationality !== person.nationality)
    );
  }

  getSelectedPeople(): Observable<Person[]> {
    return of(this.selectedPeople);
  }

  // Select means
  addEquipment(equipment: Equipment): void {
    if (this.selectedEquipments.indexOf(equipment) === -1) {
      this.selectedEquipments.push(equipment);
    }
  }

  removeEquipment(equipment: Equipment): void {
    this.selectedEquipments = this.selectedEquipments.filter(
      e => (e.name !== equipment.name)
    );
  }

  getSelectedEquipments(): Observable<Equipment[]> {
    return of(this.selectedEquipments);
  }
}
