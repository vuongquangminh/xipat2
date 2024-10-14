import { Grid, Modal, TextField } from "@shopify/polaris";
import React, { useState } from "react";

const ModalAddRule = ({ item, active, handleToggle }) => {
  const [rowInit, setRowInit] = useState(() => item?.rules);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({});
    handleToggle();
  };

  console.log("rowInit: ", rowInit);

  return (
    <div>
      <Modal
        open={active}
        onClose={handleToggle}
        title="Create New Rule"
        primaryAction={{
          content: "Submit",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleToggle,
          },
        ]}
      >
        <div className="m-5">
          <Grid
            columns={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} // Chia đều thành 3 cột cho màn hình lớn hơn
            gap="4" // Khoảng cách giữa các ô (tuỳ chọn)
          >
            <Grid.Cell>
              <TitleCampaign
                height="60px"
                title_campaign={item?.sub_rule?.title_campaign}
              />
            </Grid.Cell>
            <Grid.Cell>
              <StartDate
                height="60px"
                start_date={item?.sub_rule?.start_date}
              />
            </Grid.Cell>
            <Grid.Cell>
              <EndDate height="60px" end_date={item?.sub_rule?.end_date} />
            </Grid.Cell>
          </Grid>
        </div>

        <div className="m-5">
          {rowInit &&
            rowInit.map((x) => {
              return (
                <Grid
                  key={x.id}
                  columns={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} // Chia đều thành 3 cột cho màn hình lớn hơn
                  gap="4" // Khoảng cách giữa các ô (tuỳ chọn)
                >
                  <Grid.Cell>
                    <BuyFrom height="60px" value={x?.buy_from} />
                  </Grid.Cell>
                  <Grid.Cell>
                    <BuyTo height="60px" value={x?.buy_to} />
                  </Grid.Cell>
                  <Grid.Cell>
                    <Discount height="60px" value={x?.discount} />
                  </Grid.Cell>
                </Grid>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

const StartDate = ({ height = "auto", width = "auto", start_date }) => {
  console.log("start_date: ", start_date);
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Start Date"
        value={start_date}
        // onChange={(value) => console.log("value: ", value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};
const EndDate = ({ height = "auto", width = "auto", end_date }) => {
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="End Date"
        value={end_date}
        // onChange={(value) => setStartDate(value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};

const TitleCampaign = ({ height = "auto", width = "auto", title_campaign }) => {
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Title Campaign"
        value={title_campaign}
        // onChange={(value) => setStartDate(value)} // Update value on change
        // onChange={(value) => console.log("value: ", value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};

const BuyFrom = ({ height = "auto", width = "auto", value }) => {
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Buy From"
        value={value}
        // onChange={(value) => setStartDate(value)} // Update value on change
        // onChange={(value) => console.log("value: ", value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};
const BuyTo = ({ height = "auto", width = "auto", value }) => {
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Buy To"
        value={value}
        // onChange={(value) => setStartDate(value)} // Update value on change
        // onChange={(value) => console.log("value: ", value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};
const Discount = ({ height = "auto", width = "auto", value }) => {
  return (
    <div
      style={{
        // background: "var(--p-color-text-info)",
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Discount"
        value={value}
        // onChange={(value) => setStartDate(value)} // Update value on change
        // onChange={(value) => console.log("value: ", value)} // Update value on change
        autoComplete="off"
        type="text"
      />
    </div>
  );
};

export default ModalAddRule;
