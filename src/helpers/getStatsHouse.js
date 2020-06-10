export const getDataByMonth = (houses) => {
  let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  houses.forEach((houses) => {
    const month = new Date(houses.attributes.builtAt).getMonth();
    data[month] = data[month] + 1;
  });

  return data;
};
