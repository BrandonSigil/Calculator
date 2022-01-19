class Calculator {
    constructor(previousOp,currentOp) {
        this.previousOp = currentOp;
        this.currentOp = previousOp;
        this.clear();
    }

    clear () {
        this.previousOperand = ''
        this.currentOperand = '' 
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOp (operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand!== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute () {
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

            case 'x':
                computation = prev * current
                break
            
            case '/':
            computation = prev / current
            break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOp.innerText = 
        this.getDisplayNumber(this.currentOperand)
        this.previousOp.innerText = this.previousOperand

        if (this.operation != null) {
            this.previousOp.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const acButton = document.querySelector('[data-ac]');
const currentOp = document.querySelector('[data-currentOp]');
const previousOp = document.querySelector('[data-previousOp]');

const calculator = new Calculator(currentOp, previousOp);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})