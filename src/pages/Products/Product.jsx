import React, { useEffect, useMemo, useState } from "react";
import request from "../../utils/request";
import { DataTable, Button, TextField, Icon } from "@shopify/polaris";
import "../../../src/index.css";
import ModalProduct from "./ModalProduct";
import ModalAddRule from "./ModalAddRule";
import { SearchIcon } from "@shopify/polaris-icons";
const Product = () => {
  const [fullData, setFullData] = useState([]);
  const [rowTable, setRowTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [active, setActive] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
    const newRowTable = fullData?.filter((item) => {
      return (
        item?.title.toLowerCase().includes(value.toLowerCase()) ||
        item?.status.toLowerCase().includes(value.toLowerCase())
      );
    });

    const cusNewRow = newRowTable?.map((x) => {
      return [
        <img alt={x.title} src={x.image} style={{ height: "50px" }} />,
        x.title,
        x.rules.length,
        x.last_update,
        <div
          className={
            x.status === "Active"
              ? "bg-green-600 inline-block p-2 rounded-md"
              : "bg-amber-300 inline-block p-2 rounded-md"
          }
        >
          {x.status}
        </div>,
        <div>
          <Button variant="primary" onClick={() => handleEdit(x)}>
            + Add Rule
          </Button>
        </div>,
      ];
    });
    setRowTable(cusNewRow);
  };

  const rowsPerPage = 5; // Mỗi trang hiển thị 5 dòng

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await request.get(
          "https://my-json-server.typicode.com/vuongquangminh/mm/products"
        );
        const data =
          res.data.length > 0 &&
          res.data.map((x) => {
            return [
              <img alt={x.title} src={x.image} style={{ height: "50px" }} />,
              x.title,
              x.rules.length,
              x.last_update,
              <div
                className={
                  x.status === "Active"
                    ? "bg-green-600 inline-block p-2 rounded-md"
                    : "bg-amber-300 inline-block p-2 rounded-md"
                }
              >
                {x.status}
              </div>,
              <div>
                <Button variant="primary" onClick={() => handleEdit(x)}>
                  + Add Rule
                </Button>
              </div>,
            ];
          });
        setFullData(res.data);
        setRowTable(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, []);

  // Tính toán các dòng hiển thị dựa trên trang hiện tại
  const paginatedRows = useMemo(
    () =>
      rowTable.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
      ),
    [rowTable, currentPage]
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < rowTable.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleEdit = (item) => {
    setRuleModal(true);
    setItem(item);
  };

  const handleToggle = () => setActive(!active);
  const handleToggleRule = () => {
    setRuleModal(false);
  };
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleToggle}>+ Add Product</Button>
      </div>
      <TextField
        label="Tìm kiếm ( Product, Status)"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Nhập từ khóa tìm kiếm..."
        prefix={<Icon source={SearchIcon} tone="base" />} // Icon tìm kiếm
        clearButton // Hiển thị nút xoá input
        onClearButtonClick={() => setSearchValue("")} // Xoá nội dung input
        autoComplete="off"
      />
      {rowTable.length > 0 ? (
        <>
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            Product Table
          </h2>
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "numberic",
              "text",
              "text",
              "text",
            ]}
            headings={[
              "Product",
              "Title",
              "Rules Count",
              "Last Update",
              "Status",
              "Actions",
            ]}
            rows={paginatedRows}
          />
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {currentPage * rowsPerPage + 1}-
            {currentPage * rowsPerPage + rowsPerPage}/ Tổng số {rowTable.length}
          </div>
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={(currentPage + 1) * rowsPerPage >= rowTable.length}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
      <ModalProduct
        active={active}
        setActive={setActive}
        errors={errors}
        setErrors={setErrors}
      />
      <ModalAddRule
        active={ruleModal}
        setActive={setRuleModal}
        item={item}
        handleToggle={handleToggleRule}
      />
    </>
  );
};

export default Product;
