import * as express from "express";
import * as Dbi from '../../dbi';
import resp from './../../resp';

let router = express.Router();
let dbi = Dbi.dbi;

router.get('/all', (req, res, next) => {
    dbi.getNUserById(function(response){
        res.json(response);
    });
});

router.get('/', (req, res, next) => {
    if (!req.header("api-key"))
        return res.send(resp.generate([], "User photo", "You must be logged"));
    dbi.isLogged(req.header("api-key"), function(response)
    {

        if (response) {
            dbi.getUserById(req.header("api-key"), function (response) {
                res.send(response);
            });
        }
        else {
            return res.send(resp.generate([], "User photo", "You must be logged"));
        }
    });

});



router.get('/photo/:id', (req, res, next) => {
    if (!req.header("api-key"))
        return res.send(resp.generate([], "User photo", "You must be logged"));
    dbi.isLogged(req.header("api-key"), function(response)
    {
        if (response)
            dbi.getUserPhotoById(req.header("api-key"), function (response) {
                res.json(response);
            });
        else {
            return res.send(resp.generate([], "User photo", "You must be logged"));
        }
    });
});



router.post('/new', (req, res, next) => {
    dbi.insertUser(req, function(reponse){
        console.log(reponse);
        res.json(reponse);
    });
});

router.post('/login', (req, res, next) => {
    dbi.logUser(req, function(reponse){
        console.log(reponse);
        return res.json(reponse);
    });
});

router.post('/update', (req, res, next) => {
    dbi.modifyUser(req, function (response) {
        console.log(response);
        res.json(response);
    })
});

router.post('/logout', (req, res,next)=>{
    req.session.uuid = "";
    return res.send(resp.generate([], "User logout", []));
});
//return for revealing module pattern
module.exports = router;

// export const userRouter: express.Router = router;
