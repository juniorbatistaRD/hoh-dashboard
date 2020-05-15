import Parse from "parse";

const Community = Parse.Object.extend("Community");
const query = new Parse.Query(Community);

export const saveCommunity = ({
  name,
  hasPoliceStation,
  hasClinic,
  hasSchool,
  hasChurch,
  hasGroceryStore,
}) => {
  const community = new Community();
  community.set("name", name);
  community.set("hasPoliceStation", hasPoliceStation);
  community.set("hasClinic", hasClinic);
  community.set("hasSchool", hasSchool);
  community.set("hasChurch", hasChurch);
  community.set("hasGroceryStore", hasGroceryStore);

  return community.save();
};

export const getCommunittiesPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Community);

  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export const deleteCommunity = async (id) => {
  const query = new Parse.Query(Community);

  const community = await query.get(id);
  const result = await community.destroy();

  return result;
};

export const getCommunityById = async (id) => {
  const query = new Parse.Query(Community);

  const result = await query.get(id);

  return result;
};

export const updateCommunityById = async ({
  id,
  name,
  hasPoliceStation,
  hasClinic,
  hasSchool,
  hasChurch,
  hasGroceryStore,
}) => {
  const community = await getCommunityById(id);
  community.set("name", name);
  community.set("hasPoliceStation", hasPoliceStation);
  community.set("hasClinic", hasClinic);
  community.set("hasSchool", hasSchool);
  community.set("hasChurch", hasChurch);
  community.set("hasGroceryStore", hasGroceryStore);

  return community.save();
};

export default query;
