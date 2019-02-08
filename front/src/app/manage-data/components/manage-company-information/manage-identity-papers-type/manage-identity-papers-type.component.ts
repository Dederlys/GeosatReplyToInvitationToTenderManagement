import { Component, OnInit } from '@angular/core';
import { IdentityPapersType } from '../../../../data-classes/identity-papers-type';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';

@Component({
  selector: 'app-manage-identity-papers-type',
  templateUrl: './manage-identity-papers-type.component.html',
  styleUrls: ['./manage-identity-papers-type.component.scss']
})
export class ManageIdentityPapersTypeComponent implements OnInit {
  public identityPapersTypes: IdentityPapersType[];
  public newIdentityPapersType: IdentityPapersType;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.identityPapersTypes = new Array<IdentityPapersType>();
    this.newIdentityPapersType = new IdentityPapersType('');
  }

  ngOnInit() {
    this.getIdentityPapersTypes();
  }

  getIdentityPapersTypes() {
    this.retrieveDataService.getIdentityPapersTypes()
      .subscribe(identityPapersTypes => this.identityPapersTypes = identityPapersTypes);
  }

  addIdentityPapersType() {
    this.manageDataService.addIdentityPapersType(this.newIdentityPapersType)
      .subscribe(result => {
          this.getIdentityPapersTypes();
          this.newIdentityPapersType = new IdentityPapersType('');
        });
  }

  deleteIdentityPapersType(identityPapersTypes: IdentityPapersType) {
    this.manageDataService.deleteIdentityPapersType(identityPapersTypes)
      .subscribe(result => this.getIdentityPapersTypes());
  }
}
