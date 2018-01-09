import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { Circle } from '../model/circle';
import { CommonMessage } from '../model/message';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CircleService } from '../circle.service';

@Component({
  selector: 'app-circle-actions',
  templateUrl: './circle-actions.component.html',
  styleUrls: ['./circle-actions.component.css']
})
export class CircleActionsComponent implements OnInit {

  circlename: string;
  createdCircle: Circle;

  @Output('myCircle')
  myCircle: EventEmitter<Circle> = new EventEmitter<Circle>();
  @Input()
  commonMessage: CommonMessage;
  @Input()
  circles: Circle[];
  constructor(
    public dialogRef: MatDialogRef<CircleActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , public circleService: CircleService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  saveData(circle: Circle) {
    console.log( this.circlename);
    circle.circleName = this.circlename;
    circle.ownerEmailId = 'advik@gmail.com';
    circle.status = true;
    this.circleService.saveMyCircle(circle).subscribe(data => {
      this.circleService.getAllCircles().subscribe(updatedCircles => {
       this.circles = updatedCircles.json();
      });
    });
    this.onCloseCancel();
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
  ngOnInit() {
  }

}
