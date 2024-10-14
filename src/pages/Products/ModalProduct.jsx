import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  TextField,
  DropZone,
  Thumbnail,
  TextContainer,
} from "@shopify/polaris";

const ProductModal = ({ active, setActive, errors, setErrors }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleToggle = () => setActive(!active);

  const handleTitleChange = useCallback((value) => setTitle(value), []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);
  const handleDescriptionChange = useCallback(
    (value) => setDescription(value),
    []
  );
  useEffect(() => {
    if (active === false) {
      setErrors({});
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
    }
  }, [active]);

  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);

  const handleSubmit = () => {
    if (validate()) {
      console.log({
        title,
        price,
        description,
        image,
      });
      handleToggle();
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const uploadedImage = image ? (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Thumbnail source={URL.createObjectURL(image)} alt="Uploaded Image" />
      <div>
        <span style={{ color: "#6d7175" }}>{image.name}</span>{" "}
        {/* Thay TextStyle bằng span */}
      </div>
    </div>
  ) : null;

  return (
    <>
      <Modal
        open={active}
        onClose={handleToggle}
        title="Create New Product"
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
        <Modal.Section>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            autoComplete="off"
            error={errors.title}
          />
          <TextField
            label="Price"
            value={price}
            onChange={handlePriceChange}
            autoComplete="off"
            type="number"
            error={errors.price}
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            multiline={4}
            autoComplete="off"
            error={errors.description}
          />
          <p style={{ fontWeight: "bold", marginBottom: "5px" }}>Image</p>
          <TextContainer>
            <DropZone onDrop={handleDropZoneDrop}>
              {uploadedImage || <DropZone.FileUpload />}
            </DropZone>
            {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}{" "}
            {/* Show image error */}
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default ProductModal;
