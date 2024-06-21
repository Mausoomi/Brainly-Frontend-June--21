import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Get_Count_Student } from "../../store/Actions/Authactions";
import { Get_Weekly_Performance_of_Student_All } from "../../store/Actions/LeaderBoardActions";

const chartSetting = {
  width: 1850,
  height: 450,
  sx: {
    [`.${axisClasses.left}`]: {
      color: "white !important",
    },
    [`.${axisClasses.line}`]: {
      stroke: "white !important",
    },
    [`.${axisClasses.bar}`]: {
      stroke: "white !important", // Vertical border color
    },
    [`.${axisClasses.line}`]: {
      stroke: "white !important", // Color of the line
    },
    [`.${axisClasses.axis}:not(.${axisClasses.axisX}) .${axisClasses.line}`]: {
      stroke: "white !important", // Color of the background line
      strokeDasharray: "4", // Optional: Add dashes to the line
    },
    [`.${axisClasses.x} .${axisClasses.line}`]: {
      stroke: "white !important", // Optional: Color of the baseline grid line
    },
    [`.${axisClasses.axis}`]: {
      stroke: "white !important", // Color of axes
    },
    [`.${axisClasses.grid}`]: {
      stroke: "white !important", // Color of vertical grid lines
    },
    [`.${axisClasses.y} .${axisClasses.grid}`]: {
      stroke: "white !important", // Optional: Color of the y-axis grid line
    },
    [`.${axisClasses.x} .${axisClasses.tickLabel}`]: {
      textAnchor: "start", // Align text to the start (left)
      fill: "white",
    },
  },
};

const valueFormatter = (value) => `${value}word`;
// const valueFormatter = (value) => value;

console.log(valueFormatter);

const makeLabelsUnique = (data, key) => {
  const labelCount = {};
  return data.map((item) => {
    const label = item[key];
    if (!labelCount[label]) {
      labelCount[label] = 0;
    }
    labelCount[label]++;
    return {
      ...item,
      [key]: `${label}${
        labelCount[label] > 1 ? ` (${labelCount[label]})` : ""
      }`,
    };
  });
};

function getWordsByLines(text) {
  // Check if the input is a string, if not, return an empty array or handle the error appropriately
  if (typeof text !== "string") {
    console.error("Input is not a string:", text);
    return [];
  }

  // Otherwise, proceed with splitting the string
  return text.split("\n").map((line) => line.split(" "));
}

