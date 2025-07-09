const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

// login , signup routes 
app.use('/api/auth', authRoutes);
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// connect to MongoDB server 
const startServer = async ()=>{
  console.log('MONGO_URI:', process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running at PORT ${PORT}`)
    })
  } catch (error) {
    console.log('Not connected to MongoDB',error.message)
    process.exit(1)
  }
}

startServer()

