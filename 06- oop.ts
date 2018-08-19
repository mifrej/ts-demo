import { IHaveAJob, IHaveNames, Job, Name } from './01 - basic types'

// traditional OOP class
export class Person implements IHaveNames {
  constructor(public firstname: Name, public lastname: Name) {}

  greet(other: Person) {
    console.log(
      `Hi, ${other.firstname}. My name is ${this.firstname} ${this.lastname}.`
    )
  }
}

export class Employee<T extends Job> extends Person implements IHaveAJob<T> {
  constructor(public firstname: Name, public lastname: Name, public job: T) {
    super(firstname, lastname)
  }

  // overriden method
  greet(other: Person) {
    super.greet(other)
    console.log(`I'm a ${this.job}`)
  }
}

// inheritance
class Developer extends Employee<'Software Developer'> {
  constructor(firstname: Name, lastname: Name) {
    super(firstname, lastname, 'Software Developer')
  }
}

class RocketScientist extends Employee<'Rocket Scientist'> {
  constructor(firstname: Name, lastname: Name) {
    super(firstname, lastname, 'Rocket Scientist')
  }
}

// instantiation
const Dennis = new Developer('Dennis', 'Nedry')
const Mary = new RocketScientist('Mary', 'Sherman Morgan')

Mary.greet(Dennis)

// anonymous class
const Counter = new class {
  count: number = 0

  increment() {
    this.count = this.count++
  }

  decrement() {
    this.count = this.count--
  }
}()

console.log(Counter.count)
Counter.increment()
console.log(Counter.count)
