import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';
import { User } from '../model/user';
import { Message, CommonMessage } from '../model/message';
import { Circle } from '../model/circle';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { MessageService } from '../message.service';
import { CircleService } from '../circle.service';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 title = 'User Details';
   @Input()
   users: User[];
   messages: Message[];
   userMessage: CommonMessage;
   @Output()
   commonMessage: EventEmitter<CommonMessage> = new EventEmitter<CommonMessage>();
  constructor(private userService: UserService,
    private messageService: MessageService,
    private circleService: CircleService, private route: ActivatedRoute) {
 }
 selectedUser: User;
 onSelect(user: User): void {
   this.selectedUser = user;
 }
 getMessagesByUser(username: string) {
  return  this.messageService.getMessagesByUsername(username).subscribe(data => {
      this.messages = data.json();
      this.userMessage = new CommonMessage();
      this.userMessage.userName = username;
      this.userMessage.messages = this.messages;
      this.commonMessage.emit(this.userMessage);
    });
}
ngOnInit() {
}
}
