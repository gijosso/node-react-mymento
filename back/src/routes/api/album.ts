import * as express from "express";
import * as Dbi from '../../dbi';
import resp from './../../resp';

let router = express.Router();
let dbi = Dbi.dbi;

router.get('/:id', (req, res, next) => {
    dbi.getAlbumPhotoById(req.params.id, req.headers["api-key"], function (response) {
        console.log(response);
        return res.json(response);
    });

});

router.get('/user/:id', (req, res, next) => {
    dbi.getAlbumByUserId(req.params.id, function (response) {
        res.json(response);
    });
});

router.get('/photos/:id', (req, res, next) => {
    dbi.getAlbumByAlbumId(req.params.id, function (response) {
        res.json(response);
    });
});

router.post('/new', (req, res, next) => {
    if (!req.headers['api-key']) {
        console.log('fail');
        return res.send(resp.generate([], "Album adding", "You must be logged"));
    }
    dbi.isLogged(req.headers["api-key"], function (response) {
        if (response && req.body.name) {
            console.log(req.body.id);
            dbi.insertNewAlbum(req.body.id, req.body.name, function (response) {
                return res.json(response);
            });
        }
        else {
            return res.send(resp.generate([], "You must be logged", []));
        }
    });

});


router.post('/addPic', (req, res, next) => {
    if (!req.headers['api-key']) {
        console.log('fail');
        return res.send(resp.generate([], "User photo", "You must be logged"));
    }
    dbi.isLogged(req.headers["api-key"], function (response) {
        if (response) {
            dbi.insertPhotoAlbum(req.body.albumid, req.body.link, function (response) {
                console.log(response);
                return res.json(response);
            });
        }
        else {
            return res.send(resp.generate([], "You must be logged", []));
        }
    });

});


module.exports = router;
