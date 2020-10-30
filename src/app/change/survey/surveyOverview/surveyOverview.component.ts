import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faClipboard, faPlus, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ChangeInitiative} from '../../change.model';

@Component({
  selector: 'app-survey',
  templateUrl: './surveyOverview.component.html',
  styleUrls: ['./surveyOverview.component.css']
})
export class SurveyOverviewComponent implements OnInit {
  public change: ChangeInitiative;
  faPlus = faPlus;
  faClip = faClipboard;
  faGroup = faUsers;
  faRoad = faRoute;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
  }

  addSurvey(): void{
    this.router.navigate(['addSurvey']);
  }
}
