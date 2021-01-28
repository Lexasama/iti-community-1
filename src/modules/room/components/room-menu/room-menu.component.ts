import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
import * as roomModal from "../room-create-modal/room-create-modal.component";
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less'],
  
})

export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  @ViewChild(roomModal.RoomCreateModalComponent) 
  roomModalComponent : roomModal.RoomCreateModalComponent;

  rooms: Room[];

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomSocketService: RoomSocketService, private router: Router) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    let lastRoomId = window.localStorage.getItem("lastRoom");
    if(lastRoomId) {
      this.goToRoom(this.rooms.find(r => r.id === lastRoomId));
    } else {
      this.goToRoom(this.rooms[0]);

    }
  }

  goToLastRoom() {
    this.queries.getAll().then(all => {
      this.rooms = all;
      this.goToRoom(this.rooms[this.rooms.length - 1]);
    });
  }

  goToRoom(room?: Room) {
    // TODO naviguer vers app/[id de la room]
    if(!room) room = this.rooms[0];
    if(window.localStorage.getItem("lastRoom")) window.localStorage.removeItem("lastRoom");
    window.localStorage.setItem("lastRoom", room.id);
    this.router.navigate(['/', room.id]);
  }

  createRoom() {
    this.roomModalComponent.open()
  }
}
