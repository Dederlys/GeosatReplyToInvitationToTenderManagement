import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDataModule } from './manage-data/manage-data.module';
import { NewResponseModule } from './new-response/new-response.module';

const routes: Routes = [
   {
     path: 'new-response',
     loadChildren: './new-response/new-response.module#NewResponseModule'
   },
   {
     path: 'manage-data',
     loadChildren:
       './manage-data/manage-data.module#ManageDataModule'
   }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ManageDataModule,
    NewResponseModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
