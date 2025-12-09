import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const bearerToken =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  const token = req.headers.token || bearerToken;

  if (!token) {
    return res.json({ sucess: false, message: "Not Authorized. Login Again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // Expose user info on req for controllers that expect req.user.id
      req.user = { id: tokenDecode.id };

      // Keep existing behavior for handlers reading from req.body.userId
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        sucess: false,
        message: "Not Authorized. Login Again",
      });
    }
    next();
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

export default userAuth;
