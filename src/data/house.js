import Parse from "parse";
import uploadFilesToParse from "../helpers/uploadFileToParse";

const House = Parse.Object.extend("House");
const query = new Parse.Query(House);

const uploadParseFile = (file) => {
  const parseFile = new Parse.File("profile.jpg", file);
  return parseFile;
};

const getPictures = (picturesData) => {
  let pictures = [];
  for (const key in picturesData) {
    //check if is a number regardless if string or int
    if (!isNaN(key)) {
      const picture = uploadParseFile(picturesData[key]);
      pictures.push(picture);
    }
  }

  return pictures;
};

export const saveHouse = (data) => {
  const house = new House();

  const picturesOfFamily = getPictures(data.picturesOfFamily);
  const ownershipProof = getPictures(data.ownershipProof);
  const picturesOfProperty = getPictures(data.picturesOfProperty);
  const newHousePictures = getPictures(data.newHousePictures);

  console.log({ ...data, picturesOfFamily });

  return house.save({
    ...data,
    picturesOfFamily,
    ownershipProof,
    picturesOfProperty,
    newHousePictures,
  });
};

export const getHousesPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(House);

  query.includeAll();
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export const deleteHouse = async (id) => {
  const query = new Parse.Query(House);

  const house = await query.get(id);
  const result = await house.destroy();

  return result;
};

export const searchHousesWithPagination = async ({
  startFrom,
  perPage,
  searchParams,
}) => {
  const query = new Parse.Query(House);
  const queryTeam = new Parse.Query("Team");
  const queryCommunity = new Parse.Query("Community");

  if (searchParams.community) {
    const community = await queryCommunity.get(searchParams.community);
    query.equalTo("community", community);
  }
  if (searchParams.team) {
    const team = await queryTeam.get(searchParams.team);
    query.equalTo("team", team);
  }

  if (searchParams.year) {
    const date = new Date(searchParams.year);
    query.greaterThanOrEqualTo("builtAt", date);
    query.lessThan(
      "builtAt",
      new Date(date.setFullYear(date.getFullYear() + 1))
    );
  }
  if (searchParams.applicantName) {
    query.fullText("applicantName", searchParams.applicantName);
  }

  query.includeAll();
  query.skip(startFrom);
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export const getHouseById = async (id) => {
  const query = new Parse.Query(House);

  query.includeAll();

  const result = await query.get(id);

  return result;
};

export const updateHouseById = async ({ id, ...values }) => {
  const house = await getHouseById(id);

  const picturesOfFamily = await uploadFilesToParse(values.picturesOfFamily);
  const picturesOfProperty = await uploadFilesToParse(
    values.picturesOfProperty
  );
  const newHousePictures = await uploadFilesToParse(values.newHousePictures);
  const ownershipProof = await uploadFilesToParse(values.ownershipProof);

  return house.save({
    ...values,
    ownershipProof: ownershipProof ? ownershipProof : undefined,
    newHousePictures: newHousePictures ? newHousePictures : undefined,
    picturesOfProperty: picturesOfProperty ? picturesOfProperty : undefined,
    picturesOfFamily: picturesOfFamily ? picturesOfFamily : undefined,
  });
};

export default query;
