import {Component, Input, OnInit} from '@angular/core';
import {ChangeInitiative} from '../change.model';

@Component({
  selector: 'app-delete-change',
  templateUrl: './delete-change.component.html',
  styleUrls: ['./delete-change.component.css']
})
export class DeleteChangeComponent implements OnInit {
  @Input() public change: ChangeInitiative;

  constructor() { }

  ngOnInit(): void {
  }

}
