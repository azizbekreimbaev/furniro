import express from 'express'
import path from 'path'
import router from './router'
import routerAdmin from './router-admin'

const app = express()

// KIRISH CODE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// SESSION


// VIEWS
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');


// Routers
app.use("/admin", routerAdmin)
app.use("/", router)

export default app;