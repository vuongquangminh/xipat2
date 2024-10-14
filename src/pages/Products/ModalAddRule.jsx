import { Button, Grid, Icon, Modal, TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { ArchiveIcon } from "@shopify/polaris-icons";

const ModalAddRule = ({ item, active, handleToggle }) => {
  const [rowInit, setRowInit] = useState([]);
  const [showNewRule, setShowNewRule] = useState([]);
  const [showError, setShowErrorRule] = useState(false);

  useEffect(() => {
    active && setRowInit(item?.rules);
  }, [item, active]);
  const handleSubmit = () => {
    console.log({ finalFormRule: [...rowInit, ...showNewRule] });
  };

  const handleRemove = (item) => {
    const newRowInit = rowInit.filter((x, _) => x.id !== item.id);
    setRowInit(newRowInit);
  };
  const handleAddRule = () => {
    if (
      showNewRule[showNewRule.length - 1]?.buy_from === "" ||
      showNewRule[showNewRule.length - 1]?.buy_to === "" ||
      showNewRule[showNewRule.length - 1]?.discount === ""
    ) {
      setShowErrorRule(true);
    } else {
      setShowNewRule([
        ...showNewRule,
        { buy_from: "", buy_to: "", discount: "" },
      ]);
    }
  };
  const handleInputChange = (index, field, value) => {
    setShowErrorRule(false);
    const updatedRules = showNewRule.map((rule, idx) => {
      if (idx === index) {
        return { ...rule, [field]: value };
      }
      return rule;
    });
    setShowNewRule(updatedRules);
  };
  const handleRemoveNewRule = (index) => {
    const newRules = showNewRule.filter((_, idx) => idx !== index);
    setShowNewRule(newRules);
  };
  const handleToggleReset = () => {
    setShowNewRule([]); // Reset mảng showNewRule khi đóng form
    setShowErrorRule(false); // Reset trạng thái lỗi nếu cần
    handleToggle(); // Gọi hàm đóng modal
  };
  return (
    <div>
      <Modal
        open={active}
        onClose={handleToggleReset}
        title={
          <p>
            Add Rule ({" "}
            <span className="text-red-500">Rule cũ không có quyền sửa</span> )
          </p>
        }
        primaryAction={{
          content: "Submit",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleToggleReset,
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
                <div key={x.id} className="flex items-center">
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
                  <button onClick={() => handleRemove(x)}>
                    <Icon source={ArchiveIcon} tone="base" />
                  </button>
                </div>
              );
            })}
        </div>
        {showNewRule &&
          showNewRule.map((x, index) => {
            return (
              <div className="m-5">
                <div key={x.id} className="flex items-center">
                  <Grid
                    key={x.id}
                    columns={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} // Chia đều thành 3 cột cho màn hình lớn hơn
                    gap="4" // Khoảng cách giữa các ô (tuỳ chọn)
                  >
                    <Grid.Cell>
                      <BuyFrom
                        height="60px"
                        value={x.buy_from}
                        onChange={(e) =>
                          handleInputChange(index, "buy_from", e)
                        }
                      />
                    </Grid.Cell>
                    <Grid.Cell>
                      <BuyTo
                        height="60px"
                        value={x.buy_to}
                        onChange={(e) => handleInputChange(index, "buy_to", e)}
                      />
                    </Grid.Cell>
                    <Grid.Cell>
                      <Discount
                        height="60px"
                        value={x.discount}
                        onChange={(e) =>
                          handleInputChange(index, "discount", e)
                        }
                      />
                    </Grid.Cell>
                  </Grid>
                  <button onClick={() => handleRemoveNewRule(index)}>
                    <Icon source={ArchiveIcon} tone="base" />
                  </button>
                </div>
              </div>
            );
          })}
        {showError && (
          <div className="m-5">
            <p className="text-start text-red-600 mb-3">Chưa nhập hết rule</p>
          </div>
        )}

        <div className="m-5">
          <Button variant="primary" onClick={handleAddRule}>
            + Add
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const StartDate = ({ height = "auto", width = "auto", start_date }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Start Date"
        value={start_date}
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
        height: height,
        width: width,
      }}
    >
      <TextField
        label="End Date"
        value={end_date}
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
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Title Campaign"
        value={title_campaign}
        autoComplete="off"
        type="text"
      />
    </div>
  );
};

const BuyFrom = ({ height = "auto", width = "auto", value, onChange }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Buy From"
        value={value}
        onChange={onChange}
        autoComplete="off"
        type="number"
      />
    </div>
  );
};
const BuyTo = ({ height = "auto", width = "auto", value, onChange }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Buy To"
        value={value}
        onChange={onChange}
        autoComplete="off"
        type="number"
      />
    </div>
  );
};
const Discount = ({ height = "auto", width = "auto", value, onChange }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      <TextField
        label="Discount per item (%)"
        value={value}
        onChange={onChange}
        autoComplete="off"
        type="number"
      />
    </div>
  );
};

export default ModalAddRule;
