import { Injectable } from '@angular/core';
import {
  Authorization,
  ContractType,
  Department,
  Equipment,
  IdentityPapersType,
  Location,
  Person
} from '../data-classes';
import { Observable, of } from 'rxjs';

const DEPARTMENTS: Department[] = [
  { name: 'Comptabilité' },
  { name: 'Direction' },
  { name: 'Architecture' },
  { name: 'Ressources Humaines' },
  { name: 'Relations Internationales' }
];

const PEOPLE: Person[] = [
  {
    firstName: 'Jean',
    lastName: 'Bon',
    department: 'Comptabilité',
    arrivalDate: '1999-02-12',
    nationality: 'France',
    contractType: 'CDD',
    position: 'Cuisinier',
    affiliateOffice: 'Bayonne',
    idNumber: '12',
    endContractDate: '2020-04-05',
    authorizations: [],
    supervisor: 'Marc Aroni'
  },

  {
    firstName: 'Marc',
    lastName: 'Aroni',
    department: 'Comptabilité',
    arrivalDate: '1996-12-21',
    nationality: 'Italie',
    contractType: 'CDI',
    position: 'Chef cuisinier',
    affiliateOffice: 'Bayonne',
    idNumber: '42',
    authorizations: ['Gaz'],
    supervisor: 'Dieu'
  },

  {
    firstName: 'Lucile',
    lastName: 'Teplé',
    department: 'Architecture',
    arrivalDate: '2002-01-07',
    nationality: 'Canada',
    contractType: 'CDD',
    position: 'Architecte',
    affiliateOffice: 'Panama',
    idNumber: '27',
    authorizations: [],
    supervisor: 'Rick Hochey',
    endContractDate: '2006-11-16'
  },

  {
    firstName: 'Rick',
    lastName: 'Hochey',
    department: 'Architecture',
    arrivalDate: '1995-06-17',
    nationality: 'Angleterre',
    contractType: 'CDI',
    position: 'Grand manitou',
    affiliateOffice: 'Panama',
    idNumber: '44',
    authorizations: ['Chimie'],
    supervisor: 'Moi'
  },

  {
    firstName: 'Albert',
    lastName: 'Gamott',
    department: 'Relations internationales',
    arrivalDate: '1942-05-13',
    nationality: 'Allemagne',
    contractType: 'CDI',
    position: 'Interprète anglais-allemand',
    affiliateOffice: 'Londres',
    idNumber: '81',
    authorizations: [],
    supervisor: 'Reine d\'Angleterre'
  }
];

const EQUIPMENTS: Equipment[] = [
  {
    name: 'Niveau à bulle',
    department: 'Architecture',
    location: 'Bayonne',
    neededAuthorizations: [],
    arrivalDate: '1856-05-18'
  },
  {
    name: 'Tractopelle',
    department: 'Ressources humaines',
    location: 'Tractopelle Land',
    neededAuthorizations: ['Permis de conduire'],
    arrivalDate: '2010-12-5'
  },
  {
    name: 'Equerre',
    department: 'Relations internationales',
    location: 'Londres',
    neededAuthorizations: ['Permis de porte d\'arme',
      'Permis de tuer'],
      arrivalDate: '2019-01-16'
  }
];

const CONTRACT_TYPES: ContractType[] = [
  { name: 'CDI' },
  { name: 'CDD' }
];

const LOCATIONS: Location[] = [
  { name: 'Londres' },
  { name: 'Bayonne' },
  { name: 'Panama' }
];

const IDENTITY_PAPERS_TYPES: IdentityPapersType[] = [
  { name: 'Permis de séjour' },
  { name: 'Carte d\'identité' }
];

const AUTHORIZATIONS: Authorization[] = [
  { name: 'Chimique', file: null },
  { name: 'Gaz', file: null }
];

const PRESENTATION_FILE =
  new Blob(['Super présentation de l\'entreprise'], { type: 'text/plain;charset=utf8' });

const ARCHIVE_FILE = new Blob(['Mon archive'], { type: 'text/plain;charset=utf8' });

