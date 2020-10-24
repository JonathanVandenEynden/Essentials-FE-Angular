import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import {Changemanager} from '../../change/changemanager.model';
import mockChange from '../../change/mockChange.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faTachometer = faTachometerAlt;
  faSync = faSyncAlt;
  faPlus = faPlus;
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);


  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  routeChangeEvents(): void {
    this._router.navigate(['change/home']);
  }
}
