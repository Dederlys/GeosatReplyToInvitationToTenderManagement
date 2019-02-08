import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Authorization,
  ContractType,
  Department,
  IdentityPapersType,
  Location,
} from '../data-classes';
import { RetrieveMockDataService } from "../retrieve-data/retrieve-mock-data.service"

@Injectable({
  providedIn: 'root'
})
export class MockManageDataService {
  constructor(
    private retrieveMockDataService: RetrieveMockDataService
  ) { }

  // Add

  addAuthorization(authorization: Authorization): Observable<boolean> {
    return this.retrieveMockDataService.addAuthorization(authorization);
  }

  addContractType(contractType: ContractType): Observable<boolean> {
    return this.retrieveMockDataService.addContractType(contractType);
  }

  addDepartment(department: Department): Observable<boolean> {
    return this.retrieveMockDataService.addDepartment(department);
  }

  addIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    return this.retrieveMockDataService.addIdentityPapersType(identityPapersType);
  }

  addLocation(location: Location): Observable<boolean> {
    return this.retrieveMockDataService.addLocation(location);
  }

  // Delete

  deleteAuthorization(authorization: Authorization): Observable<boolean> {
    return this.retrieveMockDataService.deleteAuthorization(authorization);
  }

  deleteContractType(contractType: ContractType): Observable<boolean> {
    return this.retrieveMockDataService.deleteContractTypes(contractType);
  }

  deleteDepartment(department: Department): Observable<boolean> {
    return this.retrieveMockDataService.deleteDepartment(department);
  }

  deleteIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    return this.retrieveMockDataService.deleteIdentityPapersType(identityPapersType);
  }

  deleteLocation(location: Location): Observable<boolean> {
    return this.retrieveMockDataService.deleteLocation(location);
  }

  // Other

  presentationFileExists() {
    return of(true);
  }

  sendNewPresentation(file: Blob) {
    return this.retrieveMockDataService.updatePresentationFile(file);
  }
}
