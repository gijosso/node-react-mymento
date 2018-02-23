import * as express from "express";
import * as Dbi from '../../dbi';
import * as paths from "../../utils/paths";

let router = express.Router();
let dbi = Dbi.dbi;

router.get('/logIn', (req, res, next) => {

    res.send(paths.getView("login.html"))
});

router.post('/logIn', (req, res, next) => {
    dbi.logUser(req, function (response) {
            res.redirect('/main');
    })
});

router.post('/update', (req, res, next) => {
    dbi.modifyUser(req, function (response) {
    })
});

router.get('/signIn', (req, res, next) => {
    res.send(paths.getView("signin.html"))

});

router.post('/signIn', (req, res, next) => {
    dbi.insertUser(req, function(reponse){

    });
    res.send(paths.getView("signin.html"))
});

router.post('/disconnect', (req, res,next)=>{
   req.session.uuid = "";
   res.redirect('/');
});


//return for revealing module pattern
module.exports = router;
