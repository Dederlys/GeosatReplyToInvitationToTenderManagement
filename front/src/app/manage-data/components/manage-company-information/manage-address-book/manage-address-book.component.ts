import { Component, OnInit } from '@angular/core';
import { Location } from '../../../../data-classes/location';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';

@Component({
  selector: 'app-manage-address-book',
  templateUrl: './manage-address-book.component.html',
  styleUrls: ['./manage-address-book.component.scss']
})
export class ManageAddressBookComponent implements OnInit {
  public newLocation: Location;
  public locations: Location[];

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.locations = new Array<Location>();
    this.newLocation = new Location('');
  }

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.retrieveDataService.getLocations()
      .subscribe(locations => this.locations = locations);
  }

  addLocation() {
    this.manageDataService.addLocation(this.newLocation)
      .subscribe(result => {
        this.getLocations();
        this.newLocation = new Location('');
      });
  }

  deleteLocation(location: Location) {
    const res = this.manageDataService.deleteLocation(location)
      .subscribe(result => this.getLocations());
  }
}
