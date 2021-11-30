import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})

// adding [(form: abstractcontrol) => {}] - custom validator for *entire* form
export class EquationComponent implements OnInit {
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [
    (form: AbstractControl) => {
      const { a, b, answer } = form.value;
      return a + b === parseInt(answer) ? null : { addition: true }
    }
  ])
  constructor() { }

  // runs anytime we try to access a property on our class
  // allows us to use "a" instead of "mathForm.value.a" in template
  get a() {
    return this.mathForm.value.a
  }

  get b() {
    return this.mathForm.value.b 
  }

  ngOnInit(): void {
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}
