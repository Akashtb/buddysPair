import jwt from "jsonwebtoken";

const checkToken = (role) => {
  return (req, res, next) => {
    // res.json("heyy");
    try {
      const token = req.headers.authorization;
      // console.log("helo");

      if (!token) {
        // console.log("no token");
        return res.status(403).json({ message: " you are not authorized" });
      }
      const ogToken = token.split(" ")[1];
      // console.log("no token");

      const secretkey = process.env.SECRET_KEY;
      // const secretkey = jkbnfjkfgbkjnjhy946357y93y8kqru89034foigfghed;
      const isValid = jwt.verify(ogToken, secretkey);
      if (!role.includes(isValid.role)) {
        // console.log("no token");
        return res.status(403).json({ message: "you are not authorized" });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: "my you are not authorized" });
    }
  };
};

export default checkToken;
