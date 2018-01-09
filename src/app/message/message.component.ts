import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Message, CommonMessage } from '../model/message';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { Output } from '@angular/core/src/metadata/directives';
import { EventEmitter } from 'events';
import { Circle } from '../model/circle';
import { FormControl } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,  AfterViewInit {

  @Input()
  commonMessage: CommonMessage;
 users: User[];
  newMessage: string;
  enteredMessage: string;
  message: Message;
  public edited = false;
  successMessage = false;
  public update: string;
  public open = true;
  messageById: Message;
  public updatedId: number;
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<User[]>;
  @ViewChild('myMsg') input: any;
  constructor(private messageService: MessageService, private location: Location, private userService: UserService) {
  }

  sendMyMessage(event) {
    if (event.keyCode === 13) {
      this.newMessage = event.target.value;
      this.enteredMessage = ' ';
      this.message = new Message();
      this.message.message = this.newMessage;
      this.message.circleName = this.commonMessage.circle;
      this.message.receiverEmailId = this.commonMessage.userName;
      this.message.senderEmailId = 'advik@gmail.com';
      this.message.messageText = this.newMessage;
      this.message.sentDate = new Date();
      this.commonMessage.messages.push(this.message);
      this.sendMessages(this.message);
    }
  }
  private sendMessages(message: Message) {
    this.messageService.sendUserMessage(message).subscribe(data => {

      this.enteredMessage = data.json();
    }
    );
    this.enteredMessage = '';
  }
  editMessage(messageId: number) {
    this.edited = true;
    this.updatedId = messageId;
    this.successMessage = true;
    console.log(messageId);
   this.messageService.getMessageByMessageId(messageId).subscribe(data => {
      this.messageById = data.json();
      this.messageById.messageText = this.input.nativeElement.value;
      console.log(this.messageById.messageText + '' + this.input.nativeElement.value);
     this.updateMessage(this.messageById);
    });
  }

 private updateMessage(messageById: Message) {

      this.messageService.updateUserMessage(messageById).subscribe(data => {
       // this.commonMessage = data.json();
       this.messageService.getMessagesByCircleName(messageById.circleName).subscribe(updatedMessage => {
         this.commonMessage.messages = updatedMessage.json();
       });
      });
  }
  deleteMessage(message: Message) {
    this.messageService.deleteUserMessage(message).subscribe(data => {
      this.messageService.getMessagesByCircleName(message.circleName).subscribe(messageData => {
        this.commonMessage.messages = messageData.json();
      });
      console.log(data);
    });
  }
  shareThisMessage() {

    alert('Share My Message');
  }
  cancel() {
    this.edited = false;
  }
  ngOnInit(): void {
   this.userService.getAllUsers().subscribe(data => {
     this.users = data.json();
   });
   this.filteredOptions = this.myControl.valueChanges
   .pipe(
     startWith({} as User),
     map(user => user && typeof user === 'object' ? user.username : user),
     map(name => name ? this.filter(User.name) : this.users.slice())
   );
  }
  filter(name: string): User[] {
    return this.users.filter(user =>
      user.username.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user: User): string {
    return user ? user.username : user.username;
  }
  ngAfterViewInit() {
    }
}
