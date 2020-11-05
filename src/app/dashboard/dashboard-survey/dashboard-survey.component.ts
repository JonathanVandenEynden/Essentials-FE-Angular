import { Component, OnInit } from '@angular/core';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {Survey} from '../survey.model';

@Component({
  selector: 'app-dashboard-survey',
  templateUrl: './dashboard-survey.component.html',
  styleUrls: ['./dashboard-survey.component.css']
})
export class DashboardSurveyComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
  }

  get surveyData(): Survey[]{
    return this._dashboardDataService.survey;
  }

}
