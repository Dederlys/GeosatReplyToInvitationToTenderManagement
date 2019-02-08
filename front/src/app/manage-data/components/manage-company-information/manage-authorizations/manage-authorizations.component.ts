import { Component, OnInit } from '@angular/core';
import { Authorization } from '../../../../data-classes/authorization';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';

@Component({
  selector: 'app-manage-authorizations',
  templateUrl: './manage-authorizations.component.html',
  styleUrls: ['./manage-authorizations.component.scss']
})
export class ManageAuthorizationsComponent implements OnInit {
  public authorizations: Authorization[];
  public newAuthorization: Authorization;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.authorizations = new Array<Authorization>();
    this.newAuthorization = new Authorization('', null);
  }

  ngOnInit() {
    this.getAuthorizations();
  }

  getAuthorizations() {
    this.retrieveDataService.getAuthorizations()
      .subscribe(authorizations => this.authorizations = authorizations);
  }

  onFileChange(event) {
    this.newAuthorization.file = event.target.files[0];
  }

  addAuthorization() {
    if (this.newAuthorization.name !== '' && this.newAuthorization.file !== null) {
      this.manageDataService.addAuthorization(this.newAuthorization)
      .subscribe(result => {
        this.manageDataService.addAuthorizationFile(this.newAuthorization).subscribe(() => {
          this.getAuthorizations();
          this.newAuthorization = new Authorization('', null);
        });
      });
    }
  }

  deleteAuthorization(authorization: Authorization) {
    this.manageDataService.deleteAuthorization(authorization)
      .subscribe(result => this.getAuthorizations());
  }
}
