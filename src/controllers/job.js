import { Profile, Job } from "../models/index.js";
import { pick } from "../utils/helpers.js";
import httpStatus from "http-status";
import { Errors } from "../utils/errors.js";
import { Op } from "sequelize";
import sequelize from "../services/sequelize.js";

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAndCountAll();

    return res.status(httpStatus.OK).json({
      jobs,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

const getUnpaidJobs = async (req, res) => {
  const userProfile = req.user;

  try {
    const jobs = await Job.findAndCountAll({
      where: {
        status: ["unpaid"],
        [Op.or]: [
          { client_id: userProfile.id },
          { contractor_id: userProfile.id },
        ],
      },
    });

    return res.status(httpStatus.OK).json({
      jobs,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};
const createJob = async (req, res) => {
  try {
    const body = pick(req.body, [
      "name",
      "description",
      "amount",
      "status",
      "contract_id",
      "client_id",
      "contractor_id",
    ]);

    if (!body) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.VALIDATION_FAILS,
      });
    }

    const result = await Job.create(body);

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

const payForJob = async (req, res) => {
  try {
    const userProfile = req.user;

    const jobId = req.params.job_id;

    if (!jobId) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    const job = await Job.findOne({ where: { id: jobId } });

    if (!job) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_RECORD,
      });
    }

    if (job.status === "paid") {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.DUPLICATE_PAYMENT,
      });
    }
    const contractor = await Profile.findOne({
      where: { id: job.contractor_id },
    });

    if (!contractor) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_USER,
      });
    }

    const client = await Profile.findOne({ where: { id: job.client_id } });

    if (!client) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: Errors.NONEXISTENT_USER,
      });
    }

    if (
      userProfile.id !== client.id &&
      userProfile.profile_type !== client.profile_type
    ) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.VALIDATION_FAILS,
      });
    }

    if (Number(client.balance) < Number(job.amount)) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: Errors.INSUFFICIENT_FUNDS,
      });
    }

    const transaction = await sequelize.transaction(async (t) => {
      const debitResult = await Profile.update(
        { balance: Number(client.balance) - Number(job.amount) },
        { where: { id: client.id } },
        { transaction: t }
      );

      const creditResult = await Profile.update(
        { balance: Number(contractor.balance) + Number(job.amount) },
        { where: { id: contractor.id } },
        { transaction: t }
      );

      const jobResult = await Job.update(
        { status: "paid", paid_date: Date.now() },
        { where: { id: jobId } },
        { transaction: t }
      );

      return debitResult && creditResult && jobResult;
    });

    if (!transaction) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: Errors.SERVER_ERROR,
      });
    }

    const settledJob = await Job.findOne({ where: { id: jobId } });

    if (!settledJob) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: Errors.SERVER_ERROR,
      });
    }
    return res.status(httpStatus.OK).json({
      settledJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};
export { getJobs, createJob, getUnpaidJobs, payForJob };
