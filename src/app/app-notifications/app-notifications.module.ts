import { AsyncPipe, NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { DateFormatterPipe } from "../date-formatter.pipe";
import { AppNotificationsComponent } from "./app-notifications.component";

@NgModule({
    declarations: [
        AppNotificationsComponent,
        NgIf,
        NgForOf,
        AsyncPipe,
        NgStyle,
        NzNotificationService,
        NgClass,
        DateFormatterPipe
    ],
    imports: [
      
    ],
    providers: [],
    bootstrap: []
  })
  export class AppModule { }