import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useSelector } from "react-redux";

const barColors = ["#FF5733", "#33FF57", "#5733FF", "#FF33E9", "#33E9FF"];
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

  return text.split("\n").map((line) => line.split(" "));
}

export default function BarsDataset() {
  const [selectedDataset, setSelectedDataset] = useState("day");
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [DayData, setDayData] = useState([]);
  const [WeekData, setWeekData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const WordCount = useSelector((state) => state.auth.WordCount);

  // console.log(WordCount[0]?.CounttimeStamps);

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


  const startingMonthIndex = new Date(
    WordCount[0]?.CounttimeStamps[0]
  ).getMonth();
  const startingWeekdayIndex = new Date(
    WordCount[0]?.CounttimeStamps[0]
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
  WordCount[0]?.CounttimeStamps.forEach((timestamp) => {
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
      weekday === currentDate.toLocaleString("default", { weekday: "long" })
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

  console.log(weekdayCountsArray, monthCountsArray, weekOfMonthCountsArray);

  // Set state with the updated data
  setDayData(weekdayCountsArray);
  setWeekData(weekOfMonthCountsArray);
  setMonthData(monthCountsArray);
}, [WordCount]);


  const handleDatasetChange = (event) => {
    setSelectedDataset(event.target.value);
    // setColorY(event.target.value);
  };

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

  let datasetToRender = [];
  let xAxis = [];

  if (selectedDataset === "day") {
    datasetToRender = makeLabelsUnique(DayData, "day");
    xAxis = [
      {
        scaleType: "band",
        dataKey: "day",
        padding: { left: 0, right: 0.1 },
        colorMap: {
          type: "ordinal",
          colors: [
            "#FF0000", // Bright Red
            "#FFFF00", // Sunny Yellow
            "#00FF00", // Vivid Green
            "#0000FF", // Electric Blue
            "#FF69B4", // Hot Pink
            "#FFA500", // Bright Orange
            "#00FFFF", // Cyan
            "#FF00FF", // Magenta
            "#32CD32", // Lime Green
            "#800080", // Purple
            "#FFD700", // Gold
            "#FF4500", // Orange Red
            "#1E90FF", // Dodger Blue
            "#ADFF2F", // Green Yellow
            "#FF1493", // Deep Pink
          ],
        },
      },
    ];
  } else if (selectedDataset === "weekly") {
    datasetToRender = makeLabelsUnique(WeekData, "date");
    xAxis = [
      {
        scaleType: "band",
        dataKey: "date",
        padding: { left: 0, right: 0.1 },
        colorMap: {
          type: "ordinal",
          colors: [
            "#FF0000", // Bright Red
            "#FFFF00", // Sunny Yellow
            "#00FF00", // Vivid Green
            "#0000FF", // Electric Blue
            "#FF69B4", // Hot Pink
            "#FFA500", // Bright Orange
            "#00FFFF", // Cyan
            "#FF00FF", // Magenta
            "#32CD32", // Lime Green
            "#800080", // Purple
            "#FFD700", // Gold
            "#FF4500", // Orange Red
            "#1E90FF", // Dodger Blue
            "#ADFF2F", // Green Yellow
            "#FF1493", // Deep Pink
          ],
        },
      },
    ];
  } else if (selectedDataset === "month") {
    datasetToRender = makeLabelsUnique(monthData, "month");
    xAxis = [
      {
        scaleType: "band",
        dataKey: "month",
        padding: { left: 0, right: 0.1 },
        colorMap: {
          type: "ordinal",
          colors: [
            "#FF0000", // Bright Red
            "#FFFF00", // Sunny Yellow
            "#00FF00", // Vivid Green
            "#0000FF", // Electric Blue
            "#FF69B4", // Hot Pink
            "#FFA500", // Bright Orange
            "#00FFFF", // Cyan
            "#FF00FF", // Magenta
            "#32CD32", // Lime Green
            "#800080", // Purple
            "#FFD700", // Gold
            "#FF4500", // Orange Red
            "#1E90FF", // Dodger Blue
            "#ADFF2F", // Green Yellow
            "#FF1493", // Deep Pink
          ],
        },
      },
    ];
  }

  return (
    <div
    className="ChartBox"
     
    >
      <FormControl variant="filled">
        <Select
          value={selectedDataset}
          onChange={handleDatasetChange}
          className="chart-dropdown"
          // style={{ color: "white", backgroundColor: "#333" }}
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
            // Assigning fill colors to bars
            // fill: (_, index) => barColors[index % barColors.length],
          }
          
        ]}
        {...chartSetting}
        leftAxis={null}
        labelStyle={{ color: "white !important" }}
        grid={{
          vertical: true,
        }}
        domain={{ x: [0, "dataMax"], y: [0, datasetToRender.length - 1] }}
        axisHighlight={{ x: "none" }}
        width={chartDimensions.width}
        height={chartDimensions.height}
      ></BarChart>
    </div>
  );
}














