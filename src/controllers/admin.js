import { Profile, Job } from "../models/index.js";
import { pick } from "../utils/helpers.js";
import httpStatus from "http-status";
import { Errors } from "../utils/errors.js";
import { Op } from "sequelize";
import sequelize from "../services/sequelize.js";

const getBestProfession = async (req, res) => {
  try {
    const startDate = req.query.start;
    const endDate = req.query.end;

    const bestContractor = await Job.findOne({
      order: [[sequelize.fn("max", sequelize.col("amount")), "DESC"]],
      where: {
        status: "paid",
        paid_date: {
          [Op.lte]: endDate,
        },
        createdAt: {
          [Op.gte]: startDate,
        },
      },
      attributes: [
        "contractor_id",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      group: ["contractor_id"],
    });

    if (!bestContractor) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    const profile = await Profile.findOne({
      where: { id: bestContractor.contractor_id },
    });

    if (!profile.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    const { profession } = profile;

    return res.status(httpStatus.OK).json({
      profession,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

const getBestClient = async (req, res) => {
  const DEFAULT_LIMIT = 2;
  const bestProfiles = [];

  try {
    const startDate = req.query.start;
    const endDate = req.query.end;
    let limit = parseInt(req.query.limit);

    if (!limit) {
      limit = DEFAULT_LIMIT;
    }

    if (!(startDate && endDate)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.VALIDATION_FAILS,
      });
    }

    const bestClients = await Job.findAll({
      order: [[sequelize.fn("max", sequelize.col("amount")), "DESC"]],
      where: {
        status: "paid",
        paid_date: {
          [Op.lte]: endDate,
        },
        createdAt: {
          [Op.gte]: startDate,
        },
      },
      attributes: [
        "client_id",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      group: ["client_id"],
      limit,
      raw: true,
    });

    if (!bestClients.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    //get profiles from array of client IDs
    for (let i = 0; i < bestClients.length; i++) {
      bestProfiles.push(bestClients[i].client_id);
    }

    const profiles = await Profile.findAll({
      where: { id: { [Op.in]: bestProfiles } },
    });

    if (!profiles.length) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    return res.status(httpStatus.OK).json({
      profiles,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

export { getBestProfession, getBestClient };

