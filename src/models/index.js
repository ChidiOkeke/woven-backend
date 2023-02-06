import Contract from "./contract.js";
import Job from "./job.js";
import Profile from "./profile.js";

Contract.hasMany(Job, { foreignKey: 'contract_id' });
Job.hasOne(Contract, { foreignKey: 'contract_id' });

export { Profile, Contract, Job };
