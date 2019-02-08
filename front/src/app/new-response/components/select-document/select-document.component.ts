import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedDataService } from '../selected-data.service';
import { Person } from 'src/app/data-classes/person';
import { Equipment } from 'src/app/data-classes/equipment';
import { Department } from 'src/app/data-classes/department';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { ApiRestService } from 'src/app/api-rest.service';

const ARCHIVE_NAME = 'ReponseAppelOffre.zip';
const SEND_NEW_REPONSE_DATA_FILE = '/archive';

@Component({
  selector: 'app-select-document',
  templateUrl: './select-document.component.html',
  styleUrls: ['./select-document.component.scss']
})
export class SelectDocumentComponent implements OnInit {

  public selectedDepartment: Department;
  public selectedPeople: Person[];
  public selectedEquipments: Equipment[];
  public myArchive: Blob;

  constructor(
    private selectedDataService: SelectedDataService,
    private router: Router,
    private apiRestService: ApiRestService
  ) { }

  ngOnInit() {
    this.getSelectedDepartment();

    if (this.selectedDepartment == null) {
      this.router.navigate(['/', 'new-response', 'select-department']);
    }

    this.getSelectedPeople();
    this.getSelectedEquipments();
  }

  getSelectedDepartment(): void {
    this.selectedDataService.getSelectedDepartment()
      .subscribe(selectedDepartment => this.selectedDepartment = selectedDepartment);
  }

  getSelectedPeople(): void {
    this.selectedDataService.getSelectedPeople()
      .subscribe(selectedPeople => this.selectedPeople = selectedPeople);
  }

  getSelectedEquipments(): void {
    this.selectedDataService.getSelectedEquipments()
      .subscribe(selectedEquipments => this.selectedEquipments = selectedEquipments);
  }

  downloadArchive(): void {
    this.sendNewResponse().subscribe(
      blob => {
        this.myArchive = blob;
        saveAs(this.myArchive, ARCHIVE_NAME);
      }
    );
  }

  sendNewResponse(): Observable<Blob> {
    return this.apiRestService.postArchive(
      SEND_NEW_REPONSE_DATA_FILE,
      {
        mlEmployees: this.selectedPeople,
        mlEquipments: this.selectedEquipments
      }
    );
  }
}
