import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'


dotenv.config();


mongoose.connect(process.env.MONGO_URL as string)
    .then((data) => {
        console.log("Connected to mongodb")
        const PORT = Number(process.env.PORT ?? 3004);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => console.log("MOngoDB Connection failed"))