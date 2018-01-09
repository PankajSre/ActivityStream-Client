import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserCircle } from './model/UserCircle';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getAllUsers() {
    return this.http.get('http://localhost:9999/activityStream/api/user/getAllUsers');
  }
  addUserToCircle(userCircle: UserCircle) {
    return this.http.post('http://localhost:7070/activityStream/api/circle/add-user-to-circle/', userCircle);
  }
  getUsersFromCircle(circleName: string) {
    return this.http.get('http://localhost:7070/activityStream/api/circle/users-by-circle/' + circleName);
  }
  /*
  getAllCircles() {
    return this.http.get('http://localhost:8888/activityStream/api/circles/get-all-circles');
  }
  getAllMessages() {
    return this.http.get('http://localhost:8888/activityStream/api/circles/get-all-circles');
  }
*/
}
