import * as express from "express";
import * as Dbi from '../../dbi';
import * as paths from "../../utils/paths";
import * as uuid from 'uuid';
import {frontend} from "../../utils/paths";

let router = express.Router();
let dbi = Dbi.dbi;

router.get('/main', (req, res, next) => {
    console.log("logPage");
    console.log(req.session.uuid);
    if (!req.session.uuid)
        res.redirect('/user/logIn');
    else {
        dbi.isLogged(req.session.uuid, function (reponse) {
            if (!reponse) {
                res.redirect('/user/logIn');
            }
            else {
                res.send(paths.getView("main.html"));
            }
        })
    }
});

router.post('/upload', function (req, res) {
    // Uploaded files:

    if (!req.files)
        return res.send("ll");
    let filedata = req.files.filedata as any;
    console.log(filedata.name);
    let extension = filedata.name.split('.').reverse()[0];
    if (extension.match(/\.(jpg|jpeg|png|gif)$/)) {
        return res.status(500).send("Only image files are allowed!");
    }
    let link = 'frontend/public/image/' + uuid.v1();
    console.log(link);

});

//return for revealing module pattern
module.exports = router;
