const result_el = document.getElementById('result')
const length_el = document.getElementById('length')
const uppercase_el = document.getElementById('uppercase')
const lowercase_el = document.getElementById('lowercase')
const numbers_el = document.getElementById('numbers')
const symbols_el = document.getElementById('symbols')
const generate_el = document.getElementById('generate')
const clipboard_el = document.getElementById('clipboard')


const textEl = document.getElementById('text');
const text = "Password Generator"
let idx = 1
let speed = 400

writeText()

function writeText() {
  textEl.innerText = text.slice(0, idx)

  idx++

  if (idx > text.length) {
      idx = 1
  }

  setTimeout(writeText, speed)
}






const random_func = {
  lower : get_random_lower,
  upper : get_random_upper,
  number : get_random_number,
  symbol : get_random_symbol
}

clipboard_el.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = result_el.innerText

  if(!password) {
    return
  }
  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied!')
})

generate_el.addEventListener('click', () => {
  const length = +length_el.value
  const has_lower = lowercase_el.checked
  const has_upper = uppercase_el.checked
  const has_number = numbers_el.checked
  const has_symbol = symbols_el.checked

  result_el.innerText = generate_password(has_lower, has_upper, has_number, has_symbol, length)

})

function generate_password(lower, upper, number, symbol, length) {
  let generated_password = ''
  const types_count = lower + upper + number + symbol
  const types_array = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

  if(types_count === 0) {
    return ''
  }

  for(let i = 0; i < length; i += types_count) {
      types_array.forEach(type => {
        const func_name = Object.keys(type)[0]
        generated_password += random_func[func_name]()
      })
  }

  const final_password = generated_password.slice(0, length)

  return final_password
}



function get_random_lower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97 )
}

function get_random_upper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65 )
}

function get_random_number() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48 )
}


function get_random_symbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
