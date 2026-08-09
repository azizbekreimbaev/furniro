import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

dotenv.config();


mongoose.connect(process.env.MONGO_URL as string)
    .then((data) => {
        console.log("Connected to mongodb")
        const PORT = process.env.PORT ?? 3003;
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:3003")
        })
    })
    .catch((err) => console.log("MOngoDB Connection failed"))