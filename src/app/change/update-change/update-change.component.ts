import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeInitiative} from '../change.model';
import {faClipboard, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-change',
  templateUrl: './update-change.component.html',
  styleUrls: ['./update-change.component.css']
})
export class UpdateChangeComponent implements OnInit {
  public change: ChangeInitiative;
  faClip = faClipboard;
  faGroup = faUsers;
  faRoad = faRoute;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(item => this.change = item.change);
  }

}
