import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule , Router } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CircleComponent } from './circle/circle.component';
import { MessageComponent } from './message/message.component';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { CircleService } from './circle.service';
import { MaterialModule } from './material/material.module';
import {DataSource} from '@angular/cdk/collections';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import 'rxjs/operator/startWith';
import 'rxjs/operator/map';
import 'rxjs/operator/filter';
import 'rxjs/observable/of';
import 'rxjs/operator/startWith';
import 'rxjs/operator/map';
import { CircleActionsComponent } from './circle-actions/circle-actions.component';
import { EditcircleComponent } from './editcircle/editcircle.component';
import { MessageoperationsComponent } from './messageoperations/messageoperations.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CircleComponent,
    MessageComponent,
    CircleActionsComponent,
    EditcircleComponent,
    MessageoperationsComponent,
  ],
  entryComponents: [CircleActionsComponent, EditcircleComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'users',
        component: UserComponent
    },
    {
      path: 'users/:emailId',
      component: UserComponent
  },
    {
      path: 'circles',
      component: CircleComponent
  },
  {
    path: 'circles/:circleName',
    component: CircleComponent
},
  {
    path: 'messages',
    component: MessageComponent
},
{
  path: 'user/messages/:emailId',
  component: MessageComponent
},
{
  path: 'circle/messages/:circleName',
  component: MessageComponent
}
  ])
  ],
  providers: [UserService, MessageService, CircleService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
