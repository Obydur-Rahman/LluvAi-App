import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    // userAuth should already populate req.user.id
    const userId = req.user?.id || req.body?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const user = await userModel.findById(userId).lean();

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // attach for downstream handlers if needed
    req.user = {
      id: user._id.toString(),
      isAdmin: true,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;
