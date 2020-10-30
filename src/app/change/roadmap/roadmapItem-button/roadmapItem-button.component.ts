import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoadmapItem} from '../roadmapitem.model';

@Component({
  selector: 'app-survey-button',
  templateUrl: './roadmapItem-button.component.html',
  styleUrls: ['./roadmapItem-button.component.css']
})
export class RoadmapItemButtonComponent implements OnInit {
  @Input() public roadmap: RoadmapItem;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showRoadmapItemDetail(): void {
    this.router.navigate(['roadmapItemDetail/', this.roadmap.id]);
  }

}
