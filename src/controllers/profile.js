import { Profile } from "../models/index.js";
import { pick } from "../utils/helpers.js";
import httpStatus from "http-status";
import { Errors } from "../utils/errors.js";
import Yup from "yup";

const createProfile = async (req, res) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      profile_type: Yup.string().required(),
      profession: Yup.string().required(),
      balance: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: Errors.VALIDATION_FAILS });
    }

    const body = pick(req.body, [
      "name",
      "profession",
      "profile_type",
      "balance",
    ]);

    if (!body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.VALIDATION_FAILS,
      });
    }

    const result = await Profile.create(body);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NOT_FOUND,
      });
    }

    return res.status(httpStatus.CREATED).json({
      result,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

const getUserProfile = async (req, res) => {
  const userProfile = req.user;
  try {
    return res.status(httpStatus.OK).json({
      userProfile,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};
export { createProfile, getUserProfile };
