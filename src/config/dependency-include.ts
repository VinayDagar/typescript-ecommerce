/**
 * @author Vinay Dagar
 * Requirement - include all the global variables and module required by the application
 * 
 */

import connection from "./config";
import mongoose from "mongoose";
const globalAny: any = global

globalAny.MongooseConnect = connection;
globalAny.MongooseSchema = mongoose.Schema;
globalAny.ObjectId = mongoose.Schema.Types.ObjectId;


import Views from "../app/views";
globalAny.views = Views;

import requireDirectory from "../utilities/require-directory";
import encryptUtility from "../utilities/encryption-utility";
import jwtUtility from "../utilities/jwt-utility";

globalAny.configHolder = {
    requireDirectory,
    encryptUtility,
    jwtUtility
}

import domain from "../app/models";
globalAny.domain = domain;

import Joi from "joi";
globalAny.Joi = Joi;

import Validate from "express-validator";
globalAny.Validation = Validate;

import middleware from "../middleware";
globalAny.middleware = middleware;

export default globalAny.configHolder;
