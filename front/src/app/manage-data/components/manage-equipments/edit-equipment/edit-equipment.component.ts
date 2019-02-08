import { Component, OnInit, Input } from '@angular/core';
import { Equipment, Authorization, Department, Location } from 'src/app/data-classes';
import { ManageEquipmentsService } from '../manage-equipments.service';
import { Router } from '@angular/router';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.scss']
})
export class EditEquipmentComponent implements OnInit {

  @Input() equipment: Equipment;

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

  constructor(
    private manageEquipmentsService: ManageEquipmentsService,
    private retrieveDataService: RetrieveDataService,
    private router: Router
  ) {
    this.allDepartments = new Array<Department>();
    this.allLocations = new Array<Location>();
  }

  ngOnInit() {
    this.getSelectedEquipment();

    this.getAllAuthorizations();
    this.getAllDepartments();
    this.getAllLocations();
  }

  addNewAuthorization() {
    this.equipment.neededAuthorizations.push(this.newAuthorization);
    this.showNewAuthorization = false;
  }

  checkIsValidEquipment(): boolean {
    return (
      this.equipment.name != null
      && this.equipment.department != null
      && this.equipment.location != null

      && this.dayArrival != null
      && this.monthArrival != null
      && this.yearArrival != null
    );
  }

  deleteAuthorization(authorization: string) {
    this.equipment.neededAuthorizations =
      this.equipment.neededAuthorizations.filter(a => a !== authorization);
  }

  editEquipment() {
    this.equipment.arrivalDate = this.yearArrival + '-' + this.monthArrival + '-' + this.dayArrival;

    this.manageEquipmentsService.editEquipment(this.equipment).subscribe(
      res => {
        if (this.constructorFile != null) {
          this.manageEquipmentsService.sendConstructorFile(this.equipment, this.constructorFile).subscribe();
        }
        if (this.infoFile != null) {
          this.manageEquipmentsService.sendEquipmentInformationFile(this.equipment, this.infoFile).subscribe();
        }
        this.getBackToEquipments();
      }
    );
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

  getBackToEquipments() {
    this.router.navigate(['/', 'manage-data', 'equipments']);
  }

  getSelectedEquipment(): void {
    this.manageEquipmentsService.getSelectedEquipmentsToManage().subscribe(
      selectedEquipments => {
        if (selectedEquipments[0] == null) {
          this.router.navigate(['/', 'manage-data', 'equipments']);
        } else {
          this.equipment = selectedEquipments[0];

          const dateArrival = this.equipment.arrivalDate.split('-');
          this.yearArrival = Number.parseInt(dateArrival[0], 10);
          this.monthArrival = Number.parseInt(dateArrival[1], 10);
          this.dayArrival = Number.parseInt(dateArrival[2], 10);
        }
      }
    );
  }

  onConstructorFileChange(event) {
    this.constructorFile = event.target.files[0];
  }

  onInfoFileChange(event) {
    this.infoFile = event.target.files[0];
  }

  downloadConstructorFile() {
    this.retrieveDataService.getConstructorFile(this.equipment)
      .subscribe(file => saveAs(file, this.equipment.name + '_Documentation.docx'));
  }

  downloadInfoFile() {
    this.retrieveDataService.getInfoFile(this.equipment)
      .subscribe(file => saveAs(file, this.equipment.name + '_Description.docx'));
  }

}
