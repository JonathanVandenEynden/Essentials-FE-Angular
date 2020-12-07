import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardDataService} from '../dashboard-data.service';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Project} from '../../models/Project.model';

@Component({
  selector: 'app-dashbboard-project',
  templateUrl: './dashbboard-project.component.html',
  styleUrls: ['./dashbboard-project.component.css']
})
export class DashbboardProjectComponent implements OnInit {
  public faTachometer = faTachometerAlt;
  public faSync = faSyncAlt;
  public faPlus = faPlus;
  public barChartProperties: {};
  private fetchProjects$: Observable<Project[]>;
  private roadmapitems;
  private assessments;

  constructor(private router: Router, private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.fetchProjects$ = this.dashboardDataService.projects$;
    this.fetchProjects$
      .pipe(
        tap(console.log)
      )
      .subscribe(
        (projects: Project[]) => {
          this.roadmapitems = projects;
          this.assessments = projects;
          this.barChartProperties = this.makeDataForBarChart(projects);
        });
  }

  private makeDataForBarChart(p: Project[]): string { return ''; }

  get projectData$(): Observable<Project[]>{
    return this.fetchProjects$;
  }
}

