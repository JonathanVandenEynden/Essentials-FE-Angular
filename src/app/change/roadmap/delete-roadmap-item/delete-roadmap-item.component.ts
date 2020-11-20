import {Component, Input, OnInit} from '@angular/core';
import {ChangeInitiative} from '../../change.model';
import {RoadmapItem} from '../roadmapitem.model';

@Component({
  selector: 'app-delete-roadmap-item',
  templateUrl: './delete-roadmap-item.component.html',
  styleUrls: ['./delete-roadmap-item.component.css']
})
export class DeleteRoadmapItemComponent implements OnInit {
  @Input() public roadmapItem: RoadmapItem;
  constructor() { }

  ngOnInit(): void {
  }

}
