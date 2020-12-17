process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const globalAny: any = global

import express, { Application, NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

const app: Application = express();
globalAny.App = app

import configHolder from "./config/dependency-include";
globalAny.configHolder = configHolder

import * as init from "./config/init"
init.init();

import commonRoute from "./config/router/common";
import productsRoute from "./config/router/product";

app.use('/api/v1/common', commonRoute);
app.use('/api/v1/product', productsRoute);

app.get('/', (req, res) => res.status(200).send('Server is running'));

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error ', { error })

    if (error instanceof ValidationError) {
        console.log({error})
        // @ts-ignore
        error = globalAny.views.ErrorView({ status: error.statusCode, message: error.details.body[0].message })
        return res.status(error.status).json(error)
    }

    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    error = globalAny.views.ErrorView({ status, message })
    // error = { status, message }
    return res.status(error.status).json(error)
})
