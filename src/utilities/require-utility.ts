import requireDirectory from "require-directory";
import _ from "underscore.string";

export default (base: any, directory: any) => {
    return requireDirectory(base, directory, {
        rename: (name: any) => _.camelize(name)
    })
}
