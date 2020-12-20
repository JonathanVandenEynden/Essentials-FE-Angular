import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoadmapItem} from '../../../models/roadmapitem.model';
import {Observable} from 'rxjs';
import {RoadmapDataService} from '../roadmap-data.service';
import {Employee} from '../../../models/user.model';
import {faBell, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {ChangeDataService} from '../../change-data.service';

@Component({
  selector: 'app-roadmap-employee-information',
  templateUrl: './roadmap-employee-information.component.html',
  styleUrls: ['./roadmap-employee-information.component.css']
})
export class RoadmapEmployeeInformationComponent implements OnInit {
  public faBel = faBell;
  public faArrowCircleLeft = faArrowCircleLeft;

  public inputRoadmapItem: RoadmapItem;
  private _fetchRmi: Observable<Employee[]>;
  _employees: Employee[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roadmapDataService: RoadmapDataService,
              private changeDataService: ChangeDataService ) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.inputRoadmapItem = item.roadmapItem);
    this._fetchRmi = this.roadmapDataService.getEmployeesNotFilledInSurvey$(this.inputRoadmapItem.id);
    this._fetchRmi.subscribe((employees: Employee[]) => this._employees = employees);
  }

  sendNotification(): void{
    const ids = [];
    this._employees.forEach(e => ids.push(e.ID.toString()));
    this.changeDataService.sendPushnotification(`Essentials - Please fill in ${this.inputRoadmapItem.title}`, 'Please complete the survey in the roadmapitem', ids);
    alert('You send out a notfication!');
  }
}
