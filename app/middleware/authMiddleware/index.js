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
            }
        } catch (err) {
            console.log("caught error!", err);
            if(err.codePrefix === 'auth'){
                res.sendStatus(401);
            } else {
                res.status(500).send("firebase auth error!");
            }
        }
    }
}

module.exports = new AuthMiddleware();


