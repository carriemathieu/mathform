import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators'
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})

// adding [(form: abstractcontrol) => {}] - custom validator for *entire* form
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [
    MathValidators.addition('answer','a', 'b')
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
    // status changes emits a value saying whether or not form is valid
    this.mathForm.statusChanges.pipe(
      // only continue rest of pipe if value is valid
      filter(value => value === 'VALID'),
      // allows answer to be shown before resetting form (100ms)
      delay(100),
      scan((acc) => {
        return {
          // adds 1 to number solved
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }
      }, {numberSolved: 0, startTime: new Date() })
      ).subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution = (
          // gives ms value -- total elapsed time
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000; // divide by 1000 to convert to ms 

        // this.mathForm.controls.a.setValue(this.randomNumber())
        // this.mathForm.controls.b.setValue(this.randomNumber())
        // this.mathForm.controls.answer.setValue('')
        // setValue = UPDATE ALL FORM VALUES, patchValue = UPDATE ONLY PART OF FORM
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
      })
    })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}
