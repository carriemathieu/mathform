import { AbstractControl } from "@angular/forms";
export class MathValidators {
    // only a function of whatever arguments provided as opposed to instance variables on class
    // will not have access to instance variables
    static addition(target:string, sourceOne:string, sourceTwo:string) {
        // calling this function returns a function & gives us the ability to call this validator with arguments (i.e. 'a', 'b', 'answer')
        return (form: AbstractControl) => {
            // const { a, b, answer } = form.value;
            const sum = form.value[target]
            const firstNumber = form.value[sourceOne]
            const secondNumber = form.value[sourceTwo]
            return firstNumber + secondNumber === parseInt(sum) ? null : { addition: true }
        }
        
    }
}

// to make user of validators in other files -- only look at arguments passed in/provided
// with 'static keyword - we no longer have to declare instance of class
// const mathValidators = new MathValidators();
// static:::::: mathValidators.addition();