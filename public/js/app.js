//console.log("Client side js")

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)  => {
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })

    }

)

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',() => {
    console.log('testing')
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = ' Loading...'
    messageTwo.textContent = ''
    //fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        fetch('/weather?address=' + location).then((response) => { 
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                messageOne.textContent = data.location
                console.log(data.forecast)
                messageTwo.textContent = data.forecast
            }
        })
    })
})