import { Component, OnInit } from '@angular/core';
import { Equipment, Department, Authorization, Location } from 'src/app/data-classes';
import { Router } from '@angular/router';
import { ManageEquipmentsService } from '../manage-equipments.service';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {

  public newEquipment: Equipment;

  public constructorFile: File;
  public infoFile: File;

  public dayArrival: number;
  public monthArrival: number;
  public yearArrival: number;

  public allAuthorizations: Authorization[];
  public allDepartments: Department[];
  public allEquipments: Equipment[];
  public allLocations: Location[];

  public showNewAuthorization = false;
  public newAuthorization: string;

  showAlertBox = false;

  constructor(
    private retrieveDataService: RetrieveDataService,
    private manageEquipmentsService: ManageEquipmentsService,
    private router: Router
  ) {
    this.newEquipment = new Equipment();
    this.newEquipment.neededAuthorizations = new Array<string>();
    this.allDepartments = new Array<Department>();
    this.allLocations = new Array<Location>();
  }

  ngOnInit() {
    this.getAllAuthorizations();
    this.getAllDepartments();
    this.getAllLocations();
  }

  getAllAuthorizations() {
    this.retrieveDataService.getAuthorizations()
      .subscribe(authorizations => this.allAuthorizations = authorizations);
  }

  getAllDepartments() {
    this.retrieveDataService.getDepartments()
      .subscribe(departments => this.allDepartments = departments);
  }

  getAllLocations() {
    this.retrieveDataService.getLocations()
      .subscribe(locations => this.allLocations = locations);
  }

  addEquipment() {
    if (this.checkIsValidEquipment()) {
      this.newEquipment.arrivalDate = this.yearArrival + '-' + this.monthArrival + '-' + this.dayArrival;

    this.manageEquipmentsService.addEquipment(this.newEquipment)
    .subscribe( res => {
      this.manageEquipmentsService.sendConstructorFile(this.newEquipment, this.constructorFile)
        .subscribe();
      this.manageEquipmentsService.sendEquipmentInformationFile(this.newEquipment, this.infoFile)
        .subscribe();
      this.getBackToEquipments();
        })
        ;
    } else {
      this.showAlertBox = true;
    }
  }

  onConstructorFileChange(event) {
    this.constructorFile = event.target.files[0];
  }

  onInfoFileChange(event) {
    this.infoFile = event.target.files[0];
  }

  getBackToEquipments() {
    this.router.navigate(['/', 'manage-data', 'equipments']);
  }

  addNewAuthorization() {
    this.newEquipment.neededAuthorizations.push(this.newAuthorization);
    this.showNewAuthorization = false;
    console.log(this.newEquipment.neededAuthorizations);
  }

  deleteAuthorization(authorization: string) {
    this.newEquipment.neededAuthorizations =
      this.newEquipment.neededAuthorizations.filter(a => a !== authorization);
  }

  checkIsValidEquipment(): boolean {
    return (
      this.newEquipment.name != null
      && this.newEquipment.department != null
      && this.newEquipment.location != null

      && this.dayArrival != null
      && this.monthArrival != null
      && this.yearArrival != null

      && this.constructorFile != null
      && this.infoFile != null
    );
  }
}
