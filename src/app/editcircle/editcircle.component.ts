import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { CommonMessage } from '../model/message';
import { UserCircle } from '../model/UserCircle';
import { CircleComponent } from '../circle/circle.component';
import { CircleService } from '../circle.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editcircle',
  templateUrl: './editcircle.component.html',
  styleUrls: ['./editcircle.component.css']
})
export class EditcircleComponent implements OnInit {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  users: User[];
  @Input()
  commonMessage: CommonMessage;
  constructor(private userService: UserService, private circleService: CircleService, public dialogRef: MatDialogRef<EditcircleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  selectedUser: User;
  public selectedUsers: string[] = [];
  public unsubscribedUsers: string[] = [];
  selectedEmail: string;
  public selected: string[];
  public removed: string[];
  userCircle: UserCircle;
  user: User;
  circle: string;
  usersFromCircle: string[];
  onSelect(user: User): void {
    this.selectedUser = user;
  }
  onClick(emailId: string): void {
    this.selectedEmail = emailId;
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.json();
    });
  }
  selectUsers(emailId: string) {
    this.selectedUsers.push(emailId);
    console.log(emailId);
  }
  removeUsers(emailId: string) {
    this.unsubscribedUsers.push(emailId);
    console.log(emailId);
  }
  addUserToCircle(userCircle: UserCircle) {
      console.log(this.circle);
      userCircle.circleName = this.circle;
      for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.usersFromCircle.includes(this.selectedUsers[i])) {
        window.alert('The User  ' + this.selectedUsers[i] + ' is Alerady Exists');
      } else {
        userCircle.subscriberId = this.selectedUsers[i];
         this.circleService.saveMyUserCircle(userCircle).subscribe(data => {
          this.getUsersByCircle(this.circle);
        });
      }
    }
    this.selected = null;
  }
  deleteUserfromCircle(userCircle: UserCircle) {
    userCircle.circleName = this.circle;
    for (let i = 0; i < this.unsubscribedUsers.length; i++) {
      userCircle.subscriberId = this.unsubscribedUsers[i];
       this.circleService.removeUserFromCircle(userCircle).subscribe(data => {
        this.getUsersByCircle(this.circle);
      });
  }
  }
  getUsersByCircle(circleName: string) {
    return this.circleService.getUsersByCircle(circleName).subscribe(data => {
      this.usersFromCircle = data.json();
    });
  }
  addToCircle() {
    this.selected = this.selectedUsers;
  }
  removeFromCircle() {
   this.removed = this.unsubscribedUsers;
   window.alert('Do You really want to unsubscribe!!!');
  }
  ngOnInit() {
    this.getAllUsers();
    console.log(this.data);
    this.usersFromCircle = this.data.name;
    this.circle = this.data.selectedCircle;
  }
  cancel() {
    this.dialogRef.close('closed');
  }
}
