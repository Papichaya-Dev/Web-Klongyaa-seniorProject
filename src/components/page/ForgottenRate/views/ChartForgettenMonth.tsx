import axios from "../../../../config/axiosInstance";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Container } from "../shared/style/ForgettenRate.style";

function ChartForgettenMonth() {
  const LABEL_WEEK = ["สัปดาห์ที่ 1", "สัปดาห์ที่ 2", "สัปดาห์ที่ 3", "สัปดาห์ที่ 4"];
  const [dataMonth, setDataMonth] = useState([]);

  async function ApiGetForgettenRateWeek() {
    return await axios
      .get("/forgottenRate?filter=month")
      .then((response) => {
        setDataMonth(response.data["rates"]);
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    ApiGetForgettenRateWeek();
    console.log("Forgetten Rate Month :", dataMonth);
  }, []);
  return (
    <Container>
      <ReactApexChart
        height={500}
        width={1000}
        options={{
          chart: {
            type: "area",
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1,
            },
          },
          colors: ["#26df70"],
          stroke: {
            width: 3,
            curve: "smooth",
          },
          fill: {
            opacity: 0.1,
          },
          markers: {
            size: 5,
            hover: {
              size: 10,
            },
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            categories: LABEL_WEEK,
            title: {
              text: "ระยะเวลา",
            },
          },
          yaxis: {
            title: {
              text: "จำนวนที่ลืมทานยา (ครั้ง)",
            },
            min: 0,
            max: 20,
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
        }}
        series={[
          {
            name: "จำนวน (ครั้ง)",
            data: dataMonth,
          },
        ]}
        type="area"
      />
    </Container>
  );
}

export default ChartForgettenMonth;