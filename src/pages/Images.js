import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Images = ({ history }) => {
  const { uploadedImages } = history.location.state;
  if (!uploadedImages) return <Redirect path="/" />;
  return (
    <div className="uploaded-image-container">
      {uploadedImages.map((uploadedImage) => (
        <div>
          <h2 className="uploaded-image-name">{uploadedImage.name}</h2>
          <img src={uploadedImage.link} className="uploaded-image" />
        </div>
      ))}
    </div>
  );
};

Images.propTypes = propTypes;

export default Images;
