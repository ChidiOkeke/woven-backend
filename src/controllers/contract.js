import Contract from "../models/contract.js";
import httpStatus from "http-status";
import { Errors } from "../utils/errors.js";
import { pick } from "../utils/helpers.js";
import Yup from "yup";
import { Op } from "sequelize";

const getContract = async (req, res) => {
  const paramsId = req.params.id;
  const userProfile = req.user;

  try {
    if (!paramsId) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: Errors.VALIDATION_FAILS });
    }

    const userContract = await Contract.findOne({ where: { id: paramsId } });

    if (userContract.client_id !== userProfile.id && userContract.contractor_id !== userProfile.id) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: Errors.UNAUTHORIZED });
    }

    return res.status(httpStatus.OK).json({
        userContract,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

const getContracts = async (req, res) => {

    const userProfile = req.user;
    console.log(userProfile);
  
    try {
        
      const userContracts = await Contract.findAndCountAll({where: {status: ["new", "in_progress"], [Op.or]: [{ client_id: userProfile.id }, { contractor_id: userProfile.id }]}})
        
      return res.status(httpStatus.OK).json({
          userContracts,
      });
    } catch (error) {
        console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error,
      });
    }
  };

const createContract = async (req, res) => {
  try {
    const body = pick(req.body, ["status", "client_id", "contractor_id"]);

    if (!body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.VALIDATION_FAILS,
      });
    }

    const result = await Contract.create(body);

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
export { getContract, createContract, getContracts };
