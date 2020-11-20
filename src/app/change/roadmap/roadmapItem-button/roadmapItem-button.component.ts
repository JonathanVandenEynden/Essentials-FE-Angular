import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoadmapItem} from '../roadmapitem.model';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import {RoadmapDataService} from '../roadmap-data.service';
import {DeleteRoadmapItemComponent} from '../delete-roadmap-item/delete-roadmap-item.component';



@Component({
  selector: 'app-roadmap-item-button',
  templateUrl: './roadmapItem-button.component.html',
  styleUrls: ['./roadmapItem-button.component.css']
})
export class RoadmapItemButtonComponent implements OnInit {
  @Input() public roadmapItem: RoadmapItem;
  faEdit = faEdit;
  faTrash = faTrash;
  delete: boolean;

  constructor(private router: Router,
              public dialog: MatDialog,
              private roadmapDataService: RoadmapDataService) {
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
    const dialogRef = this.dialog.open(DeleteRoadmapItemComponent, {
      width: '500px',
      data: {delete: this.delete}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.delete = result;
      if (this.delete) {
        this.roadmapDataService.deleteRoadmapItem(this.roadmapItem.id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }
}
