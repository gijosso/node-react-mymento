/**
 * Created by Quentin on 23/05/2017.
 */
import * as path from "path";
import * as fs from "fs";

export let root: string = path.dirname(require.main.filename) + "/../..";

export let frontend: string = path.dirname(require.main.filename) + "/../../frontend";

export let publicFile : string =  path.dirname(require.main.filename) + "/../../public";

export function getView(path:String){
    return fs.readFileSync(frontend +"/"+ path, 'utf8');
}