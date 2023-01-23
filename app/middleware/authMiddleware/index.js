const admin = require('./firebase-config.js')

class AuthMiddleware {
    async decodeToken(req,res,next) {
        const token = req.headers.authorization || "noToken";
        // console.log(req.headers.authorization);
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if(decodeValue){
                // console.log("decode complete");
                next();
            } else {
                console.log("jwt failed");
                res.sendStatus(401);
            }
        } catch (err) {
            // console.log("caught error!", err);   
            res.json(err)
        }
    }
}

module.exports = new AuthMiddleware();


