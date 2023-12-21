import jwt from "jsonwebtoken"
export const validateUser = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(403).json({error:"Silahkan Login Terlebih Dahulu"});
    try {
        jwt.verify(token, process.env.USER_SECRET);
    } catch (error) {
        return res.status(401).json({error:"Anda tidak memiliki hak untuk mengakses halaman ini"});;
    }
    const users = jwt.decode(token);
    req.users = users;
    next();
}
export const validateAdmin = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(403).json({error:"Silahkan Login Terlebih Dahulu"});
    try {
        jwt.verify(token, process.env.ADMIN_SECRET);
    } catch (error) {
        return res.status(401).json({error:"Anda tidak memiliki hak untuk mengakses halaman ini"});;
    }
    const users = jwt.decode(token);
    req.users = users;
    next();
}
export const validateLogin = (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) return res.status(403).json({error:"Silahkan Login Terlebih Dahulu"});
    try {
        jwt.verify(token, process.env.ADMIN_SECRET);
    } catch (error) {
        try {
            jwt.verify(token, process.env.USER_SECRET);
        } catch (error) {
            return res.status(401).json({error:"Anda tidak memiliki hak untuk mengakses halaman ini"});;
        }
    }
    const users = jwt.decode(token);
    req.users = users;
    next();
}

export const getUser = (req,res)=>{
    const token = req.cookies.token;
    if (!token) return res.status(403).json({error:"Silahkan Login Terlebih Dahulu"});
    try {
        jwt.verify(token, process.env.ADMIN_SECRET);
    } catch (error) {
        try {
            jwt.verify(token, process.env.USER_SECRET);
        } catch (error) {
            return res.status(403).json({error:"Anda tidak memiliki hak untuk mengakses halaman ini"});;
        }
    }
    const users = jwt.decode(token);
    res.json(users)
}