const ds = '$'
const defaultAmount = '$0.00'
const bill = document.querySelector('#bill')
const numPeople = document.querySelector('#num-people')
const percentages = document.querySelectorAll('input[name="percentage"]')
const percentageChecked = document.querySelector('input[name="percentage"]:checked')
const customTip = document.querySelector('#custom-tip')

// zero people span
const zeroSpan = document.querySelector('span.people-zero')

// tip amount elements
const total = document.querySelector('.amount.total')
const perPerson = document.querySelector('.amount.per-person')

// reset btn
const resetBtn = document.querySelector('.reset-btn')




percentages.forEach(item => {
  item.addEventListener('change', (e) => {
    // enable reset button
    resetBtn.disabled = false

    // remove custom tip if any percent is selected
    customTip.value = ''

    const numPeople = document.querySelector('#num-people')
    const bill = document.querySelector('#bill')

    // compute tip
    if(!parseInt(numPeople.value) || !bill.value) return
    // if(!bill.value) return

    const tip = computeTip(bill.value, e.target.value, numPeople.value)

    total.textContent = ds + tip.totalTip
    perPerson.textContent = ds + tip.perPersonTip  
  })
})


customTip.addEventListener('input', e => {
  const percentageChecked = document.querySelector('input[name="percentage"]:checked')
  const numPeople = document.querySelector('#num-people')
  const bill = document.querySelector('#bill')

  // enable reset button on input 
  resetBtn.disabled = false

  // unselect radio button if there is custom tip
  if(percentageChecked) percentageChecked.checked = false

  if(e.target.value === '' && !parseInt(numPeople.value) && !bill.value) {
    resetBtn.disabled = true
  }

  // no number of people or bill, stop
  if(!parseInt(numPeople.value) || !bill.value) {
    // resetBtn.disabled = true
    return
  }
  // if(!bill.value) return

  

  // compute tip
  const tip = computeTip(bill.value, e.target.value, numPeople.value)
  total.textContent = ds + tip.totalTip
  perPerson.textContent = ds + tip.perPersonTip  
})


function computeTip(bill, percent, numPeople) {
  return {
    totalTip: (Number(bill) * Number(percent) / 100).toFixed(2),
    perPersonTip: ((Number(bill) * Number(percent) / 100) / Number(numPeople)).toFixed(2)
  }
}


bill.addEventListener('input', (e) => {
  const numPeople = document.querySelector('#num-people')
  const percentageChecked = document.querySelector('input[name="percentage"]:checked')
  const customTip = document.querySelector('#custom-tip')

  console.log('bill', resetBtn.disabled, e.target.value==='')
  // enable reset button
  resetBtn.disabled = false

  if(e.target.value === '' && !parseInt(numPeople.value) && (!percentageChecked && !customTip.value)) {

    console.log('ditp')
    resetBtn.disabled = true
    return perPerson.textContent = total.textContent = ds + '0.00'
  }

  
  // if(!parseInt(numPeople.value)) {
  //   // console.log("people check")
  //   return
  // }
  // if no number of people or tip %, stop
  if(!parseInt(numPeople.value) || (!percentageChecked && !customTip.value)) {
    return
  }
  

  const tip = computeTip(e.target.value, customTip.value || percentageChecked.value, numPeople.value)

  total.textContent = ds + tip.totalTip
  perPerson.textContent = ds + tip.perPersonTip    
  
})



numPeople.addEventListener('input', e => {
  const bill = document.querySelector('#bill')
  const percentageChecked = document.querySelector('input[name="percentage"]:checked')

  // enable reset button
  resetBtn.disabled = false

  // if number of people = 0, show error
  if(e.target.value === '0' ) {
    numPeople.classList.add('is-zero-border')
    return zeroSpan.classList.remove('display-none') 
  } 
  else {
    numPeople.classList.remove('is-zero-border')
    zeroSpan.classList.add('display-none') // dont display error

    // if number of people is empty string
    if(e.target.value === '') {
      console.log('2nd')
      perPerson.textContent = defaultAmount
      if(!bill.value && (!percentageChecked && !customTip.value)) {
        resetBtn.disabled = true
      }
      return
    }

    // if number of people is >0
    // compute tip
    // if no bill or tip %, stop
    if(!bill.value || (!percentageChecked && !customTip.value)) {
      return
    }
    // if(!bill.value) return

    const tip = computeTip(bill.value, customTip.value || percentageChecked.value, e.target.value)

    total.textContent = ds + tip.totalTip
    perPerson.textContent = ds + tip.perPersonTip  
  }
})


resetBtn.addEventListener('click', () => {
  const percentageChecked = document.querySelector('input[name="percentage"]:checked')

  bill.value = ''
  customTip.value = ''
  numPeople.value = ''
  total.textContent = defaultAmount
  perPerson.textContent = defaultAmount
  if(percentageChecked) percentageChecked.checked = false

  resetBtn.disabled = true
})