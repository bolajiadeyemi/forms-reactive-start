import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsername = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]) ,// takes in three args, the  default value, validator and async validator,
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    const control = new FormControl(null, [Validators.required]);
    //casting to formarray so that i can push new control to the form array
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  forbiddenNames = (control: FormControl): { [s: string]: boolean}  => { // { nameIsForbidden: true}
  if(this.forbiddenNames.indexOf(control.value) !== -1){
    return { 'nameIsForbidden': true };
  }

  return { nameIsForbidden: null }

  }
}
