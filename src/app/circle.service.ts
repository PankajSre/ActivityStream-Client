import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Circle } from './model/circle';
import { UserCircle } from './model/UserCircle';

@Injectable()
export class CircleService {
private headers = new Headers({'Content-Type': 'application/json'});
constructor(private http: Http) { }
getAllCircles() {
  return this.http.get('http://localhost:8888/activityStream/api/circles/get-all-circles');
}
saveMyCircle(circle: Circle) {
  return this.http.post('http://localhost:8888/activityStream/api/circles/create-circle/', circle);
}
saveMyUserCircle(circle: UserCircle) {
  return this.http.post('http://localhost:7070/activityStream/api/circle/add-user-to-circle/', circle);
}
getUsersByCircle(circleName: string) {
  return this.http.get('http://localhost:7070/activityStream/api/circle/users-by-circle/' + circleName);
}
addUserToCircle(circle: UserCircle) {
  return this.http.post('http://localhost:7070/activityStream/api/circle/add-user-to-circle/', circle);
}
removeUserFromCircle(circle: UserCircle) {
  return this.http.post('http://localhost:7070/activityStream/api/circle/remove-user-from-circle/', circle);
}
}
