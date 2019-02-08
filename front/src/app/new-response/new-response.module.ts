import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewResponseRoutingModule } from './new-response-routing.module';
import {
  SelectDocumentComponent,
  SelectPeopleComponent,
  SelectEquipmentsComponent,
  SelectDepartmentComponent,
} from './components';
import { SearchPeopleModule } from '../search-people/search-people.module';
import { SearchEquipmentsModule } from '../search-equipments/search-equipments.module';
import { PopupModule } from '../popup/popup.module';

@NgModule({
  imports: [
    CommonModule,
    NewResponseRoutingModule,
    SearchPeopleModule,
    SearchEquipmentsModule,
    PopupModule
  ],
  declarations: [
    SelectDepartmentComponent,
    SelectDocumentComponent,
    SelectPeopleComponent,
    SelectEquipmentsComponent
  ]
})
export class NewResponseModule { }
