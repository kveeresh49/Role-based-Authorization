import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stpper',
  templateUrl: './stpper.component.html',
  styleUrls: ['./stpper.component.scss']
})
export class StpperComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  priventFlag :boolean;



  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    //console.log(this.temp.preventFlag,)
  }

  displayCounter(count) {
    this.priventFlag =count;
    console.log(count,'count');
}

}
