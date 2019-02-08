import { Injectable } from '@angular/core';
import {
  Authorization,
  ContractType,
  Department,
  IdentityPapersType,
  Location
 } from '../data-classes';
import { Observable } from 'rxjs';
import { ApiRestService } from '../api-rest.service';

const ADD_AUTHORIZATION_REQUEST = '/habilitations';
const ADD_AUTHORIZATION_FILE_REQUEST = ADD_AUTHORIZATION_REQUEST + '/file';
const ADD_CONTRACT_TYPE_REQUEST = '/contracts';
const ADD_DEPARTMENT_REQUEST = '/poles';
const ADD_IDENTITY_PAPERS_TYPE_REQUEST = '/titles';
const ADD_LOCATION_REQUEST = '/sites';

const DELETE_AUTHORIZATION_REQUEST = '/habilitations';
const DELETE_CONTRACT_TYPE_REQUEST = '/contracts';
const DELETE_DEPARTMENT_REQUEST = '/poles';
const DELETE_IDENTITY_PAPERS_TYPE_REQUEST = '/titles';
const DELETE_LOCATION_REQUEST = '/sites';

const UPDATE_PRESENTATION_FILE_REQUEST = '/presentation';
@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor(
    private apiRestService: ApiRestService
  ) { }

  // Add

  addAuthorization(authorization: Authorization): Observable<boolean> {
    return this.apiRestService.postString(ADD_AUTHORIZATION_REQUEST, authorization.name);
  }

  addAuthorizationFile(authorization: Authorization): any {
    const form = new FormData();
    form.append('name', authorization.name);
    return this.apiRestService.postFile(ADD_AUTHORIZATION_FILE_REQUEST, authorization.file, form);
  }

  addContractType(contractType: ContractType): Observable<boolean> {
    return this.apiRestService.postString(ADD_CONTRACT_TYPE_REQUEST, contractType.name);
  }

  addDepartment(department: Department): Observable<boolean> {
    return this.apiRestService.postString(ADD_DEPARTMENT_REQUEST, department.name);
  }

  addIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    return this.apiRestService.postString(ADD_IDENTITY_PAPERS_TYPE_REQUEST, identityPapersType.name);
  }

  addLocation(location: Location): Observable<boolean> {
    return this.apiRestService.postString(ADD_LOCATION_REQUEST, location.name);
  }

  // Delete

  deleteAuthorization(authorization: Authorization): Observable<boolean> {
    return this.apiRestService.delete(DELETE_AUTHORIZATION_REQUEST
      + '/' + authorization.name);
  }

  deleteContractType(contractType: ContractType): Observable<boolean> {
    return this.apiRestService.delete(DELETE_CONTRACT_TYPE_REQUEST
      + '/' + contractType.name);
  }

  deleteDepartment(department: Department): Observable<boolean> {
    return this.apiRestService.delete(DELETE_DEPARTMENT_REQUEST
      + '/' + department.name);
  }

  deleteIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    return this.apiRestService.delete(DELETE_IDENTITY_PAPERS_TYPE_REQUEST
      + '/' + identityPapersType.name);
  }

  deleteLocation(location: Location): Observable<boolean> {
    return this.apiRestService.delete(DELETE_LOCATION_REQUEST
      + '/' + location.name);
  }

  //

  sendNewPresentation(file: Blob) {
    return this.apiRestService.postFile(UPDATE_PRESENTATION_FILE_REQUEST, file);
  }
}
