import {Component, Input, OnInit} from '@angular/core';
import {ChangeInitiative} from '../change.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-button',
  templateUrl: './change-button.component.html',
  styleUrls: ['./change-button.component.css']
})
export class ChangeButtonComponent implements OnInit {
  @Input() public change: ChangeInitiative;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seeSurveys(): void{
    this.router.navigate(['Survey/', this.change.id]);
  }
}
