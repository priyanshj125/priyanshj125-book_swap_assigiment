import jwt from 'jsonwebtoken';

const JWT_SECRET = 'priyansh123';

const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');
    console.log(token);
  
    if (!token) {
      return res.status(401).json({ error: "Invalid token, please provide a valid one" });
    }
  
    try {
      console.log(token);
      console.log(JWT_SECRET);

      const data =jwt.verify(token,JWT_SECRET,{ algorithm: 'HS384' });
      const id=data.id;
      console.log(req);

      // req.user = data.user;
      req.user = {
        id: data.id,         // Extract the user ID from the payload
        name: data.name,     // Extract the name
        email: data.email    // Extract the email
    };
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Token verification failed" });
    }
  };
  
export default fetchuser;
