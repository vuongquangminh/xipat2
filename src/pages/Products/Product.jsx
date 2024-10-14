import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import { DataTable, Button, Tag } from "@shopify/polaris";
import { color } from "chart.js/helpers";
import "../../../src/index.css";
import ModalProduct from "./ModalProduct";
import ModalAddRule from "./ModalAddRule";
const Product = () => {
  const [rowTable, setRowTable] = useState([]);
  const [fullRow, setFullRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [active, setActive] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [item, setItem] = useState({});

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
        setFullRowData(res.data);
        setRowTable(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, []);

  // Tính toán các dòng hiển thị dựa trên trang hiện tại
  const paginatedRows = rowTable.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
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
    console.log("Edit item with id:", item);
    setRuleModal(true);
    setItem(item);
    // Thực hiện hành động chỉnh sửa
  };

  const handleToggle = () => setActive(!active);
  console.log("aaa: ", item);
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleToggle}>+ Add Product</Button>
      </div>
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
      <ModalAddRule active={ruleModal} setActive={setRuleModal} item={item} />
    </>
  );
};

export default Product;
