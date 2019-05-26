import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  addressForm: FormGroup;
  @Input() address;
  houseNumberControl: FormControl;
  streetControl: FormControl;
  cityControl: FormControl;
  postcodeControl: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.addressForm = new FormGroup({});
    this.houseNumberControl = new FormControl(null, [Validators.required]);
    this.streetControl = new FormControl(null, []);
    this.cityControl = new FormControl(null, []);
    this.postcodeControl = new FormControl(null, [Validators.required, this.validatePostcode.bind(this)]);

    this.addressForm = new FormGroup({
      houseNumber: this.houseNumberControl,
      street: this.streetControl,
      city: this.cityControl,
      postcode: this.postcodeControl,
    });


    if (this.address) {
      this.houseNumberControl.setValue(this.address.houseNumber);
      this.streetControl.setValue(this.address.street);
      this.cityControl.setValue(this.address.city);
      this.postcodeControl.setValue(this.address.postcode);
    }

    this.addressForm.valueChanges.subscribe((changes) => {
      console.log(changes);
    });
  }

  validatePostcode(postcode) {
    debugger;
    if (typeof postcode.value !== 'number') {
      return {'invalidPostcode': true};
    }
    debugger;
    return null;
  }

}
