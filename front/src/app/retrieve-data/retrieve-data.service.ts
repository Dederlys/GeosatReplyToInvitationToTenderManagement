import { Injectable } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Observable } from 'rxjs';

import {
  Authorization,
  ContractType,
  Department,
  Equipment,
  IdentityPapersType,
  Location,
  Person
 } from '../data-classes';

 const GET_AUTHORIZATIONS_REQUEST = '/habilitations';
 const GET_CONTRACT_TYPES = '/contracts';
 const GET_DEPARTMENTS_REQUEST = '/poles';
 const GET_EQUIPMENTS_REQUEST = '/equipment';
 const GET_IDENTITY_PAPERS_TYPES = '/titles';
 const GET_LOCATIONS_REQUEST = '/sites';
 const GET_PEOPLE_REQUEST = '/person';
 const GET_PRESENTATION_FILE_EXIST_REQUEST = '/presentation/exists';
 const GET_PRESENTATION_FILE_REQUEST = '/presentation';

 const GET_BIOGRAPHY_REQUEST = '/person/bio';
 const GET_DIPLOMAS_REQUEST = '/person/diplomas';
 const GET_RESUME_REQUEST = '/person/cv';

 const GET_CONSTRUCTOR_FILE_REQUEST = '/equipment/documentation';
 const GET_INFO_FILE_REQUEST = '/equipment/equipment';
@Injectable({
  providedIn: 'root'
})

export class RetrieveDataService {
  constructor(
    private apiRestService: ApiRestService
  ) { }

  getAuthorizations(): Observable<Authorization[]> {
    return this.apiRestService.get<Authorization[]>(GET_AUTHORIZATIONS_REQUEST,
      (result) => {
        const auth = result as string[];
        const authorizations = new Array<Authorization>();
        auth.forEach(element => {
          authorizations.push(new Authorization(element, null));
        });
        return authorizations;
      });
  }

  getContractTypes(): Observable<ContractType[]> {
    return this.apiRestService.get<ContractType[]>(GET_CONTRACT_TYPES,
      (result) => {
        const cont = result as string[];
        const contractTypes = Array<ContractType>();
        cont.forEach(element => {
          contractTypes.push(new ContractType(element));
        });
        return contractTypes;
      });
  }

  getDepartments(): Observable<Department[]> {
    return this.apiRestService.get<Department[]>(GET_DEPARTMENTS_REQUEST,
      (result) => {
        const dep = result as string[];
        const departments = Array<Department>();
        dep.forEach(element => {
          departments.push(new Department(element));
        });
        return departments;
      });
  }

  getEquipments(): Observable<Equipment[]> {
    return this.apiRestService.get<Equipment[]>(GET_EQUIPMENTS_REQUEST);
  }

  getIdentityPapersTypes(): Observable<IdentityPapersType[]> {
    return this.apiRestService.get<IdentityPapersType[]>(
      GET_IDENTITY_PAPERS_TYPES,
      (result) => {
        const id = result as string[];
        const identityPapersTypes = new Array<IdentityPapersType>();
        id.forEach(element => {
          identityPapersTypes.push(new IdentityPapersType(element));
        });
        return identityPapersTypes;
      });
  }

  getLocations(): Observable<Location[]> {
    return this.apiRestService.get<Location[]>(
      GET_LOCATIONS_REQUEST,
      (result) => {
        const loc = result as string[];
        const locations = new Array<Location>();
        loc.forEach(element => {
          locations.push(new Location(element));
        });
        return locations;
      });
  }

  getPeople(): Observable<Person[]> {
    return this.apiRestService.get<Person[]>(
      GET_PEOPLE_REQUEST);
  }

  getPresentationFile(): Observable<Blob> {
    return this.apiRestService.getBlob(GET_PRESENTATION_FILE_REQUEST);
  }

  presentationFileExists(): Observable<boolean> {
    return this.apiRestService.get<boolean>(GET_PRESENTATION_FILE_EXIST_REQUEST);
  }

  searchPeople(term: string): Observable<Person[]> {
    return null;
  }


  getBiography(person: Person): Observable<Blob> {
    return this.apiRestService.getBlob(GET_BIOGRAPHY_REQUEST + '?idNumber=' + person.idNumber
    + '&nationality=' + person.nationality);
  }

  getDiplomas(person: Person): Observable<Blob> {
    return this.apiRestService.getBlob(GET_DIPLOMAS_REQUEST + '?idNumber=' + person.idNumber
    + '&nationality=' + person.nationality);
  }

  getResume(person: Person): Observable<Blob> {
    return this.apiRestService.getBlob(GET_RESUME_REQUEST + '?idNumber=' + person.idNumber
    + '&nationality=' + person.nationality);
  }


  getConstructorFile(equipment: Equipment): Observable<Blob> {
    return this.apiRestService.getBlob(GET_CONSTRUCTOR_FILE_REQUEST + '?name=' + equipment.name);
  }

  getInfoFile(equipment: Equipment): Observable<Blob> {
    return this.apiRestService.getBlob(GET_INFO_FILE_REQUEST + '?name=' + equipment.name);
  }
}
