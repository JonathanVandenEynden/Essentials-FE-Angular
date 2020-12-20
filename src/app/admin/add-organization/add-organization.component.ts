import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {faPlus, faSearch, faClipboard, faHome} from '@fortawesome/free-solid-svg-icons';

import {EmployeeCsvRecord} from '../../models/EmployeeCsvRecord';
import {AdminDataService} from '../admin-data.service';
import {Location} from '@angular/common';

export interface OrganizationPostJson {
  name: string;
  employeeRecordDTOs: EmployeeCsvRecord[];
}

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  public organizationName = '';
  public employeeRecords: EmployeeCsvRecord[] = [];
  faHome = faHome;
  faClipboard = faClipboard;
  faPlus = faPlus;
  @ViewChild('csvReader') csvReader: any;


  constructor(private router: Router,
              private adminDataService: AdminDataService,
              private location: Location) {
  }

  ngOnInit(): void {
  }

  isValid(): boolean {
    return !(this.organizationName.length > 0 && this.employeeRecords.length > 0);
  }

  onSubmit(): void {
    console.log(this.employeeRecords);
    const json = {
      name: this.organizationName,
      employeeRecordDTOs: this.employeeRecords
    } as OrganizationPostJson;
    this.adminDataService.postOrganization(json).subscribe(() => {
      this.location.back();
    });
  }

  onFileSelected(event): void {
    const text = [];
    const files = event.target.files;
    if (this.isValidCSVFile(files[0])) {

      const input = event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.employeeRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): any {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length - 1; i++) {
      const currentRecord = (csvRecordsArray[i] as string).split(';');
      if (currentRecord.length === headerLength) {
        const csvRecord: EmployeeCsvRecord = new EmployeeCsvRecord();
        csvRecord.name = currentRecord[0].trim() === 'Not Applicable' ? '' : currentRecord[0].trim();
        csvRecord.country = currentRecord[1].trim() === 'Not Applicable' ? '' : currentRecord[1].trim();
        csvRecord.office = currentRecord[2].trim() === 'Not Applicable' ? '' : currentRecord[2].trim();
        csvRecord.factory = currentRecord[3].trim() === 'Not Applicable' ? '' : currentRecord[3].trim();
        csvRecord.department = currentRecord[4].trim() === 'Not Applicable' ? '' : currentRecord[4].trim();
        csvRecord.team = currentRecord[5].trim() === 'Not Applicable' ? '' : currentRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any): any {
    const headers = (csvRecordsArr[0] as string).split(';');
    const headerArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset(): any {
    this.csvReader.nativeElement.value = '';
    this.employeeRecords = [];
  }

  NavigateToHome(): void {
    this.router.navigate(['admin/home']);
  }
}
