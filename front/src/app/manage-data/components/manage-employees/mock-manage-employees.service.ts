import { Injectable } from '@angular/core';
import { ManageEmployeesService } from './manage-employees.service';
import { Person } from 'src/app/data-classes';
import { Observable, Subject, of } from 'rxjs';
import { RetrieveMockDataService } from 'src/app/retrieve-data/retrieve-mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class MockManageEmployeesService {

  selectedPeopleToManage: Person[];

  private refreshSearchPeopleSource = new Subject<any>();
  refreshSearchPeopleMethod = this.refreshSearchPeopleSource.asObservable();

  private refreshManageEmployeesSource = new Subject<any>();
  refreshManageEmployeesMethod = this.refreshManageEmployeesSource.asObservable();

  constructor(
    private retrieveDataService: RetrieveMockDataService
  ) {
    this.selectedPeopleToManage = new Array<Person>();
  }

  addEmployee(employee: Person): Observable<boolean> {
    return this.retrieveDataService.addPerson(employee);
  }

  deleteEmployee(employee: Person): Observable<boolean> {
    return this.retrieveDataService.deletePerson(employee);
  }

  refreshSearchPeople(): void {
    this.refreshSearchPeopleSource.next();
  }

  addPersonToManage(person: Person): void {
    if (this.selectedPeopleToManage.indexOf(person) === -1) {
      this.selectedPeopleToManage.push(person);
    }
  }

  removePersonToManage(person: Person): void {
    this.selectedPeopleToManage = this.selectedPeopleToManage.filter(
      p => (p.nationality !== person.nationality && p.idNumber !== person.idNumber)
    );
  }

  getSelectedPeopleToManage(): Observable<Person[]> {
    return of(this.selectedPeopleToManage);
  }

  refreshManageEmployees(): void {
    this.refreshManageEmployeesSource.next();
  }

  sendResume(person: Person, resume: File): Observable<boolean> {
    return of(true);
  }

  sendBiography(person: Person, biography: File): Observable<boolean> {
    return of(true);
  }
}
