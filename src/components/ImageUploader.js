import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

import { REQUIRED_IMAGE_SIZE } from "../constants";
import Button from "./Button";

const propTypes = {
  onUploadSuccess: PropTypes.func,
  onUploadError: PropTypes.func,
};

const defaultProps = {
  onUploadSuccess: () => {},
  onUploadError: () => {},
};

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasUploaded: false,
    };

    this.fileInput = createRef();
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(e) {
    let reader = new FileReader();

    reader.onloadend = () => {
      const uploadedImage = new Image();

      uploadedImage.onload = () => {
        if (
          uploadedImage.width !== uploadedImage.height &&
          uploadedImage.width !== REQUIRED_IMAGE_SIZE.width
        ) {
          this.props.onUploadError(
            "Incorrect Image Dimensions!! 😟. Please upload an image of size 1024 x 1024"
          );
        } else {
          this.setState({ hasUploaded: true }, () => {
            this.props.onUploadSuccess(reader.result);
          });
        }
      };

      uploadedImage.src = reader.result;
    };
    if (e.target.files.length > 0) reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <div className="image-uploader">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={this.uploadImage}
          className="is-hidden"
          ref={this.fileInput}
        />
        <Button
          variant={this.state.hasUploaded ? "info" : "primary"}
          text={
            this.state.hasUploaded ? "Upload Another Image" : "Upload Image"
          }
          onClick={() => this.fileInput.current.click()}
        />
      </div>
    );
  }
}

ImageUploader.propTypes = propTypes;
ImageUploader.defaultProps = defaultProps;

export default ImageUploader;
