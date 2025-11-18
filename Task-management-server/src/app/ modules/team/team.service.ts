
import { Team } from "./team.model";
import { TMember } from "./team.interface";

const createTeam = async (ownerId: string, name: string) => {
  return await Team.create({ ownerId, name, members: [] });
};

const getTeamById = async (teamId: string) => {
  return await Team.findById(teamId);
};

const addMember = async (teamId: string, member: TMember) => {
  return await Team.findByIdAndUpdate(
    teamId,
    { $push: { members: member } },
    { new: true }
  );
};

const updateMember = async (
  teamId: string,
  memberId: string,
  payload: Partial<TMember>
) => {
  return await Team.findOneAndUpdate(
    { _id: teamId, "members._id": memberId },
    {
      $set: {
        "members.$.name": payload.name,
        "members.$.role": payload.role,
        "members.$.capacity": payload.capacity,
      },
    },
    { new: true }
  );
};

const deleteMember = async (teamId: string, memberId: string) => {
  return await Team.findByIdAndUpdate(
    teamId,
    { $pull: { members: { _id: memberId } } },
    { new: true }
  );
};

export const teamService = {
  createTeam,
  getTeamById,
  addMember,
  updateMember,
  deleteMember,
};
