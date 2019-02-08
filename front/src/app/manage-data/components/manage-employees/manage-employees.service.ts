import { Injectable } from '@angular/core';
import { Person } from 'src/app/data-classes';
import { ApiRestService } from 'src/app/api-rest.service';
import { Observable, Subject, of } from 'rxjs';

const ADD_EMPLOYEE_REQUEST = '/person';
const EDIT_EMPLOYEE_REQUEST = '/person';
const DELETE_EMPLOYEE_REQUEST = '/person';

const SEND_RESUME_REQUEST = '/person/cv';
const SEND_BIOGRAPHY_REQUEST = '/person/bio';
const SEND_DIPLOMAS_REQUEST = '/person/diplomas';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeesService {

  selectedPeopleToManage: Person[];

  private refreshSearchPeopleSource = new Subject<any>();
  refreshSearchPeopleMethod = this.refreshSearchPeopleSource.asObservable();

  private refreshManageEmployeesSource = new Subject<any>();
  refreshManageEmployeesMethod = this.refreshManageEmployeesSource.asObservable();

  constructor(
    private apiRestService: ApiRestService
  ) {
    this.selectedPeopleToManage = new Array<Person>();
  }

  addEmployee(employee: Person): Observable<boolean> {
    return this.apiRestService.post<boolean>(ADD_EMPLOYEE_REQUEST, employee);
  }

  editEmployee(employee: Person): Observable<boolean> {
    return this.apiRestService.put<boolean>(EDIT_EMPLOYEE_REQUEST, employee);
  }

  addPersonToManage(person: Person): void {
    if (this.selectedPeopleToManage.indexOf(person) === -1) {
      this.selectedPeopleToManage.push(person);
    }
  }

  deleteEmployee(employee: Person): Observable<boolean> {
    return this.apiRestService.delete<boolean>(DELETE_EMPLOYEE_REQUEST + '/'
      + '?idNumber=' + employee.idNumber + '&nationality=' + employee.nationality);
  }

  getSelectedPeopleToManage(): Observable<Person[]> {
    return of(this.selectedPeopleToManage);
  }

  refreshManageEmployees(): void {
    this.refreshManageEmployeesSource.next();
  }

  refreshSearchPeople(): void {
    this.refreshSearchPeopleSource.next();
  }

  removePersonToManage(person: Person): void {
    this.selectedPeopleToManage = this.selectedPeopleToManage.filter(
      p => (p.nationality !== person.nationality && p.idNumber !== person.idNumber)
    );
  }

  resetSelectedPeopleToManage(): void {
    this.selectedPeopleToManage = new Array<Person>();
  }

  sendResume(person: Person, resume: File): Observable<boolean> {
    const form = new FormData();
    form.append('idNumber', person.idNumber);
    form.append('nationality', person.nationality);
    return this.apiRestService.postFile<boolean>(
      SEND_RESUME_REQUEST,
      resume,
      form
    );
  }

  sendBiography(person: Person, biography: File): Observable<boolean> {
    const form = new FormData();
    form.append('idNumber', person.idNumber);
    form.append('nationality', person.nationality);
    return this.apiRestService.postFile<boolean>(
      SEND_BIOGRAPHY_REQUEST,
      biography,
      form
    );
  }

  sendDiplomas(person: Person, diplomas: File): Observable<boolean> {
    const form = new FormData();
    form.append('idNumber', person.idNumber);
    form.append('nationality', person.nationality);
    return this.apiRestService.postFile<boolean>(
      SEND_DIPLOMAS_REQUEST,
      diplomas,
      form
    );
  }
}
