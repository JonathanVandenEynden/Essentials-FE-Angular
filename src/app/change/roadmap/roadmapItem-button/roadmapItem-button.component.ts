import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoadmapItem} from '../roadmapitem.model';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-roadmap-item-button',
  templateUrl: './roadmapItem-button.component.html',
  styleUrls: ['./roadmapItem-button.component.css']
})
export class RoadmapItemButtonComponent implements OnInit {
  @Input() public roadmapItem: RoadmapItem;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  showRoadmapItemDetail(): void {
    this.router.navigate(['roadmapItemDetail/', this.roadmapItem.id]);
  }

  updateRoadmapItem(): void {
    this.router.navigate(['updateRoadmapItem/', this.roadmapItem.id]);
  }

  deleteRoadmapItem(): void {

  }
}
