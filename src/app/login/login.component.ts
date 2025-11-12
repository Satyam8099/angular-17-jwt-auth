import { Component, OnInit } from '@angular/core';
import { AuthService, LoginRequest, User} from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = '';
   isLoginAlert = false;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().role;
    }
  }

  onSubmit(): void {
    const user: User = this.form;
    user.email = this.form.email;
    this.authService.loginUser(user).subscribe({
      next:(data: User)  => {

        if (data == null) {
          this.errorMessage = "Invalid email or password";
          this.isLoginFailed = true;
          return;
        }
        else{
          data.role ='ADMIN';
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.isLoginAlert = true;
          this.router.navigate(['/dashboard']);
        }
       
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
