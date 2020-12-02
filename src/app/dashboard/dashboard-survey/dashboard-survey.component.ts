import { Component, OnInit } from '@angular/core';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {Survey} from '../../models/survey.model';
import {Observable} from 'rxjs';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-survey',
  templateUrl: './dashboard-survey.component.html',
  styleUrls: ['./dashboard-survey.component.css']
})
export class DashboardSurveyComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public pieChartProperties: {};
  private fetchSurveys$: Observable<Survey[]>;

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this.fetchSurveys$ = this._dashboardDataService.surveys$;
    this.fetchSurveys$
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (roadmapItems: RoadmapItem[]) => {
        });
  }

  get surveyData$(): Observable<Survey[]>{
    return this.fetchSurveys$;
  }
}
