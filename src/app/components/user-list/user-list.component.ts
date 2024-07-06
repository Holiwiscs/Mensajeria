import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent  implements OnInit {
  matches: any[] = [];
  
  constructor(private dataBase: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.loadMatches();
  }

  async loadMatches() {
    this.dataBase.getMatchesForUser(await this.dataBase.getUid()).subscribe(matches => {
      this.matches = matches;
    });
  }

  openChat(match: any) {
    this.router.navigateByUrl(`/chat/${match.chatId}`);
  }
}