@Injectable({
  providedIn: 'root'
})

export class RetrieveMockDataService {
  private authorizations: Authorization[];
  private contractTypes: ContractType[];
  private departments: Department[];
  private equipments: Equipment[];
  private identityPapersTypes: IdentityPapersType[];
  private locations: Location[];
  private people: Person[];
  private presentationFile: Blob;

  constructor() {
    this.authorizations = AUTHORIZATIONS;
    this.contractTypes = CONTRACT_TYPES;
    this.departments = DEPARTMENTS;
    this.equipments = EQUIPMENTS;
    this.identityPapersTypes = IDENTITY_PAPERS_TYPES;
    this.locations = LOCATIONS;
    this.people = PEOPLE;
    this.presentationFile = PRESENTATION_FILE;
  }

  // Add

  addAuthorization(authorization: Authorization): Observable<boolean> {
    this.authorizations.push(authorization);
    return of(true);
  }

  addContractType(contractType: ContractType): Observable<boolean> {
    this.contractTypes.push(contractType);
    return of(true);
  }

  addDepartment(department: Department): Observable<boolean> {
    this.departments.push(department);
    return of(true);
  }

  addEquipment(equipment: Equipment): Observable<boolean> {
    this.equipments.push(equipment);
    return of(true);
  }

  addIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    this.identityPapersTypes.push(identityPapersType);
    return of(true);
  }

  addLocation(location: Location): Observable<boolean> {
    this.locations.push(location);
    return of(true);
  }

  addPerson(person: Person): Observable<boolean> {
    this.people.push(person);
    return of(true);
  }

  // Delete

  deleteAuthorization(authorization: Authorization): Observable<boolean> {
    this.authorizations = this.authorizations.filter(a => authorization.name !== a.name);
    return of(true);
  }

  deleteContractTypes(contractType: ContractType): Observable<boolean> {
    this.contractTypes = this.contractTypes.filter(c => c.name !== contractType.name);
    return of(true);
  }

  deleteDepartment(department: Department): Observable<boolean> {
    this.departments = this.departments.filter(d => d.name !== department.name);
    return of(true);
  }

  deleteEquipment(equipment: Equipment): Observable<boolean> {
    this.equipments = this.equipments.filter(e => e.name !== equipment.name);
    return of(true);
  }

  deleteIdentityPapersType(identityPapersType: IdentityPapersType): Observable<boolean> {
    this.identityPapersTypes = this.identityPapersTypes.filter(i => i.name !== identityPapersType.name);
    return of(true);
  }

  deleteLocation(location: Location): Observable<boolean> {
    this.locations = this.locations.filter(l => l.name !== location.name);
    return of(true);
  }

  deletePerson(person: Person): Observable<boolean> {
    this.people = this.people.filter(p => p.idNumber !== person.idNumber);
    return of(true);
  }

  // Get

  getAuthorizations(): Observable<Authorization[]> {
    return of(this.authorizations);
  }

  getContractTypes(): Observable<ContractType[]> {
    return of(this.contractTypes);
  }

  getDepartments(): Observable<Department[]> {
    return of(this.departments);
  }

  getEquipments(): Observable<Equipment[]> {
    return of(this.equipments);
  }

  getIdentityPapersTypes(): Observable<IdentityPapersType[]> {
    return of(this.identityPapersTypes);
  }

  getLocations(): Observable<Location[]> {
    return of(this.locations);
  }

  getPeople(): Observable<Person[]> {
    return of(this.people);
  }

  getPresentationFile(): Observable<Blob> {
    return of(this.presentationFile);
  }

  updatePresentationFile(file: Blob): Observable<boolean> {
    this.presentationFile = file;
    return of(true);
  }

  // Get people whose name contains search term
  searchPeople(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if no search term, return all
      return of(PEOPLE);
    }
  }

  presentationFileExists() {
    return of(true);
  }

  getArchive(): Observable<Blob> {
    return of(ARCHIVE_FILE);
  }
}
