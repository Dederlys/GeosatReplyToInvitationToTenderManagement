import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupEquipmentComponent } from './popup-equipment/popup-equipment.component';
import { PopupPersonComponent } from './popup-person/popup-person.component';
import { PopupDeletePeopleComponent } from './popup-delete-people/popup-delete-people.component';
import { PopupDeleteEquipmentsComponent } from './popup-delete-equipments/popup-delete-equipments.component';
import { PopupService } from './popup.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopupPersonComponent,
    PopupEquipmentComponent,
    PopupDeletePeopleComponent,
    PopupDeleteEquipmentsComponent
  ],
  exports: [
    PopupPersonComponent,
    PopupEquipmentComponent,
    PopupDeletePeopleComponent,
    PopupDeleteEquipmentsComponent
  ],
  providers: [
    PopupService
  ]
})
export class PopupModule { }
