import { NgModule } from '@angular/core';

import {
  SelectDocumentComponent,
  SelectPeopleComponent,
  SelectEquipmentsComponent,
  SelectDepartmentComponent,
} from './components';
import { RouterModule, Routes } from '@angular/router';

const SelectRoutes: Routes = [
  { path: 'new-response',
    children: [
      { path: '', redirectTo: 'select-department', pathMatch: 'full' },
      { path: 'select-department', component: SelectDepartmentComponent },
      { path: 'select-document', component: SelectDocumentComponent },
      { path: 'select-people', component: SelectPeopleComponent },
      { path: 'select-means', component: SelectEquipmentsComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(SelectRoutes),
],
exports: [
    RouterModule,
],
})
export class NewResponseRoutingModule { }
