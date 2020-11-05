import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {DashboardDataService} from '../dashboard-data.service';
import {Roadmapitem} from '../roadmapitem.model';
import {ChartDataSets} from 'chart.js';

@Component({
  selector: 'app-dashboard-roadmap-item',
  templateUrl: './dashboard-roadmap-item.component.html',
  styleUrls: ['./dashboard-roadmap-item.component.css']
})
export class DashboardRoadmapItemComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public barChartProperties = this.makeDataForBarChart();
  public pieChartProperties = this.makeDataForPieChart();

  constructor(private _router: Router, private _dashboardDataService: DashboardDataService) {
  }

  private makeDataForBarChart(): {} {
    const data: ChartDataSets[] = [];
    const monthNumber = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    this.roadmapData.forEach(e => {
      if (e.startDate.getFullYear() === now.getFullYear() && e.endDate.getFullYear() === now.getFullYear()){
        for (let i = e.startDate.getMonth(); i <= e.endDate.getMonth(); i++){
          monthNumber[i] += 1;
        }
      }
    });
    data.push({data: monthNumber, label: 'Open surveys per month'});
    return {t: 'Monthly active roadmapitems', d: data, l: labels};
  }

  private makeDataForPieChart(): {} {
    // aantal vragen per roadmap
    // loopperiode all surveys
    const data: number[] = [];
    const labels: string[] = [];
    const now = new Date();
    this.roadmapData.forEach(e => {
      if (e.startDate.getFullYear() === now.getFullYear() && e.endDate.getFullYear() === now.getFullYear()){
        if (data[e.survey.questions.length]){
          data[e.survey.questions.length] += 1;
        } else{
          data[e.survey.questions.length] = 1;
        }
        labels[e.survey.questions.length] = e.survey.questions.length.toString() + ' questions';
      }
    });
    return {t: 'Number of roadmapitems with # questions', d: data, l: labels};
  }

  ngOnInit(): void {
  }

  get roadmapData(): Roadmapitem[]{
    return this._dashboardDataService.roadmapitem;
  }
}
