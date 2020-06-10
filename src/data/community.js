import Parse from "parse";
import uploadFilesToParse from "../helpers/uploadFileToParse";
const Community = Parse.Object.extend("Community");
const query = new Parse.Query(Community);

export const saveCommunity = async (values) => {
  const community = new Community();
  const pictures = await uploadFilesToParse(values.pictures);
  return community.save({ ...values, pictures });
};

export const getAllCommunities = async () => {
  const query = new Parse.Query(Community);
  const result = await query.find();

  return result;
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

export const updateCommunityById = async ({ id, ...values }) => {
  const community = await getCommunityById(id);

  const pictures = await uploadFilesToParse(values.pictures);
  console.log(pictures);

  return community.save({
    ...values,
    pictures: pictures ? pictures : undefined,
  });
};

export default query;
