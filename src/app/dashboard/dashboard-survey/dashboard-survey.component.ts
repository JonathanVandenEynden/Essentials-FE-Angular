import { Component, OnInit } from '@angular/core';
import {faPlus, faSyncAlt, faTachometerAlt, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {Survey} from '../../models/survey.model';
import {Observable} from 'rxjs';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {tap} from 'rxjs/operators';
import {ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-dashboard-survey',
  templateUrl: './dashboard-survey.component.html',
  styleUrls: ['./dashboard-survey.component.css']
})
export class DashboardSurveyComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faClipboardList = faClipboardCheck;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public pieChartProperties: {};
  public barChartProperties: {};
  public polarChartProperties: {};
  public pieChartReady = false;
  public barChartReady = false;
  public polarChartReady = false;
  private _fetchRoadmapItems$: Observable<RoadmapItem[]>;
  private _fetchSurveys$: Observable<Survey[]>;
  private _surveys: Survey[];
  private _roadmapItems: RoadmapItem[];
  private _currentRmi: RoadmapItem;
  private _months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  private _displayedColumns: string[] = ['Question', 'Answer', 'Times chosen'];
  private _dataSource: [{}];

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this._fetchSurveys$ = this._dashboardDataService.surveys$;
    this._fetchRoadmapItems$ = this._dashboardDataService.roadmapItems$;
    this._fetchRoadmapItems$
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (roadmapItems: RoadmapItem[]) => {
          this._currentRmi = roadmapItems[0];
          this._roadmapItems = roadmapItems;
          this.makeCharts();
        });

    this._fetchSurveys$
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (surveys: Survey[]) => {
          this._surveys = surveys;
          this.makeCharts();
        });
  }

  private makeCharts(): void{
    this.barChartProperties = this.makeDataForBarChart();
    this.pieChartProperties = this.makeDataForPieChartNumberOfQuestions();
    this.makeDataForTable();
  }

  private makeDataForTable(): void {
    this._dataSource = [{}];
    this._currentRmi.survey.Questions.forEach(e => {
      if (e.PossibleAnswers){
        const n = Object.keys(e.PossibleAnswers);
        const a = Object.values(e.PossibleAnswers);
        this._dataSource.push({q: e.QuestionString, an: n, ac: a});
        this._dataSource.splice(0, 1);
      }
    });
  }

  private makeDataForBarChart(): {} {
    const data: ChartDataSets[] = [];
    const monthNumberChangeinitiatives = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const labels = this._months;

    this._roadmapItems.forEach(e => {
        if (e.startDate.getFullYear() === now.getFullYear() && e.endDate.getFullYear() === now.getFullYear()) {
          for (let i = e.startDate.getMonth(); i <= e.endDate.getMonth(); i++) {
            monthNumberChangeinitiatives[i] += 1;
          }
        }
    });
    data.push({data: monthNumberChangeinitiatives, label: 'Monthly active'});
    if (data.length !== 0){
      this.barChartReady = true;
    }
    return {t: 'Monthly active Surveys', d: data, l: labels};
  }

  private makeDataForPieChartNumberOfQuestions(): {} {
    const data: number[] = [];
    const labels: string[] = [];
    this._roadmapItems.forEach(e => {
      data.push(e.survey.Questions.length);
      labels.push(e.survey.Questions.length.toString());
    });
    if (data.length !== 0){
      this.pieChartReady = true;
    }
    return {t: 'Questions per Survey', d: data, l: labels};
  }

  public updateDashboard(rmi: RoadmapItem): void {
    this._currentRmi = rmi;
    this.makeCharts();
  }

  get surveyData$(): Observable<Survey[]>{
    return this._fetchSurveys$;
  }
  get roadmapItemData$(): Observable<RoadmapItem[]>{
    return this._fetchRoadmapItems$;
  }
  get surveys(): Survey[]{
    return this._surveys;
  }
  get roadmapItems(): RoadmapItem[]{
    return this._roadmapItems;
  }
  get dataSource(): [{}]{
    return this._dataSource;
  }
  get columns(): string[]{
    return this._displayedColumns;
  }
}
