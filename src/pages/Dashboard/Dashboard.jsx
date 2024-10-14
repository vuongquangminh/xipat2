import BarChart from "./BarChart";
import LineChart from "./LineChart";
import "@shopify/polaris/build/esm/styles.css";

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            flex: 1,
            marginRight: "10px",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div className="w-full">
            <LineChart />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            marginLeft: "10px",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <div className="w-full">
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
