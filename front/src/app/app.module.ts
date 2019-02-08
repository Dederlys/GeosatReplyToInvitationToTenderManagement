import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NewResponseModule } from './new-response/new-response.module';
import { SearchPeopleModule } from './search-people/search-people.module';
import { SearchEquipmentsModule } from './search-equipments/search-equipments.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiRestService } from './api-rest.service';
import { ManageDataService } from './manage-data/manage-data.service';
import { RetrieveDataService } from './retrieve-data/retrieve-data.service';
import { PopupModule } from './popup/popup.module';
import { ManageDataModule } from './manage-data/manage-data.module';
import { ManageEmployeesService } from './manage-data/components/manage-employees/manage-employees.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewResponseModule,
    ManageDataModule,
    SearchPeopleModule,
    SearchEquipmentsModule,
    HttpClientModule,
    PopupModule
  ],
  providers: [
    ApiRestService,
    ManageDataService,
    RetrieveDataService,
    ManageEmployeesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
