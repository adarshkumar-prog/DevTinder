const adminAuth = (req, res, next) => {
    console.log("adminAuth is getting checked");
    const token = "abc";
    const isAuthorized = (token === "abc");
    if(!isAuthorized){
        res.status(401).send("Unauthorized User");
    }
    else{
        next();
    }
};
module.exports = { 
    adminAuth, };