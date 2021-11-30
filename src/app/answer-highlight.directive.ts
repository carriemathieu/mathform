import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map } from 'rxjs/operators'

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el: ElementRef, private controlName: NgControl) { 

  }

  ngOnInit() {
    this.controlName.control?.parent?.valueChanges.pipe(
      // determines how far answer is from correct answer. Math.abs will turn neg into positive if needed
      map(({ a, b, answer }) => Math.abs((a + b - answer)/(a + b)))
    ).subscribe(value => {
      if (value < 0.2) {
        this.el.nativeElement.classList.add('close')
      } else {
        this.el.nativeElement.classList.remove('close')
      }
    })
  }

}
