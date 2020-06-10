import Parse from "parse";

const uploadParseFile = (file) => {
  const parseFile = new Parse.File("profile.jpg", file);
  return parseFile;
};

const getPictures = (picturesData) => {
  //if not pictures were passed return false
  console.log(picturesData);
  if (picturesData.length < 1) {
    return false;
  }

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

export default getPictures;
