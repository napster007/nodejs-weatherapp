console.log("JS Client Side")

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })



// fetch('http://api.weatherstack.com/current?access_key=f1b652536347bbf56c8312b9287ad48f&query=Manila').then((response) =>{

    

//     response.json().then((data) =>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.current)
//     })

// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = searchElement.value
    messageOne.textContent = 'Loading .....'
    messageTwo.textContent = ''
    console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{

    

    response.json().then((data) =>{
        if(data.error){
            //return console.log(data.error)
             messageOne.textContent = data.error
        }else{
            // console.log(data.location)
            // console.log(data.current)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
        
    })

})
})