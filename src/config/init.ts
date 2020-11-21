import express from "express"
import bodyParser from "body-parser";
import helmet from "helmet";
import hpp from "hpp";
import path from "path";
// const cors = require('cors');
const globalAny: any = global

globalAny.App.use(express.json());
globalAny.App.use(express.urlencoded({ extended: false }));
globalAny.App.use(express.static(path.join(__dirname, 'public')));
globalAny.App.use(bodyParser.json({ limit: '100mb' }));
globalAny.App.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
globalAny.App.use(helmet())
globalAny.App.use(hpp())
// globalAny.app.use(cors())

export const init = () => {
    console.log("process.env.PORTprocess.env.PORT", process.env.PORT)
    globalAny.App.listen(process.env.PORT, () => {
        console.info(`Express server starting at port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    })
}