// useEffect(() => {
//   const weekdayCounts = {};
//   const monthCounts = {};
//   const weekOfMonthCounts = [];

//   WordCount[0]?.CounttimeStamps.forEach((timestamp) => {
//     const date = new Date(timestamp);
//     const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
//     const day = date.getDate();
//     const weekOfMonth = getWeekOfMonth(date);
//     const month = date.toLocaleString("default", { month: "long" });

//     weekdayCounts[dayOfWeek] = (weekdayCounts[dayOfWeek] || 0) + 1;
//     monthCounts[month] = (monthCounts[month] || 0) + 1;
//     weekOfMonthCounts[weekOfMonth] =
//       (weekOfMonthCounts[weekOfMonth] || 0) + 1;
//   });

//   // Convert objects into an array of objects
//   const weekdayCountsArray = Object.entries(weekdayCounts).map(
//     ([day, value]) => ({ day, value })
//   );
//   const monthCountsArray = Object.entries(monthCounts).map(
//     ([month, value]) => ({ month, value })
//   );
//   const weekOfMonthCountsArray = Object.entries(weekOfMonthCounts).map(
//     ([week, value]) => ({ week, value })
//   );
//   console.log(weekdayCountsArray, monthCountsArray, weekOfMonthCountsArray);
//   setDayData(weekdayCountsArray);
//   setWeekData(weekOfMonthCountsArray);
//   setMonthData(monthCountsArray);
// }, [WordCount]);

// useEffect(() => {
//   // Initialize counts for weekdays, months, and weeks of the month
//   const weekdayCounts = {};
//   const monthCounts = {};
//   const weekOfMonthCounts = {};

//   // Initialize starting indices for months and weekdays
//   const startingMonthIndex = new Date(
//     WordCount[0]?.CounttimeStamps[0]
//   ).getMonth();
//   const startingWeekdayIndex = new Date(
//     WordCount[0]?.CounttimeStamps[0]
//   ).getDay();

//   // Iterate through each timestamp in WordCount data
//   WordCount[0]?.CounttimeStamps.forEach((timestamp) => {
//     const date = new Date(timestamp);
//     const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
//     const day = date.getDate();
//     const weekOfMonth = getWeekOfMonth(date);
//     const month = date.toLocaleString("default", { month: "long" });

//     // Increment counts for the current day, week, and month
//     weekdayCounts[dayOfWeek] = (weekdayCounts[dayOfWeek] || 0) + 1;
//     monthCounts[month] = (monthCounts[month] || 0) + 1;
//     weekOfMonthCounts[weekOfMonth] = (weekOfMonthCounts[weekOfMonth] || 0) + 1;
//   });

//   // Populate missing weekdays, months, and weeks of the month with 0 value
//   const allWeekdays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const allMonths = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const maxWeeksOfMonth = 5; // Assuming maximum 5 weeks in a month

//   allWeekdays.forEach((day, index) => {
//     const adjustedIndex = (index + startingWeekdayIndex) % 7;
//     const weekday = allWeekdays[adjustedIndex];
//     if (!(weekday in weekdayCounts)) {
//       weekdayCounts[weekday] = 0;
//     }
//   });

//   allMonths.forEach((month, index) => {
//     const adjustedIndex = (index + startingMonthIndex) % 12;
//     const currentMonth = allMonths[adjustedIndex];
//     if (!(currentMonth in monthCounts)) {
//       monthCounts[currentMonth] = 0;
//     }
//   });

//   for (let i = 1; i <= maxWeeksOfMonth; i++) {
//     if (!(i in weekOfMonthCounts)) {
//       weekOfMonthCounts[i] = 0;
//     }
//   }

//   // Convert objects into arrays of objects
//   // const weekdayCountsArray = allWeekdays.map((day) => ({
//   //   day,
//   //   value: weekdayCounts[day] || 0,
//   // }));
//   // Convert objects into arrays of objects
//   // Convert objects into arrays of objects
//   const weekdayCountsArray = allWeekdays.map((day) => {
//     const dateObj = new Date(
//       WordCount[0]?.CounttimeStamps.find((timestamp) => {
//         const date = new Date(timestamp);
//         return date.toLocaleString("default", { weekday: "long" }) === day;
//       })
//     );
//     console.log(dateObj);
//     return {
//       day,
//       date: dateObj.getDate(),
//       value: weekdayCounts[day] || 0,
//     };
//   });

//   const monthCountsArray = allMonths.map((month) => ({
//     month,
//     value: monthCounts[month] || 0,
//   }));
//   const weekOfMonthCountsArray = Object.entries(weekOfMonthCounts).map(
//     ([week, value]) => ({ week, value })
//   );

//   console.log(weekdayCountsArray, monthCountsArray, weekOfMonthCountsArray);

//   // Set state with the updated data
//   setDayData(weekdayCountsArray);
//   setWeekData(weekOfMonthCountsArray);
//   setMonthData(monthCountsArray);
// }, [WordCount]);
