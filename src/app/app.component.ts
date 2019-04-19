import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]) ,// takes in three args, the  default value, validator and async validator,
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
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
   if(this.forbiddenUsernames.indexOf(control.value) !== -1){
    return { 'nameIsForbidden': true };
  } 

  return  null 

  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else {
          resolve(null);
        }
      }, 1500)
    });
    return promise;
  }
}
