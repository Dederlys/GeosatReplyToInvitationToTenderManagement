import { Component, OnInit } from '@angular/core';
import { ContractType } from '../../../../data-classes/contract-type';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';

@Component({
  selector: 'app-manage-contract-type',
  templateUrl: './manage-contract-type.component.html',
  styleUrls: ['./manage-contract-type.component.scss']
})

export class ManageContractTypeComponent implements OnInit {
  public newContractType: ContractType;
  public contractTypes: ContractType[];

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.contractTypes = new Array<ContractType>();
    this.newContractType = new ContractType('');
  }

  ngOnInit() {
    this.getContractTypes();
  }

  getContractTypes() {
    this.retrieveDataService.getContractTypes()
      .subscribe(contractTypes => this.contractTypes = contractTypes);
  }

  addContractType() {
    this.manageDataService.addContractType(this.newContractType)
      .subscribe(result => {
        this.getContractTypes();
        this.newContractType = new ContractType('');
      });
  }

  deleteContractType(contractType: ContractType) {
    this.manageDataService.deleteContractType(contractType)
      .subscribe(result => this.getContractTypes());
  }
}
