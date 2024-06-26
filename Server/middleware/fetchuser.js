let jwt = require('jsonwebtoken');

//as written in auth file

const JWT_SECRET = "TaskTro jwt secret"

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded user data:", data);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;