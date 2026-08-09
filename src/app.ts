import express from 'express'
import path from 'path'
const app = express()

// KIRISH CODE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// SESSION


// VIEWS
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');


// APIs routers


export default app;