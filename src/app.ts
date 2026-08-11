import express from 'express'
import path from 'path'
import router from './router'
import routerAdmin from './router-admin'
import connectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const MongoDBStore = connectMongoDBSession(session)

const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: 'sessions'
});




// KIRISH CODE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// SESSION
app.use(session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

// VIEWS
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');


// Routers
app.use("/admin", routerAdmin)
app.use("/", router)

export default app;