function UserInfoCart({
  studentId,
  setTotalQuestions,
  setCorrectQuestion,
  setWrongQuestions,
  setTotalWordPracticed,
}) {
  const [selectedDataset, setSelectedDataset] = useState("day");
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
const [DayData, setDayData] = useState([]);
const [WeekData, setWeekData] = useState([]);
const [monthData, setMonthData] = useState([]);
  const dispatch = useDispatch();
  console.log(studentId);

  const WordCountData = useSelector((state) => state.auth.WordCount);
const AllDashboardData = useSelector(
  (state) => state.LeaderBoard.DashboardData
);
  console.log(WordCountData);
  console.log(AllDashboardData);

  useEffect(() => {
    if (studentId !== null && studentId !== undefined) {
      console.log(studentId);
      dispatch(Get_Count_Student(studentId));
        dispatch(Get_Weekly_Performance_of_Student_All(studentId));
    }
  }, [studentId]);

    useEffect(() => {
      if (AllDashboardData.length > 0) {
        const totalqueValue = AllDashboardData.map(
          (ele) => ele.TotalquestionsattemptedCount
        ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const totalCorrectValue = AllDashboardData.map(
          (ele) => ele.QuestionsCorrectCount
        ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const totalWrongValue = AllDashboardData.map(
          (ele) => ele.QuestionsWrongCount
        ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        setTotalQuestions(totalqueValue || 0);
        setCorrectQuestion(totalCorrectValue || 0);
        setWrongQuestions(totalWrongValue || 0);
        setTotalWordPracticed(WordCountData[0]?.Count || 0);
      }
    }, [AllDashboardData, WordCountData]);


      const getWeekOfMonth = (date) => {
        const startWeekDayIndex = 0; // 0 for Sunday, 1 for Monday, etc.
        const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfWeek = firstOfMonth.getDay() - startWeekDayIndex;
        const offsetDate = date.getDate() + dayOfWeek - 1;
        return Math.floor(offsetDate / 7) + 1;
      };

      useEffect(() => {
        const weekdayCounts = {};
        const monthCounts = {};
        const weekOfMonthCounts = {};

        // Initialize starting indices for months and weekdays
        const startingMonthIndex = new Date(
          WordCountData[0]?.CounttimeStamps[0]
        ).getMonth();
        const startingWeekdayIndex = new Date(
          WordCountData[0]?.CounttimeStamps[0]
        ).getDay();

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

        // Calculate the last 7 days including today
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(currentDate.getDate() - i);
          return date;
        }).reverse();

        // Iterate through each timestamp in WordCount data
        WordCountData[0]?.CounttimeStamps.forEach((timestamp) => {
          const date = new Date(timestamp);
          const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
          const day = date.getDate();
          const weekOfMonth = getWeekOfMonth(date);
          const month = date.toLocaleString("default", { month: "long" });

          // Increment counts for the current day, week, and month
          monthCounts[month] = (monthCounts[month] || 0) + 1;

          // Increment counts for the last 7 days including today
          last7Days.forEach((lastDay) => {
            if (lastDay.toDateString() === date.toDateString()) {
              weekdayCounts[dayOfWeek] = (weekdayCounts[dayOfWeek] || 0) + 1;
            }
          });

          // Increment counts for the current month dates
          if (date >= startOfMonth && date <= endOfMonth) {
            weekOfMonthCounts[day] = (weekOfMonthCounts[day] || 0) + 1;
          }
        });

        // Populate missing weekdays, months, and weeks of the month with 0 value
        const allWeekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const allMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        allWeekdays.forEach((day, index) => {
          const adjustedIndex = (index + startingWeekdayIndex) % 7;
          const weekday = allWeekdays[adjustedIndex];

          if (!(weekday in weekdayCounts)) {
            weekdayCounts[weekday] = 0;
          }

          if (
            weekday ===
            currentDate.toLocaleString("default", { weekday: "long" })
          ) {
            weekdayCounts["Today"] = weekdayCounts[weekday];
            delete weekdayCounts[weekday];
          }
        });

        allMonths.forEach((month, index) => {
          const adjustedIndex = (index + startingMonthIndex) % 12;
          const currentMonth = allMonths[adjustedIndex];
          if (!(currentMonth in monthCounts)) {
            monthCounts[currentMonth] = 0;
          }
        });

        // Convert objects into arrays of objects
        const weekdayCountsArray = last7Days.map((date) => {
          let dayOfWeek = date.toLocaleString("default", { weekday: "long" });
          if (date.toDateString() === currentDate.toDateString()) {
            dayOfWeek = "Today";
          }
          return {
            day: dayOfWeek,
            date: date.getDate(),
            value: weekdayCounts[dayOfWeek] || 0,
          };
        });

        const monthCountsArray = allMonths.map((month) => ({
          month,
          value: monthCounts[month] || 0,
        }));

        const weekOfMonthCountsArray = [];
        for (let day = 1; day <= endOfMonth.getDate(); day++) {
          weekOfMonthCountsArray.push({
            date: day,
            value: weekOfMonthCounts[day] || 0,
          });
        }

        console.log(
          weekdayCountsArray,
          monthCountsArray,
          weekOfMonthCountsArray
        );

        // Set state with the updated data
        setDayData(weekdayCountsArray);
        setWeekData(weekOfMonthCountsArray);
        setMonthData(monthCountsArray);
      }, [WordCountData]);


  useEffect(() => {
    const handleResize = () => {
      setChartDimensions({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.4,
      });
    };

    window.addEventListener("resize", handleResize);

    // Initial size on component mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
  };

  let datasetToRender = [];
  let xAxis = [];

  if (selectedDataset === "day") {
    datasetToRender = makeLabelsUnique(DayData, "day");
    xAxis = [
      { scaleType: "band", dataKey: "day", padding: { left: 0, right: 0.1 } },
    ];
  } else if (selectedDataset === "weekly") {
    datasetToRender = makeLabelsUnique(WeekData, "date");
    xAxis = [
      { scaleType: "band", dataKey: "date", padding: { left: 0, right: 0.1 } },
    ];
  } else if (selectedDataset === "month") {
    datasetToRender = makeLabelsUnique(monthData, "month");
    xAxis = [
      { scaleType: "band", dataKey: "month", padding: { left: 0, right: 0.1 } },
    ];
  }

  return (
    <div
      style={{
        color: "white",
        alignItems: "end",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl variant="filled">
        <Select
          value={selectedDataset}
          onChange={handleDatasetChange}
          className="chart-dropdown"
          style={{ color: "white", backgroundColor: "#333" }}
        >
          <MenuItem value="day">Show by Last 7 Days</MenuItem>
          <MenuItem value="weekly">Show by This Month</MenuItem>
          <MenuItem value="month">Show by this Year</MenuItem>
        </Select>
      </FormControl>
      <BarChart
        dataset={datasetToRender}
        xAxis={xAxis}
        series={[
          {
            dataKey: "value",
            valueFormatter,
            // label: ({ value }) => value,
            // labelStyle: { fill: "white", fontSize: 14, dy: -10 },
          },
        ]}
        {...chartSetting}
        leftAxis={null}
        labelStyle={{ color: "white !important" }}
        grid={{
          vertical: true,
          color: "red",
        }}
        domain={{ x: [0, "dataMax"], y: [0, datasetToRender.length - 1] }}
        axisHighlight={{ x: "none" }}
        width={chartDimensions.width}
        height={chartDimensions.height}
      ></BarChart>
    </div>
  );
}

export default UserInfoCart;
