import {Component, OnInit} from '@angular/core';
import {Employee} from '../../models/user.model';
import {UserDataService} from '../../change/user-data.service';

@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.css']
})
export class EmployeeOverviewComponent implements OnInit {
  public employees: Employee[];
  public changeManagers: Employee[];
  public errorMessage = 'Not available ';

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    this.userDataService.allUsers$.subscribe((result) => this.employees = result);
    this.userDataService.allChangeManagers$.subscribe((result) => this.changeManagers = result);
  }

  upgrade(employeeId: number): void {
    this.userDataService.upgradeEmployeeToChangeManager(employeeId).subscribe(() => {
      window.location.reload();
    });
  }
}
