import React, { useCallback, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";
import { DatePicker } from "@shopify/polaris";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dateFormat = "YYYY/MM/DD";
// Dữ liệu cứng cho 30 ngày
const hardcodedData = [
  { date: "2024/08/13", registrations: 45 },
  { date: "2024/08/14", registrations: 60 },
  { date: "2024/08/15", registrations: 55 },
  { date: "2024/08/16", registrations: 75 },
  { date: "2024/08/17", registrations: 80 },
  { date: "2024/08/18", registrations: 50 },
  { date: "2024/08/19", registrations: 70 },
  { date: "2024/08/20", registrations: 40 },
  { date: "2024/08/21", registrations: 90 },
  { date: "2024/08/22", registrations: 65 },
  { date: "2024/08/23", registrations: 50 },
  { date: "2024/08/24", registrations: 85 },
  { date: "2024/08/25", registrations: 45 },
  { date: "2024/08/26", registrations: 55 },
  { date: "2024/08/27", registrations: 60 },
  { date: "2024/08/28", registrations: 95 },
  { date: "2024/08/29", registrations: 70 },
  { date: "2024/08/30", registrations: 100 },
  { date: "2024/08/31", registrations: 35 },
  { date: "2024/09/01", registrations: 50 },
  { date: "2024/09/02", registrations: 80 },
  { date: "2024/09/03", registrations: 45 },
  { date: "2024/09/04", registrations: 70 },
  { date: "2024/09/05", registrations: 55 },
  { date: "2024/09/06", registrations: 90 },
  { date: "2024/09/07", registrations: 40 },
  { date: "2024/09/08", registrations: 60 },
  { date: "2024/09/09", registrations: 75 },
  { date: "2024/09/10", registrations: 65 },
  { date: "2024/09/11", registrations: 50 },
  { date: "2024/09/12", registrations: 50 },
  { date: "2024/09/13", registrations: 50 },
  { date: "2024/09/14", registrations: 50 },
  { date: "2024/09/15", registrations: 30 },
  { date: "2024/09/16", registrations: 80 },
  { date: "2024/09/17", registrations: 40 },
  { date: "2024/09/18", registrations: 70 },
  { date: "2024/09/19", registrations: 90 },
  { date: "2024/09/20", registrations: 60 },
  { date: "2024/09/21", registrations: 110 },
  { date: "2024/09/22", registrations: 55 },
  { date: "2024/09/23", registrations: 85 },
  { date: "2024/09/24", registrations: 35 },
  { date: "2024/09/25", registrations: 95 },
  { date: "2024/09/26", registrations: 20 },
  { date: "2024/09/27", registrations: 60 },
  { date: "2024/09/28", registrations: 100 },
  { date: "2024/09/29", registrations: 45 },
  { date: "2024/09/30", registrations: 75 },
  { date: "2024/10/01", registrations: 65 },
  { date: "2024/10/02", registrations: 55 },
  { date: "2024/10/03", registrations: 85 },
  { date: "2024/10/04", registrations: 40 },
  { date: "2024/10/05", registrations: 70 },
  { date: "2024/10/06", registrations: 90 },
  { date: "2024/10/07", registrations: 50 },
  { date: "2024/10/08", registrations: 95 },
  { date: "2024/10/09", registrations: 80 },
  { date: "2024/10/10", registrations: 65 },
  { date: "2024/10/11", registrations: 55 },
  { date: "2024/10/12", registrations: 70 },
];

const LineChart = () => {
  const [{ month, year }, setDate] = useState({ month: 8, year: 2024 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(hardcodedData[26].date),
    end: new Date(hardcodedData[32].date),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const filteredData = useMemo(() => {
    const startDate = dayjs(selectedDates.start);
    const endDate = dayjs(selectedDates.end);

    // Kiểm tra nếu ngày bắt đầu hoặc ngày kết thúc không hợp lệ
    if (!startDate.isValid() || !endDate.isValid()) {
      return []; // Trả về mảng rỗng nếu có ngày không hợp lệ
    }

    return hardcodedData.filter((item) => {
      const currentDate = dayjs(item.date.replace(/\//g, "-"));

      // Kiểm tra xem currentDate có nằm trong khoảng từ startDate đến endDate
      const isInRange =
        currentDate.isValid() &&
        currentDate >= startDate &&
        currentDate <= endDate;

      return isInRange;
    });
  }, [selectedDates]);

  const labels = useMemo(() => {
    return filteredData?.map((item) => item.date);
  }, [filteredData]);

  const dataValues = useMemo(() => {
    return filteredData?.map((item) => item.registrations);
  }, [filteredData]);

  const data = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Số lượng đăng ký",
          data: dataValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
        },
      ],
    };
  }, [filteredData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượng đăng ký trong khoảng thời gian đã chọn",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <p className="mb-3">Fake dữ liệu từ 13/08/2024 - 12/10/2024</p>
      Tháng {month + 1}
      <DatePicker
        month={month}
        year={year}
        onChange={setSelectedDates}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        allowRange
      />
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
