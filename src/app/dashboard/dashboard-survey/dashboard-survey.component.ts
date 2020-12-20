import { Component, OnInit } from '@angular/core';
import {faPlus, faTachometerAlt, faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {Observable} from 'rxjs';
import {RoadmapItem} from '../../models/roadmapitem.model';
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
  public faPlus = faPlus;
  public pieChartNumberOfQuestionsProperties: {};
  public barChartProperties: {};
  public pieChartRoadmapPhasesProperties: {};
  public pieChartRoadmapPhasesReady = false;
  public pieChartNumberOfQuestionsReady = false;
  public barChartReady = false;
  private _fetchChangeInitiatives$: Observable<ChangeInitiative[]>;
  private _roadmapItems: RoadmapItem[] = [];
  _currentRmi: RoadmapItem;
  private _months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  private _displayedColumns: string[] = ['Question', 'Answer', 'Times chosen'];
  private _dataSource: [{}] = [{}];
  /*endregion*/

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) { }

  ngOnInit(): void {
    this._fetchChangeInitiatives$ = this._dashboardDataService.changeInitiatives$;
    this._fetchChangeInitiatives$
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
    this.pieChartNumberOfQuestionsProperties = this.makeDataForPieChartNumberOfQuestions();
    this.pieChartRoadmapPhasesProperties = this.makeDataForPieChartRoadmapPhases();
    this.makeDataForTable();
  }

  private makeDataForTable(): void {
    this._dataSource.splice(0, 1);
    this._currentRmi.survey.Questions.forEach(e => {
      if (e.PossibleAnswers){
        const n = Object.keys(e.PossibleAnswers);
        const a = Object.values(e.PossibleAnswers);
        let average = 0;
        a.map(z => average += z);
        if (average === 0){
          this._dataSource.push({q: e.QuestionString, an: n, ac: a.map(() => '0 %')});
        } else{
          this._dataSource.push({q: e.QuestionString, an: n, ac: a.map(s => ((s / average) * 100).toString() + '%')});
        }
      }
    });
  }

  private makeDataForPieChartRoadmapPhases(): {} {
    const data: number[] = [];
    const labels: string[] = [];
    // tslint:disable-next-line:one-variable-per-declaration
    let f1 = 0, f2 = 0, f3 = 0;
    this._roadmapItems.forEach(e => {
      switch (e.phase){
        case 0: f1 += 1; break;
        case 1: f2 += 1; break;
        case 2: f3 += 1; break;
      }
    });
    data.push(f1, f2, f3);
    labels.push('Preparation phase', 'Implementation phase', 'Value creation phase');
    if (data.length !== 0){
      this.pieChartRoadmapPhasesReady = true;
    }
    return {t: 'Number of roadmapitems in cetrain phase', d: data, l: labels};
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
    let data: number[] = [];
    const labels: string[] = [];

    this._roadmapItems.forEach(e => {
      if (!data[e.survey.Questions.length]){
        data[e.survey.Questions.length] = 1;
      } else{
        data[e.survey.Questions.length] += 1;
      }
    });

    data.forEach(e => {
      switch (data.indexOf(e)){
        case 1: labels.push(data.indexOf(e) + ' question'); break;
        default: labels.push(data.indexOf(e) + ' questions'); break;
      }
    });

    data = data.filter(element => element !== undefined);

    if (data.length !== 0){
      this.pieChartNumberOfQuestionsReady = true;
    }

    return {t: 'Amount of surveys with # questions', d: data, l: labels};
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
