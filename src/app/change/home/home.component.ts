import { Component, OnInit } from '@angular/core';
import {faPlus, faSyncAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import mockChange from '../mockChange.json';
import {Changemanager} from '../changemanager.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faTachometer = faTachometerAlt;
  faSync = faSyncAlt;
  faPlus = faPlus;
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  routeDashboard(): void {
    this._router.navigate(['dashboard']);
  }

  addChangeEvent(): void {
    this._router.navigate(['Add']);
  }
}
