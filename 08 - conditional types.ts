import { promisify as utilPromisify } from 'util'
import { Callback } from './01 - basic types'
import { Dennis } from './03 - json import'
import { Person } from './06 - oop'

type PropertiesOnly<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K]
}
type FunctionsOnly<T> = { [K in keyof T]: T[K] extends Function ? T[K] : never }

type PersonPropertiesOnly = PropertiesOnly<Person>
type PersonFunctionsOnly = FunctionsOnly<Person>

type PromisedFunc<F> = F extends (cb: Callback<infer R>) => void
  ? () => Promise<R>
  : F extends (arg: infer A, cb: Callback<infer R>) => void
    ? (arg: A) => Promise<R>
    : never

declare function getPerson(name: string, cb: Callback<Person>): void

function promisify<F extends Function>(f: F): PromisedFunc<F> {
  return utilPromisify(f) as PromisedFunc<F>
}

const getPersonAsync = promisify(getPerson)

async function getAndPrintDennis() {
  const person = await getPersonAsync(Dennis.lastname)
  console.dir(person)
}
