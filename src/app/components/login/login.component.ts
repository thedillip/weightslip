import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    userName: '',
    password: ''
  }

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    console.log("Form is Submitted.");
    if ((this.credentials.userName != null && this.credentials.userName != '') &&
      (this.credentials.password != null && this.credentials.password != '')) {
      //generate token
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          if (response.data == null) {

          }
          let token = response.data.token;
          this.loginService.loginUser(token);
          window.location.href = '/weightslip';
        },
        error => {
          console.log(error);
          loginForm.reset();
        }
      )
    }

    else if ((this.credentials.userName == null || this.credentials.userName == '') && (this.credentials.password == null || this.credentials.password == '')) {

    }

    else if (this.credentials.userName == null || this.credentials.userName == '') {
      this.openSnackBar("Username is Empty", "Dismiss");
    }
    else if (this.credentials.password == null || this.credentials.password == '') {
      this.openSnackBar("Password is Empty", "Dismiss");
    }
    else {
      this.openSnackBar("Unknown Error Occured !!", "Dismiss");
    }
  }

  openSnackBar(message: String, error: String) {
    console.log(message + " " + error);
  }
}
