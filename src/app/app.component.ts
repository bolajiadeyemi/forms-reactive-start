import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null) ,// takes in three args, the  default value, validator and async validator,
      'email': new FormControl(null),
      'gender': new FormControl('male')
    })
  }
}
