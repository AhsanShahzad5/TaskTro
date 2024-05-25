//import the module for connection
// const connectToMongo = require('./Db');
// connectToMongo()


//express 
const port = 5000
const express = require('express')
const app = express()
app.use(express.json())

//cors
const cors = require('cors');
app.use(cors());

/* 
//available routes. app.use is for middlewar work
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

 */

//general
app.get('/', (req, res) => {
  res.send('Hello Ahsan')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})