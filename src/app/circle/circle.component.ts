import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { Circle } from '../model/circle';
import { Message, CommonMessage } from '../model/message';
import { CircleService } from '../circle.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppComponent } from '../app.component';
import { CircleActionsComponent } from '../circle-actions/circle-actions.component';
import { EditcircleComponent } from '../editcircle/editcircle.component';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css', '../message/message.component.css']
})
export class CircleComponent implements OnInit {
  show = false;
  commonMessageTemp: CommonMessage;
  @Input()
  circles: Circle[];
  @Input()
  myCircle: string;
  circleMessages: Message[];
  selectedCircle: Circle;
  crearedCircle: Circle;
  usersIncircle: string[];
  circlename: string;
  @Output('commonMessage')
  commonMessage: EventEmitter<CommonMessage> = new EventEmitter<CommonMessage>();
  constructor(private circleService: CircleService,
    private location: Location, private route: ActivatedRoute, private messageService: MessageService, public dialog: MatDialog) {
    }
  onSelect(circle: Circle): void {
    this.selectedCircle = circle;
  }
  getMessagesByCircle(circleName: string) {
    return this.messageService.getMessagesByCircleName(circleName).subscribe(data => {
      this.circleMessages = data.json();
      this.commonMessageTemp = new CommonMessage();
      this.commonMessageTemp.circle = circleName;
      this.circlename = circleName;
      this.commonMessageTemp.messages = this.circleMessages;
      this.commonMessage.emit(this.commonMessageTemp);
      this.circleService.getUsersByCircle(circleName).subscribe(userData => {
      this.usersIncircle = userData.json();
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CircleActionsComponent, {
      width: '300px', height: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.circlename = result;
      console.log(this.circlename);
    });
  }

  addUserToCircle(): void {
    const dialogRef = this.dialog.open(EditcircleComponent, {
      width: '500px', height: '450px',
      data: { name: this.usersIncircle, selectedCircle: this.circlename}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.circlename = result;
      console.log('The dialog was closed....');
    });
  }
  ngOnInit() {
  }
}
