import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Message } from './model/message';

@Injectable()
export class MessageService {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }
  getAllMessages() {
    return this.http.get('http://localhost:8888/activityStream/api/circles/getUserMessages');
  }

  getMessagesByCircleName(circleName: string) {
    return this.http.get('http://localhost:6060/activityStream//api/userMessage/getAllMessagesByCircleName/' + circleName);
  }
  getMessagesByUsername(emailId: string) {
    return this.http.get('http://localhost:6060/activityStream/api/userMessage/getUserMessages/' + emailId + '.com');
  }
  sendUserMessage(message: Message) {
    return this.http.post('http://localhost:6060/activityStream/api/userMessage/sendUserMessage/', message);
  }
  deleteUserMessage(message: Message) {
    return this.http.post('http://localhost:6060/activityStream/api/userMessage/deleteUserMessage/', message);
  }
  updateUserMessage(message: Message) {
     return this.http.post('http://localhost:6060/activityStream/api/userMessage/updateMessage/', message);
  }
  getMessageByMessageId(messageId: number) {
    return this.http.get('http://localhost:6060/activityStream/api/userMessage/userMessageById/' + messageId);
  }
}
