import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Changemanager} from '../../change/changemanager.model';
import mockChange from '../../change/mockChange.json';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  loggedInUser$ = Changemanager.fromJSON(mockChange);

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}
