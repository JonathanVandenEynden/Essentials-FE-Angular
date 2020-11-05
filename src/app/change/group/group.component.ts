import { Component, OnInit } from '@angular/core';
import {ChangeInitiative} from '../change.model';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowLeft, faBars, faRoute, faUserMinus, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public change: ChangeInitiative;
  faArrow = faArrowLeft;
  faBars = faBars;
  faRoad = faRoute;
  faGroup = faUsers;
  faDeleteUser = faUserMinus;
  groups = ['Management', 'IT'];
  names = ['Simon De Wilde', 'Killian Hoefman', 'Ziggy Moens', 'Jonathan VDEVL', 'Sébastien De Pauw', 'Marbod Naassens'];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
    console.log(this.change);
  }

  routeRoadmap(): void{
    this.router.navigate(['roadmap/', this.change.id]);
  }
}
