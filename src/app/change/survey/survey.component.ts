import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faClipboard, faPlus, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ChangeInitiative} from '../change.model';
import {Changemanager} from '../changemanager.model';
import mockChange from '../mockChange.json';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  public change: ChangeInitiative;
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);
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
