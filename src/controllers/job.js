import { v4 as uuidv4 } from "uuid";
import { Job } from "../models/index.js";

const getJob = async (req, res) => {
  const inputs = {
    name: "new",
    description: "new job to showcase",
    contract_id: "b9f532b4-5a5e-46c3-a375-6256f7f522dd",
    amount: 123.45,
  };

  const created = await Job.create(inputs);

  res.status(200).json({
    created,
  });
};

export { getJob };
