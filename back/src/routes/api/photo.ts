import * as express from "express";
import * as Dbi from '../../dbi';
import resp from './../../resp';
import * as uuid from 'uuid';
import {defaultCoreCipherList} from "constants";

let router = express.Router();
let dbi = Dbi.dbi;

router.get('/', (req, res, next) => {
    res.json({
        message: 'photo',
    });
});


router.get('/:id', (req, res, next) => {
    if (!req.headers['api-key']) {
        console.log('fail');
        return res.send(resp.generate([], "User photo", "You must be logged"));
    }
    dbi.isLogged(req.headers["api-key"], function (response) {
        if (response) {
            console.log('OK');
            dbi.getPhotoById(req.params.id, function (response) {
                console.log(response);
                res.json(response);
            });
        }
        else {
            return res.send(resp.generate([], "You must be logged", []));
        }
    });
});

router.get('/get/random', (req, res, next) => {
    dbi.getRandPhotoById(function (response) {
        console.log(response);
        res.json(response);
    });

});


router.post('/new', (req, res, next) => {
    console.log('new');
    if (!req.header("api-key")) {
        console.log("1");
        return res.send(resp.generate([], "User photo", "You must be logged"));
    }
    if (!req.files || !req.body.visibility || !req.body.country || !req.body.city)
        return res.send(resp.generate([], "User photo", "All fields are required"));
    let filedata = req.files.photo as any;
    let extension = filedata.name.split('.').reverse()[0];
    if (!(filedata.mimetype.split('/')[0] == 'image' || extension.match(/\.(jpg|jpeg|png|gif)$/))) {
        console.log('here');
        return res.send(resp.generate([], "User photo", "Only image are authorized"));
    }
    let filename = uuid.v1();
    let link = 'public/images/' + filename;
    let publicLink = 'http://localhost:6969/images/' + filename;
    console.log(link);
    dbi.getUserId(req.header("api-key"), function (result) {
        if (result) {
            filedata.mv(link, function (err) {
                if (err)
                    return res.send(err);
                dbi.insertPhoto(req.body.name, result, publicLink, req.body.visibility,
                    req.body.country, req.body.city, function (result) {
                        console.log(result);
                        return res.send(result);
                    });
            });
        }
        else {
            console.log('tesst');
            return res.send(resp.generate([], "User photo", "You must be logged"));
        }

    });

});

router.delete('/delete/:id', (req, res, next) => {
    dbi.deletePhoto(req.params.id, function (response) {
        res.json(response);
    });
});


module.exports = router;
