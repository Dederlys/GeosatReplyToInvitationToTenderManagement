import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPeopleComponent } from './search-people.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchPeopleComponent
  ],
  exports: [
    SearchPeopleComponent
  ]
})
export class SearchPeopleModule { }
