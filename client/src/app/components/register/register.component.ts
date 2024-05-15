import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fullName = '';
  email = '';
  password = '';
  errorMessage = '';

  ngOnInit(): void {
      
  }

  onSubmit() {
    // Implement your login logic here
    // This example just simulates successful login
    this.fullName = '';
    this.password = '';
    // You might redirect to another page or perform other actions
  }
}
