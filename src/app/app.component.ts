import { Component, Input, OnInit } from '@angular/core';
import { Message, CommonMessage } from './model/message';
import { User } from './model/user';
import { Circle } from './model/circle';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { CircleService } from './circle.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Details';
  users: User[];
  circles: Circle[];
  location: Location;
  clickedCircle: string;
 commonMessage: CommonMessage;
 constructor(private userService: UserService,
   private messageService: MessageService,
   private circleService: CircleService, private route: ActivatedRoute) {
}

getAllUsers() {
  this.userService.getAllUsers().subscribe(data => {
    this.users = data.json();
  });
}
getAllCircles() {
  this.circleService.getAllCircles().subscribe(data => {
    this.circles = data.json();
  });
}

getMessagesByUser(userMessage: CommonMessage) {
  this.commonMessage = userMessage;
}

getMessagesByCircle(circleMessage: CommonMessage) {
  this.commonMessage = circleMessage;
}

ngOnInit() {
 this.getAllUsers();
 this.getAllCircles();
}
}
