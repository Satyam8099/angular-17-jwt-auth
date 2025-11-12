import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: any;
  images = [
    { src: 'assets/s1.png', text: 'Welcome to Screen 1' },
    { src: 'assets/s2.png', text: 'This is Screen 2' },
    { src: 'assets/s3.png', text: 'Explore Screen 3' },
    { src: 'assets/s4.png', text: 'Discover Screen 4' },
    { src: 'assets/s5.png', text: 'Enjoy Screen 5' }
  ];

  currentImage: { src: string, text: string } | undefined;

  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadRandomImage();

    // Reload the page after 45 seconds
    setTimeout(() => {
      window.location.reload();
    }, 40000);
    this.content = this.storageService.getUser();
  }

  loadRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = this.images[randomIndex];
  }

}
