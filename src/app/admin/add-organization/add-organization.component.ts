import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeCsvRecord} from './EmployeeCsvRecord';
import {split} from 'ts-node';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  public organizationName: string;
  public employeesList: EmployeeCsvRecord[];

  @ViewChild('csvReader') csvReader: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  createOrganization(): void {
    // TODO
  }

  convertCsv($event: any): void {
    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = ( csvData as string).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.employeesList = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };
    }
  }

  isValidCSVFile(file: any): any {
    return file.name.endsWith('.csv');
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any): any {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const currentRecord = (csvRecordsArray[i] as string).split(',');
      if (currentRecord.length === headerLength) {
        const csvRecord: EmployeeCsvRecord = new EmployeeCsvRecord();
        csvRecord.name = currentRecord[0].trim();
        csvRecord.country = currentRecord[1].trim();
        csvRecord.office = currentRecord[2].trim();
        csvRecord.factory = currentRecord[3].trim();
        csvRecord.department = currentRecord[4].trim();
        csvRecord.team = currentRecord[5].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any): any {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset(): void {
    this.csvReader.nativeElement.value = '';
    this.employeesList = [];
  }

}
