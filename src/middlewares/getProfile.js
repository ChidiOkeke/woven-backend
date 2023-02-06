import { Errors } from "../utils/errors.js";
import { Profile } from "../models/index.js";
import httpStatus from "http-status";

const auth = async (req, res, next) => {
  try {
    const { profile_id } = req.headers;

    if (!profile_id) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: Errors.UNAUTHORIZED,
      });
    }

    const userProfile = await Profile.findOne({ where: { id: profile_id } });

    if (!userProfile) {
      res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_USER,
      });
    }

    req.user = userProfile;

    console.log(req.user);
    next();
  } catch (error) {
    res.status(httpStatus.FORBIDDEN).json({
      error,
    });
  }
};

export default auth;
