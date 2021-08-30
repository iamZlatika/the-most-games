import {compareOld, compareNew} from './task-2.mjs'

const GREEN = "\x1b[32m"
const RED = "\x1b[31m"
const DEFAULT = "\x1b[0m"

let fails = 0;

const assertEqual = (msg, first, second) => {
    const firstJson = JSON.stringify(first)
    const secondJson = JSON.stringify(second)
    const success = firstJson === secondJson
    if (success) {
        console.log("✅", DEFAULT, msg, ":", GREEN, "OK")
    } else {
        fails++;
        console.log("❌", DEFAULT, msg, ":",  RED, "FAIL")
    }
    
}

// assertEqual("This should fail", 1, 2)
// assertEqual("This should pass", 1, 1)

{
    const ru = ['asd', '123']
    const en = ['|ivc', 'a|b']
    assertEqual("Test 1", compareNew(ru, en), compareOld(ru, en))
}

{
    const ru = ['123']
    const en = ['a|b']
    assertEqual("Test 2", compareNew(ru, en), compareOld(ru, en))
}

console.log(fails ? RED + `You have ${fails} failed test(s)!` : GREEN + "All tests pass!")