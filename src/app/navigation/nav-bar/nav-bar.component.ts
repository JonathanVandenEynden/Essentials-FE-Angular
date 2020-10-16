import { Component, OnInit } from '@angular/core';
import {Changemanager} from '../../change/changemanager.model';
import mockChange from '../../change/mockChange.json';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public changeManager: Changemanager = Changemanager.fromJSON(mockChange);

  constructor() { }

  ngOnInit(): void {
  }

}
