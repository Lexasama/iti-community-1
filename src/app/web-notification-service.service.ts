import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationServiceService {

  constructor() { }

  public notificationsAllowed() : boolean {
    return window.Notification && Notification.permission !== "granted";
  }

  public requestPermission() : Promise<boolean> {
    let notif = new Promise<boolean>((resolve, reject) => {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          return resolve(true);
        }
      });
    });
    return notif;
  }
}
