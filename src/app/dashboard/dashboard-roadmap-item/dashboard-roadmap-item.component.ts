import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {DashboardDataService} from '../dashboard-data.service';
import {RoadmapItem} from '../../models/roadmapitem.model';
import {ChartDataSets} from 'chart.js';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-roadmap-item',
  templateUrl: './dashboard-roadmap-item.component.html',
  styleUrls: ['./dashboard-roadmap-item.component.css']
})
export class DashboardRoadmapItemComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public barChartProperties: {};
  private fetchRoadmapItems$: Observable<RoadmapItem[]>;

  constructor(private router: Router, private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.fetchRoadmapItems$ = this.dashboardDataService.roadMapItems$;
    this.fetchRoadmapItems$
      .pipe(
        tap(console.log)
      )
      .subscribe(
      (roadmapItems: RoadmapItem[]) => {
        this.barChartProperties = this.makeDataForBarChart(roadmapItems);
    });
  }

  private makeDataForBarChart(rmi: RoadmapItem[]): {} {
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

    rmi.forEach(e => {
        if (e.startDate.getFullYear() === now.getFullYear() && e.endDate.getFullYear() === now.getFullYear()){
          for (let i = e.startDate.getMonth(); i <= e.endDate.getMonth(); i++){
            monthNumber[i] += 1;
          }
        }
      });

    data.push({data: monthNumber, label: 'Open surveys per month'});
    return {t: 'Monthly active roadmapitems', d: data, l: labels};
  }

  get roadmapData$(): Observable<RoadmapItem[]>{
    return this.fetchRoadmapItems$;
  }
}
