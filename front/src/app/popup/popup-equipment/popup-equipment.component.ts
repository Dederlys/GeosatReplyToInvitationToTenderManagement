import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';
import { Equipment } from 'src/app/data-classes';

@Component({
  selector: 'app-popup-equipment',
  templateUrl: './popup-equipment.component.html',
  styleUrls: ['../popup.component.scss']
})
export class PopupEquipmentComponent implements OnInit {

  isShownDetail = false;
  detailsOnEquipment: Equipment;

  yearArrival: number;
  monthArrival: number;
  dayArrival: number;

  constructor(private popupService: PopupService) {
    this.popupService.showEquipmentMethod.subscribe(
      () => this.showDetail()
    );
  }

  ngOnInit() { }

  showDetail(): void {
    this.detailsOnEquipment = this.popupService.getShowEquipment();

    const dateArrival = this.detailsOnEquipment.arrivalDate.split('-');
    this.yearArrival = Number.parseInt(dateArrival[0], 10);
    this.monthArrival = Number.parseInt(dateArrival[1], 10);
    this.dayArrival = Number.parseInt(dateArrival[2], 10);

    if (this.detailsOnEquipment !== null) {
      this.isShownDetail = true;
    }
  }

  closeDetail(): void {
    this.isShownDetail = false;
    this.detailsOnEquipment = null;
  }
}
