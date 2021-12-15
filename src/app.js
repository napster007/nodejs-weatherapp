const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDir = path.join(__dirname, '../public')
//create new path for template
const viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
//pointitng to the customize the  path for views
app.set('views', viewspath)

hbs.registerPartials(partialPath)

///setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: 'Napster'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: "About",
        name: 'Napster'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Help",
        message: 'THis is a help page',
        name: 'Napster'

    })
})

app.get('/weather', (req, res)=> {
    

    if(!req.query.address){
        return res.send({
            message:"Please provide an address"
        })

    }

    geoCode.geoCode(req.query.address, (error, {latitude, longtitude, location} = {}) =>{

        if(error){
            return res.send({
                error
            })
        }
    
        //console.log('Error: ' + error)
       // console.log('Data: ' + latitude)
        // const adata = JSON.parse(data)
        
        forecast.foreCast(longtitude,latitude, (error, forecastData) =>{
            
            if(error){
                return res.send({
                    error
                })
            }
            
            // console.log('Error: ' + error)
            // console.log('Data: ' + data)

            res.send({
                location:location,
                forecast:forecastData,
                address:req.query.address
            })
          //  console.log(location)
           // console.log(forecastData)
        })
    })


    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        message:'Help Article not Found!'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        message:'Page not Found!'
    })
})
///routing

// app.get('/help', (req, res) =>{
//     res.send({
//         name:'napster',
//         age: 27
//     })
// })

app.get('/array', (req, res) =>{
    res.send([{
        name:'napster',
        age: 27
    },
    {
        name:'jay',
        age: 27
    },
    {
        name:'ola',
        age: 27
    }

    ])
})

// app.get('/about', (req,res) =>{
//     res.send('<h1>About</h1>')
// })




app.listen(port, () => {
    console.log("Server is up in port " + port)
})