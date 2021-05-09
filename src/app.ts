import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { v4 as uuid } from "uuid";

const app: Application = express();
let keys: string[] = []

const options: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: process.env.API_URL || 'localhost',
    preflightContinue: false,
    credentials: true
}

app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500)
    res.send('Error Occured!\nPlease try again later')
})

app.use(express.static(path.resolve(__dirname, '../public')))
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

app.get('/nextpage', (req: Request, res: Response) => {
    const key = uuid();
    keys.push(key);
    res.redirect(`http://localhost:5069/nextpage.html?token=${key}`);
})

app.post('/check', (req: Request, res: Response) => {
    const key = req.body.key;
    if (!key) {
        res.status(500).send("oh oh stinky");
        return
    }

    if (keys.some((item) => key === item)) {
        keys.splice(keys.indexOf(key), 1)
        res.status(200).send("woo hoo")
    }

    else res.status(500).send("oh oh stinky");
})



export default app;