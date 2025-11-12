import { Component, OnInit } from '@angular/core';
import { UserService, User, ImageData } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  

imageBytes: number[] = [];

  images: ImageData[] = [];
  selectedFile?: File;
  content: User = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    password: '',
    age: 0,
    role: 'USER',
    image: [{ id: 0, fileName: '', imageData: '' }]
  };
  isUpdated = false;
  message = '';
  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.content = {
      id: user.id || 0,
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || '',
      password: user.password || '',
      age: user.age || 0,
      role: user.role || 'USER',
      image: user.images?.length ? user.images : [{ fileName: '', imageData: '' }]
    };
    console.log(this.content);
  }

  onEdit(): void {
    debugger;
    const user: User = this.content!;
    this.userService.updateUser(user).subscribe({
      next: data => {
        data.role = 'ADMIN';
        this.storageService.saveUser(data);
        this.isUpdated = true;
        console.log(data);
      },
      error: err => {
        this.message = err.message || 'An error occurred while updating the profile.';
      }
    });
  }
  getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  }

  loadImages() {
    this.userService.getImages().subscribe({
      next: (data) => this.images = data,
      error: (err) => console.error('Error loading images', err)
    });
  }

  onFileSelected1(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    debugger;
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }

    this.userService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        alert('Image uploaded successfully!');
        this.loadImages(); // Reload images after upload
      },
      error: (err) => {
        console.error('Error uploading image', err);
        alert('Upload failed.');
      }
    });
  }

   onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        this.imageBytes = Array.from(bytes);  // Convert to array of numbers
      };

      reader.readAsArrayBuffer(file);
    }
  }
}