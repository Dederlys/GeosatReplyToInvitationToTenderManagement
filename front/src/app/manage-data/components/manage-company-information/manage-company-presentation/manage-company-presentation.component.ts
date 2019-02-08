import { Component, OnInit, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { RetrieveDataService } from 'src/app/retrieve-data/retrieve-data.service';
import { ManageDataService } from 'src/app/manage-data/manage-data.service';
import { Observable } from 'rxjs';

const PRESENTATION_FILE_NAME = 'Description Entreprise.docx';

@Component({
  selector: 'app-manage-company-presentation',
  templateUrl: './manage-company-presentation.component.html',
  styleUrls: ['./manage-company-presentation.component.scss']
})
export class ManageCompanyPresentationComponent implements OnInit {
  public fileExists: boolean;
  public currentFile: Blob;
  public newFile: Blob;

  constructor(
    private retrieveData: RetrieveDataService,
    private manageDataService: ManageDataService
  ) {
    this.fileExists = false;
  }

  ngOnInit() {
    this.retrieveData.presentationFileExists()
      .subscribe(res => {
        this.fileExists = res;
      });
  }

  getFile(): Observable<Blob> {
    return this.retrieveData.getPresentationFile();
  }

  onFileChange(event) {
    this.newFile = event.target.files[0];
  }

  downloadPresentation() {
    this.getFile().subscribe(file => saveAs(file, PRESENTATION_FILE_NAME));
  }

  sendNewPresentation() {
    this.manageDataService.sendNewPresentation(this.newFile).subscribe();
    this.getFile();
  }
}
