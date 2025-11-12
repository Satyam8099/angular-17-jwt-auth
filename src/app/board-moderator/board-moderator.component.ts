import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {
  content?: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    debugger;
    this.userService.getPublicContent().subscribe({
      next: user => {
        this.content = user.address;
        
      },
      error: err => {
        if (err.error) {
          try {
            console.log("Error details:", err);
            console.log("Error details:", err.error);
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
              console.log("Error details:", err);
            console.log("Error details:", err.error);
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
