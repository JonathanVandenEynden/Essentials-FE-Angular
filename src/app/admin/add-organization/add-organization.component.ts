import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {EmployeeCsvRecord} from './EmployeeCsvRecord';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {
  public organizationName: string;
  public employeeRecords: EmployeeCsvRecord[] = [];
  @ViewChild('csvReader') csvReader: any;


  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
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

      reader.onerror = () =>  {
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
      const curruntRecord = (csvRecordsArray[i] as string).split(';');
      if (curruntRecord.length === headerLength) {
        const csvRecord: EmployeeCsvRecord = new EmployeeCsvRecord();
        csvRecord.name = curruntRecord[0].trim();
        csvRecord.country = curruntRecord[1].trim();
        csvRecord.office = curruntRecord[2].trim();
        csvRecord.factory = curruntRecord[3].trim();
        csvRecord.department = curruntRecord[4].trim();
        csvRecord.team = curruntRecord[5].trim();
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
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset(): any {
    this.csvReader.nativeElement.value = '';
    this.employeeRecords = [];
  }

  onSubmit(): void {
    console.log( this.employeeRecords);
    // let json: any;
    // json = {
    //   organizationName: this.organizationName,
    //   employees: this.selectedFile
    //   // TODO changeManager
    // };
    // this.http.post(
    //   `${environment.apiUrl}/Organizations`, json).subscribe((data: any) => {
    //   console.log(data);
    // });
  }
}
