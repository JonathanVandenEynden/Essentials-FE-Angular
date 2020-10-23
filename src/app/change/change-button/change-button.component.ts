import {Component, Input, OnInit} from '@angular/core';
import {ChangeInitiative} from '../change.model';
import {Router} from '@angular/router';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ChangeDataService} from '../change-data.service';

@Component({
  selector: 'app-change-button',
  templateUrl: './change-button.component.html',
  styleUrls: ['./change-button.component.css']
})
export class ChangeButtonComponent implements OnInit {
  @Input() public change: ChangeInitiative;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private router: Router, private changeDataService: ChangeDataService) { }

  ngOnInit(): void {
  }

  seeSurveys(): void{
    this.router.navigate(['Survey/', this.change.id]);
  }
  // tslint:disable-next-line:typedef
  deleteChange(change: ChangeInitiative){
    this.changeDataService.removeChange(change.id);
  }
  // tslint:disable-next-line:typedef
  updateChange(){
    this.router.navigate(['Update']);
  }
}
