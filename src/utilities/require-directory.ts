import { dir } from "console";
import requireDirectory from "require-directory";
import s from "underscore.string";

export default function (base: any, directory: string) {
    const dirs: any =  requireDirectory(base, directory, {
        extensions: ['ts'],
        rename: (name) => s.camelize(name),
    })
    const dirKeys = Object.keys(dirs)
    const ob: any = {}
    for(const k of dirKeys) {
        ob[k] = dirs[k]
    }

    return ob
}
