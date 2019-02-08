import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ManageAddressBookComponent,
  ManageAuthorizationsComponent,
  ManageCompanyInformationComponent,
  ManageCompanyPresentationComponent,
  ManageContractTypeComponent,
  ManageDataHeaderComponent,
  ManageDepartmentsComponent,
  ManageEquipmentsComponent,
  ManageEmployeesComponent,
  ManageIdentityPapersTypeComponent
} from './components';
import { ManageDataRoutingModule } from './manage-data-routing.module';
import { AddEmployeeComponent } from './components/manage-employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/manage-employees/edit-employee/edit-employee.component';
import { SearchEquipmentsModule } from '../search-equipments/search-equipments.module';
import { SearchPeopleModule } from '../search-people/search-people.module';
import { PopupModule } from '../popup/popup.module';
import { AddEquipmentComponent } from './components/manage-equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/manage-equipments/edit-equipment/edit-equipment.component';

@NgModule({
  imports: [
    CommonModule,
    ManageDataRoutingModule,
    FormsModule,
    SearchEquipmentsModule,
    SearchPeopleModule,
    PopupModule
  ],
  declarations: [
    ManageEmployeesComponent,
    ManageEquipmentsComponent,
    ManageCompanyInformationComponent,
    ManageDataHeaderComponent,
    ManageCompanyPresentationComponent,
    ManageAddressBookComponent,
    ManageAuthorizationsComponent,
    ManageIdentityPapersTypeComponent,
    ManageDepartmentsComponent,
    ManageContractTypeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    AddEquipmentComponent,
    EditEquipmentComponent
  ]
})
export class ManageDataModule { }
