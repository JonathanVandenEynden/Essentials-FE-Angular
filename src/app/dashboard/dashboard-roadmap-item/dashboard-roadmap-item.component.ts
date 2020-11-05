import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {DashboardDataService} from '../dashboard-data.service';
import {Survey} from '../survey.model';
import {Roadmapitem} from '../roadmapitem.model';
import {Label} from 'ng2-charts';
import {ChartDataSets} from 'chart.js';
import {Observable} from 'rxjs';

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
    const colorArray: string[] = [
      'rgba(250,125,0,0.3)', 'rgba(0,250,125,0.3)', 'rgba(125,0,250,0.3)',
      'rgb(120,28,129,0.3)', 'rgb(64,67,153,0.3)', 'rgb(72,139,194,0.3)', 'rgb(107,178,140,0.3)',
      'rgb(159,190,87,0.3)', 'rgb(210,179,63,0.3)', 'rgb(231,126,49,0.3)', 'rgb(217,33,32,0.3)',
      '#63b598', '#ce7d78', '#ea9e70', '#a48a9e', '#c6e1e8', '#648177' , '#0d5ac1' ,
      '#f205e6' , '#1c0365' , '#14a9ad' , '#4ca2f9' , '#a4e43f' , '#d298e2' , '#6119d0',
      '#d2737d' , '#c0a43c' , '#f2510e' , '#651be6' , '#79806e' , '#61da5e' , '#cd2f00' ,
      '#9348af' , '#01ac53' , '#c5a4fb' , '#996635', '#b11573' , '#4bb473' , '#75d89e' ,
      '#2f3f94' , '#2f7b99' , '#da967d' , '#34891f' , '#b0d87b' , '#ca4751' , '#7e50a8' ,
      '#c4d647' , '#e0eeb8' , '#11dec1' , '#289812' , '#566ca0' , '#ffdbe1' , '#2f1179' ,
      '#935b6d' , '#916988' , '#513d98' , '#aead3a', '#9e6d71', '#4b5bdc', '#0cd36d',
      '#250662', '#cb5bea', '#228916', '#ac3e1b', '#df514a', '#539397', '#880977',
      '#f697c1', '#ba96ce', '#679c9d', '#c6c42c', '#5d2c52', '#48b41b', '#e1cf3b',
      '#5be4f0', '#57c4d8', '#a4d17a', '#225b8', '#be608b', '#96b00c', '#088baf',
      '#f158bf', '#e145ba', '#ee91e3', '#05d371', '#5426e0', '#4834d0', '#802234',
      '#6749e8', '#0971f0', '#8fb413', '#b2b4f0', '#c3c89d', '#c9a941', '#41d158',
      '#fb21a3', '#51aed9', '#5bb32d', '#807fb', '#21538e', '#89d534', '#d36647',
      '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
      '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
      '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#21538e', '#89d534', '#d36647',
      '#7fb411', '#0023b8', '#3b8c2a', '#986b53', '#f50422', '#983f7a', '#ea24a3',
      '#79352c', '#521250', '#c79ed2', '#d6dd92', '#e33e52', '#b2be57', '#fa06ec',
      '#1bb699', '#6b2e5f', '#64820f', '#1c271', '#9cb64a', '#996c48', '#9ab9b7'];
    const data: number[] = [];
    let labels: string[] = [];
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
    return {t: 'Number of surveyquestions per roadmapitem', d: data, l: labels, c: colorArray.slice(0, data.length)};
  }

  ngOnInit(): void {
  }

  get surveyData(): Survey[]{
    return this._dashboardDataService.survey;
  }

  get roadmapData(): Roadmapitem[]{
    return this._dashboardDataService.roadmapitem;
  }
}
