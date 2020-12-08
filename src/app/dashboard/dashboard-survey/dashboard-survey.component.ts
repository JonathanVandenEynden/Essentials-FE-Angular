import { Component, OnInit } from '@angular/core';
import {faPlus, faSyncAlt, faTachometerAlt, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {Observable} from 'rxjs';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {tap} from 'rxjs/operators';
import {ChartDataSets} from 'chart.js';
import {ChangeInitiative} from '../../models/change.model';

@Component({
  selector: 'app-dashboard-survey',
  templateUrl: './dashboard-survey.component.html',
  styleUrls: ['./dashboard-survey.component.css']
})
export class DashboardSurveyComponent implements OnInit {
  /*region properties*/
  public faTachometer = faTachometerAlt;
  public faClipboardList = faClipboardCheck;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public pieChartProperties: {};
  public barChartProperties: {};
  public polarChartProperties: {};
  public pieChartReady = false;
  public barChartReady = false;
  private _fetchChangeInitiatives$: Observable<ChangeInitiative[]>;
  private _roadmapItems: RoadmapItem[] = [];
  private _currentRmi: RoadmapItem;
  private _months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  private _displayedColumns: string[] = ['Question', 'Answer', 'Times chosen'];
  private _dataSource: [{}] = [{}];
  /*endregion*/

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this._fetchChangeInitiatives$ = this._dashboardDataService.changeInitiatives$;
    this._fetchChangeInitiatives$
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (changeInitiatives: ChangeInitiative[]) => {
          const arr: [RoadmapItem[]] = [[]];
          changeInitiatives.forEach(e => arr.push(e.roadMap));
          arr.splice(0, 1);
          arr.forEach(e => e.forEach(r => this._roadmapItems.push(r)));
          this._currentRmi = this._roadmapItems[0];
          this.makeCharts();
        });
  }

  /*region charts*/
  private makeCharts(): void{
    this.barChartProperties = this.makeDataForBarChart();
    this.pieChartProperties = this.makeDataForPieChartNumberOfQuestions();
    this.makeDataForTable();
  }

  private makeDataForTable(): void {
    this._dataSource.splice(0, 1);
    console.log(this._currentRmi.survey.Questions.length);
    this._currentRmi.survey.Questions.forEach(e => {
      if (e.PossibleAnswers){
        const n = Object.keys(e.PossibleAnswers);
        const a = Object.values(e.PossibleAnswers);
        this._dataSource.push({q: e.QuestionString, an: n, ac: a});
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
  /*endregion*/

  /*region getters*/
  get roadmapItems(): RoadmapItem[]{
    return this._roadmapItems;
  }
  get dataSource(): [{}]{
    return this._dataSource;
  }
  get columns(): string[]{
    return this._displayedColumns;
  }
  /*endregion*/
}
