import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoadmapItem} from '../../../models/roadmapitem.model';
import {Observable} from 'rxjs';
import {RoadmapDataService} from '../roadmap-data.service';
import {Employee} from '../../../models/user.model';
import {faBell} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-roadmap-employee-information',
  templateUrl: './roadmap-employee-information.component.html',
  styleUrls: ['./roadmap-employee-information.component.css']
})
export class RoadmapEmployeeInformationComponent implements OnInit {
  public faBel = faBell;

  public inputRoadmapItem: RoadmapItem;
  private _fetchRmi: Observable<Employee[]>;
  private _employees: Employee[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public roadmapDataService: RoadmapDataService) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.inputRoadmapItem = item.roadmapItem);
    this._fetchRmi = this.roadmapDataService.getEmployeesNotFilledInSurvey$(this.inputRoadmapItem.id);
    this._fetchRmi.subscribe((employees: Employee[]) => this._employees = employees);
  }

  // GLHF ZIGGY XXX
  sendNotification(): void{

  }
}
