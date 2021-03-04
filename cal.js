
//class is created which perform all the oprations of the calculator
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }


  //ths method is used to clear the screen of output
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  //this method is used to delete the single input of the from left side
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }


  //this will append the number side by side
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  //selec the operation like +, -, *, /, %
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }


  //this will coumpute the result
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }


  //this will display number when it will press
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }



  //this will display the updated value once it will calulate the opreation
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//select the buttons and store this in a constant variable
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)



//this will enable the keyboard keys to take input directly to the calculator
document.addEventListener("keypress",function(event){
  if(event.key=='/' || event.key=='+' || event.key=='-' ||event.key=='*')
  {
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  
  let num=parseInt(event.key);
  if(num>=0 && num<=9)
  {
    calculator.appendNumber(num)
    calculator.updateDisplay()
  }
  
  
})
//this will take keyboard input for delete and clear the screen
document.addEventListener("keydown",function(event){
  
  if(event.key=="Backspace"||event.key=="Delete")
  {
    calculator.delete()
  calculator.updateDisplay()
  }

  if(event.key=="Enter")
  {
    calculator.compute()
  calculator.updateDisplay()
  }
})


//this will add numbers to the screen by pressing the number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
  
})

