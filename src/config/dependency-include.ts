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

import requireUtility from "../utilities/require-utility";
import domain from "../app/models";

globalAny.domain = domain;
const configHolder = {
    requireUtility,
}

export default configHolder