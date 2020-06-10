import React, { useState, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import queryHouse from "../../data/house";
import { getDataByMonth } from "../../helpers/getStatsHouse";

const HousesByMonth = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const today = new Date();

      queryHouse.greaterThanOrEqualTo(
        "builtAt",
        new Date("01/01/" + today.getFullYear())
      );
      queryHouse.lessThan("builtAt", new Date("12/31/" + today.getFullYear()));

      const result = await queryHouse.find();

      const housesdata = getDataByMonth(result);

      setHouses(housesdata);
    };

    getData();
  }, []);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Agoust",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: [],
        backgroundColor: "#2185d0",
        borderColor: "#29618b",
        data: houses,
      },
    ],
  };
  return (
    <div>
      <Header>Houses Built By Month in {new Date().getFullYear()} </Header>
      <Line data={data} />
    </div>
  );
};

export default HousesByMonth;
