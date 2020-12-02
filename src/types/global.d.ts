import mongoose from "mongoose";
import { Application } from "express";

declare global {
    namespace NodeJS {
        interface Global {
            ObjectId: any;
            MongooseConnect: any;
            configHolder: object;
            domain: object;
            MongooseSchema: any;
            App: Application;
            views: object;
            module: NodeModule;
            Joi: any;
            Validation: any;
            middleware: object;
        }
    }
}
