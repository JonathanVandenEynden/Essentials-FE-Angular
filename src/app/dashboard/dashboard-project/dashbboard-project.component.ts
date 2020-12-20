import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {faPlus, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {Project} from '../../models/Project.model';
import {ChartDataSets} from 'chart.js';
import {ChangeInitiative} from '../../models/change.model';

@Component({
  selector: 'app-dashbboard-project',
  templateUrl: './dashbboard-project.component.html',
  styleUrls: ['./dashbboard-project.component.css']
})
export class DashbboardProjectComponent implements OnInit {
  /*region properties*/
  public faTachometer = faTachometerAlt;
  public faPlus = faPlus;
  public barChartProperties: {};
  public pieChartChangeInitiativesProperties: {};
  public polarChartProperties: {};
  public barChartReady = false;
  public pieChartChangeInitiativesReady = false;
  public polarChartReady = false;
  private _fetchProjects$: Observable<Project[]>;
  private _fetchChangeInitiatives$: Observable<ChangeInitiative[]>;
  private _projects: Project[];
  private _changeInitiatives: ChangeInitiative[];
  private _months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  /*endregion*/

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this._fetchProjects$ = this._dashboardDataService.projects$;
    this._fetchChangeInitiatives$ = this._dashboardDataService.changeInitiatives$;
    this._fetchProjects$
      .subscribe(
        (projects: Project[]) => {
          this._projects = projects;
          this.makeProjectCharts();
        });
    this._fetchChangeInitiatives$
      .subscribe(
        (changeInitiatives: ChangeInitiative[]) => {
          this._changeInitiatives = changeInitiatives;
          this.makeChangeInitiativesCharts();
        });
  }

  /*region charts*/

  private makeProjectCharts(): void {
    this.barChartProperties = this.makeDataForBarChart();
  }

  private makeChangeInitiativesCharts(): void {
      this.pieChartChangeInitiativesProperties = this.makeDataForPieChartChangeInitiatives();
      this.polarChartProperties = this.makeDataForPolarChart();
  }

  private makeDataForBarChart(): {} {
    const data: ChartDataSets[] = [];
    let monthNumberChangeinitiatives = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const labels = this._months;
    const distinct: Project[] = [];
    const unique: number[] = [];
    for (const item of this._projects) {
      if (!unique[item.Id]){
        distinct.push(item);
        unique[item.Id] = 1;
      }
    }
    distinct.forEach(r => {
      r.ChangeInitiatives.forEach(e => {
        if (e.startDate.getFullYear() === now.getFullYear() && e.endDate.getFullYear() === now.getFullYear()) {
          for (let i = e.startDate.getMonth(); i <= e.endDate.getMonth(); i++) {
            monthNumberChangeinitiatives[i] += 1;
          }
        } else{
          monthNumberChangeinitiatives = null;
        }
      });
      if (monthNumberChangeinitiatives !== null){
        data.push({data: monthNumberChangeinitiatives, label: r.Name});
        monthNumberChangeinitiatives = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    });
    if (data.length !== 0){
      this.barChartReady = true;
    }
    return {t: 'Monthly active changeinitiatives', d: data, l: labels};
  }

  private makeDataForPieChartChangeInitiatives(): {} {
    const data: number[] = [];
    const labels: string[] = [];
    this._changeInitiatives.forEach(e => {
      data.push(Math.ceil((e.endDate.getTime() - e.startDate.getTime()) / (1000 * 60 * 60 * 24)));
      labels.push(e.name);
    });
    if (data.length !== 0){
      this.pieChartChangeInitiativesReady = true;
    }
    return {t: 'Days per changeinitiative', d: data, l: labels};
  }

  private makeDataForPolarChart(): {} {
    const data: number[] = [];
    const labels: string[] = [];
    this._changeInitiatives.forEach(e => {
      data.push(e.progress);
      labels.push(e.name);
    });
    if (data.length !== 0){
      this.polarChartReady = true;
    }
    return {t: 'Progress per ChangeInitiative', d: data, l: labels};
  }

  /*endregion*/

  /*region getters*/
  get changeInitiatives(): ChangeInitiative[]{
    return this._changeInitiatives;
  }
  get projects(): Project[]{
    return this._projects;
  }
  get projectData$(): Observable<Project[]>{
    return this._fetchProjects$;
  }
  get changeInitiativeData(): Observable<ChangeInitiative[]>{
    return this._fetchChangeInitiatives$;
  }
  /*endregion*/
}

