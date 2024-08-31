import jwt from 'jsonwebtoken';

const JWT_SECRET = 'priyansh123';

const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');
    // console.log(token);
  
    if (!token) {
      return res.status(401).json({ error: "Invalid token, please provide a valid one" });
    }
  
    try {
   

      const data =jwt.verify(token,JWT_SECRET,{ algorithm: 'HS384' });
      const id=data.id;

      req.user = data.user;
      console.log(data);
      req.user = {
        id: data.user.id,         // Extract the user ID from the payload
       
    };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Token verification failed" });
    }
  };
  
export default fetchuser;