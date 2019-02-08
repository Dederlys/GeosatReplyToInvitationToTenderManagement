import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/data-classes/person';
import { PopupService } from '../popup.service';


@Component({
  selector: 'app-popup-person',
  templateUrl: './popup-person.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupPersonComponent implements OnInit {

  isShownDetail = false;
  detailsOnPerson: Person;

  yearArrival: number;
  monthArrival: number;
  dayArrival: number;

  yearEndContract: number;
  monthEndContract: number;
  dayEndContract: number;

  constructor(private popupService: PopupService) {
    this.popupService.showPersonMethod.subscribe(
      () => this.showDetail()
    );
  }

  ngOnInit() { }

  showDetail(): void {
    this.detailsOnPerson = this.popupService.getShowPerson();

    const dateArrival = this.detailsOnPerson.arrivalDate.split('-');
    this.yearArrival = Number.parseInt(dateArrival[0], 10);
    this.monthArrival = Number.parseInt(dateArrival[1], 10);
    this.dayArrival = Number.parseInt(dateArrival[2], 10);

    if (this.detailsOnPerson.endContractDate != null) {
      const dateEndContract = this.detailsOnPerson.endContractDate.split('-');
      this.yearEndContract = Number.parseInt(dateEndContract[0], 10);
      this.monthEndContract = Number.parseInt(dateEndContract[1], 10);
      this.dayEndContract = Number.parseInt(dateEndContract[2], 10);
    }
    
    if (this.detailsOnPerson !== null) {
      this.isShownDetail = true;
    }
  }

  closeDetail(): void {
    this.isShownDetail = false;
    this.detailsOnPerson = null;
  }
}
