import {Component, Input, OnInit} from '@angular/core';
import {ChangeInitiative} from '../change.model';
import {Router} from '@angular/router';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ChangeDataService} from '../change-data.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteChangeComponent} from '../delete-change/delete-change.component';

@Component({
  selector: 'app-change-button',
  templateUrl: './change-button.component.html',
  styleUrls: ['./change-button.component.css']
})
export class ChangeButtonComponent implements OnInit {
  @Input() public change: ChangeInitiative;
  faEdit = faEdit;
  faTrash = faTrash;
  delete: boolean;

  constructor(private router: Router, public dialog: MatDialog, private changeDataService: ChangeDataService) { }

  ngOnInit(): void {
  }

  seeSurveys(): void{
    this.router.navigate(['survey/', this.change.id]);
  }

  // tslint:disable-next-line:typedef
  updateChange(){
    this.router.navigate(['update/', this.change.id]);
  }

  // tslint:disable-next-line:typedef
  deleteChange(){
      const dialogRef = this.dialog.open(DeleteChangeComponent, {
        width: '500px',
        data: {delete: this.delete}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.delete = result;
        if (this.delete)
        {
          this.changeDataService.removeChange(this.change.id);
        }
      });
  }
}
