import * as express from "express";

import * as paths from "../utils/paths"


/*
 API
 */
let userRouter = require("./api/user");
let photoRouter = require("./api/photo");

let albumRouter = require("./api/album");

/*
 View Controller
 */
let userController = require("./controller/userController");
let mainController = require("./controller/mainController");

//export = (() => {

let router = express.Router();

router.get('/', (req, res, next) => {
    res.send(paths.getView("index.html"))
});
// mount express paths, any addition middleware can be added as well.
// ex. router.use('/pathway', middleware_function, sub-router);

router.use('/api/user', userRouter);
router.use('/api/photo', photoRouter);
router.use('/api/album', albumRouter);


router.use('/user', userController);
router.use('/', mainController);

//return router;
//});

// Export the router
module.exports = router;
