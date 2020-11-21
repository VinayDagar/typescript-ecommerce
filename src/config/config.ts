/**
*   @author: Vinay Dagar
*   configuration is define to make connection with the database for the different environment.
*/
import Mongoose from "mongoose"
import dotenv from "dotenv";

const connection = () => {
    dotenv.config();

    const options = {
        useNewUrlParser: true,
        socketTimeoutMS: 10000,
        useUnifiedTopology: true,
    };
    const URL: any = process.env.DB_URL;

    Mongoose.connect(URL, options)

    if (process.env.ENABLE_DB_LOG) {
        Mongoose.set('debug', true)
    }

    const db = Mongoose.connection;

    db.on('error', (err) => {
        console.error(err)
    });

    db.on('open', () => {
        console.info('Database connected!')
    })

    return db;
}

export default connection()