import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../data-classes/person';
import { SelectedDataService } from 'src/app/new-response/components/selected-data.service';
import { PopupService } from 'src/app/popup/popup.service';
import { RetrieveDataService } from '../retrieve-data/retrieve-data.service';
import { ManageEmployeesService } from '../manage-data/components/manage-employees/manage-employees.service';

const CALLED_FROM_SELECT_PEOPLE = 'select-people';
const CALLED_FROM_MANAGE_EMPLOYEES = 'manage-employees';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  private allEmployees: Person[];
  public employees: Person[];
  public selectedPeople: Person[];
  @Input() calledFrom: string;

  constructor(
    private selectedDataService: SelectedDataService,
    private retrieveDataService: RetrieveDataService,
    private popupService: PopupService,
    private manageEmployeesService: ManageEmployeesService
  ) {
    this.allEmployees = new Array<Person>();
    this.employees = new Array<Person>();
    this.manageEmployeesService.refreshSearchPeopleMethod.subscribe(
      () => this.refresh()
    );
  }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    this.retrieveDataService.getPeople().subscribe(
      employees => {
        this.employees = employees;
        this.allEmployees = employees;
      }
    );
  }

  search(term: string): void {
    if (!term.trim()) {
      // if no search term, return all
      this.employees = this.allEmployees;
      return;
    }

    const matchingPeople = new Array<Person>();
    const myRegexp = '(\w?)*(\s?)(\w?)*' + term.toLowerCase() + '(\w?)*(\s?)(\w?)*'; // TODO define as attribute
    let name: string;

    for (const person of this.allEmployees) {
      name = '';
      name = name.concat(person.firstName.toLowerCase(), ' ', person.lastName.toLowerCase());
      if (name.search(myRegexp) !== -1) {
        matchingPeople.push(person);
      }
    }

    this.employees = matchingPeople;
  }

  onSelect(person: Person): void {
    if (this.calledFrom === CALLED_FROM_SELECT_PEOPLE) {
      this.selectedDataService.addPerson(person);
    }
    if (this.calledFrom === CALLED_FROM_MANAGE_EMPLOYEES) {
      this.manageEmployeesService.addPersonToManage(person);
    }
  }

  showDetail(person: Person): void {
    this.popupService.callShowPerson(person);
  }

  refresh(): void {
    this.getPeople();
  }
}
