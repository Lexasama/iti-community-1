import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { User } from 'src/modules/user/user.model';
import * as notifs from "../../../modules/notification/notification.model";
import * as ng from 'ng-zorro-antd/notification';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';
import { WebNotificationServiceService as WebNotificationService } from '../../web-notification-service.service';
import { Router } from '@angular/router';
import { PostQueries } from 'src/modules/feed/services/post.queries';
import { PostService } from 'src/modules/feed/services/post.service';
import { RoomStore } from 'src/modules/room/room.store';
import { RoomQueries } from 'src/modules/room/services/room.queries';

@Component({
  selector: 'app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.less']
})
export class AppNotificationsComponent implements OnInit {
  @Input()
  user: User
  public isOpened$ = false
  private isVisible = true
  private notifications$: Observable<any[]>;
  constructor(private notificationStore: NotificationStore, private notificationService: NotificationService, private notif: ng.NzNotificationService, 
    notifSocket : NotificationSocketService, webNotif: WebNotificationService, private router: Router, private post: RoomQueries) { 

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === 'visible') {
          this.isVisible = true;
        } else {
          this.isVisible = false;
        }
      });
      
    this.notifications$ = this.notificationStore.get(n => n.notifications)
    notifSocket.onNewNotification(n => {
      this.notifications$ = this.notificationStore.get(n => n.notifications);
      if(n.subject === 'new_user') {
        this.notif.blank(n.payload.user.username, " has joined")
        
        if(!this.isVisible) new Notification(n.payload.user.username + " has joined.")
        
      } else if (n.subject === 'post_liked'){
        this.notif.blank(n.payload.user.username, "Posted something new")
        if(!this.isVisible) {
          let notifWeb = new Notification(n.payload.user.username + " liked your post.");
          
          
        }

      } else if (n.subject === 'room_added') {
        this.notif.blank(n.payload.room.name, "Has been created")
        if(!this.isVisible) {
          let notifWeb = new Notification(n.payload.room.name + " has been created.")
          notifWeb.onclick = (ev) => {
            this.router.navigate(['/', n.payload.room.id])
          }
        }
      }
    })

    this.notifications$.subscribe(n => n.reverse())

    if(webNotif.notificationsAllowed()) {
      webNotif.requestPermission().then(r => {
        console.log(r);
      })
    }
  }

  ngOnInit(): void {
  }


  public async toogleNotifications() {
    this.isOpened$ = !this.isOpened$;
    if(this.isOpened$) {
      await this.notificationService.fetch();
      this.notifications$ = this.notificationStore.get(n => n.notifications)
    } else {
      await this.notificationService.markAsViewed();
    }
  }

}
