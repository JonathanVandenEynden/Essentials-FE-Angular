import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashbboard-project',
  templateUrl: './dashbboard-project.component.html',
  styleUrls: ['./dashbboard-project.component.css']
})
export class DashbboardProjectComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) {
  }

  ngOnInit(): void {
  }
}

