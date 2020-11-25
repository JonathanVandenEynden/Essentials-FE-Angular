import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faClipboard, faPlus, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ChangeInitiative} from '../../../models/change.model';
import {RoadmapDataService} from '../roadmap-data.service';

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

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
    console.log(this.change);
  }

  // tslint:disable-next-line:typedef
  routeGroup() {
    this.router.navigate(['group', this.change.id]);
  }

  // addSurvey(): void{
  //   this.router.navigate(['addSurvey']);
  // }
  addRoadMapItem(): void {
    this.router.navigate(['addRoadmapItem', this.change.id]);
  }
}
