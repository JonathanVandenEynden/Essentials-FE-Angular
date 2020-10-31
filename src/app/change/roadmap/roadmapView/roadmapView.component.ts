import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faClipboard, faPlus, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ChangeInitiative} from '../../change.model';

@Component({
  selector: 'app-survey',
  templateUrl: './roadmapView.component.html',
  styleUrls: ['./roadmapView.component.css']
})
export class RoadmapViewComponent implements OnInit {
  public change: ChangeInitiative;
  faPlus = faPlus;
  faClip = faClipboard;
  faGroup = faUsers;
  faRoad = faRoute;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
    console.log(this.change);
  }

  // addSurvey(): void{
  //   this.router.navigate(['addSurvey']);
  // }
}
