import Parse from "parse";

const Team = Parse.Object.extend("Team");
const query = new Parse.Query(Team);

export const saveTeam = ({ name, leader, teamMembers, place }) => {
  const team = new Team();
  team.set("name", name);
  team.set("teamLeader", leader);
  team.set("teamMembers", parseInt(teamMembers));
  team.set("placeIsFrom", place);
  return team.save();
};

export const getTeamsPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Team);

  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export const deleteTeam = async (id) => {
  const query = new Parse.Query(Team);

  const team = await query.get(id);
  const result = await team.destroy();

  return result;
};

export const getTeamById = async (id) => {
  const query = new Parse.Query(Team);

  const result = await query.get(id);

  return result;
};

export const updateTeamById = async ({
  id,
  name,
  leader,
  teamMembers,
  place,
}) => {
  const team = await getTeamById(id);
  team.set("name", name);
  team.set("teamLeader", leader);
  team.set("teamMembers", parseInt(teamMembers));
  team.set("placeIsFrom", place);

  return team.save();
};

export default query;
