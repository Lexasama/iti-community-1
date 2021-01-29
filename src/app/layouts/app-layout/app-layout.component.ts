import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppNotificationsComponent } from 'src/app/app-notifications/app-notifications.component';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { UserWidgetComponent } from 'src/modules/user/components/user-widget/user-widget.component';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  sub?: Subscription;
  @ViewChild(AppNotificationsComponent)
  notifScreen: AppNotificationsComponent

  showDrawer: boolean = false;
  constructor(private socket: WebsocketConnection, private authStore: AuthenticationStore) {
  }

  ngOnInit(): void {
    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  async onToggleNotifications() {
    await this.notifScreen.toogleNotifications()
  }
}
