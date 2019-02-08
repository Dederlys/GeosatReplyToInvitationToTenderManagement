import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ManageCompanyInformationComponent,
  ManageEmployeesComponent,
  ManageEquipmentsComponent,
  AddEmployeeComponent,
  EditEmployeeComponent,
  
} from './components';
import { AddEquipmentComponent } from './components/manage-equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/manage-equipments/edit-equipment/edit-equipment.component';

const ManageDataRoutes: Routes = [
  {
    path: 'manage-data',
    children: [
      {
        path: '',
        redirectTo: 'company-information',
        pathMatch: 'full'
      },
      {
        path: 'employees', component: ManageEmployeesComponent
      },
      {
        path: 'add-employee', component: AddEmployeeComponent
      },
      {
        path: 'edit-employee', component: EditEmployeeComponent
      },
      {
        path: 'company-information',
        component: ManageCompanyInformationComponent
      },
      {
        path: 'equipments',
        component: ManageEquipmentsComponent
      },
      {
        path: 'add-equipment', component: AddEquipmentComponent
      },
      {
        path: 'edit-equipment', component: EditEquipmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ManageDataRoutes)
  ],
  exports: [RouterModule]
})
export class ManageDataRoutingModule { }
