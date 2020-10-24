import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Changemanager} from '../../change/changemanager.model';
import mockChange from '../../change/mockChange.json';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faUser = faUser;
  loggedInUser$ = Changemanager.fromJSON(mockChange);

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}
