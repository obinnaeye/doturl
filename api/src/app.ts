export {};

import { Request, Response } from 'express';
const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
import Controller from './controllers/Controller';

var DATABASE_URL: String = process.env.DATABASE_URL || 'http://localhost'
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`mongodb://${DATABASE_URL}/urls`, { useNewUrlParser: true });
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
 }));
 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/urls', (req: Request, res: Response) => {
    Controller.getUrls(req, res)
})

app.post('/shorten', (req: Request, res: Response) => {
    Controller.shortenUrl(req, res)
})
app.get('/shorten', (req: Request, res: Response) => {
    Controller.shortenUrl(req, res)
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
