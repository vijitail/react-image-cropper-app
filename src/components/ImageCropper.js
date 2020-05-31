import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

import Button from "./Button";

const propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onCrop: PropTypes.func.isRequired,
  disableCrop: PropTypes.bool,
};

const defaultProps = {
  width: 0,
  height: 0,
  disableCrop: false,
};

class ImageCropper extends PureComponent {
  constructor(props) {
    super(props);

    this.imageElement = createRef();
    this.resizeCroppedCanvas = this.resizeCroppedCanvas.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  componentDidUpdate() {
    this.cropper && this.cropper.destroy();

    if (this.props.disableCrop) {
      return;
    }

    if (this.imageElement.current) {
      this.cropper = new Cropper(this.imageElement.current, {
        zoomable: false,
        scalable: false,
        cropBoxResizable: true,
        dragMode: "none",
        autoCropArea: 0.9,
        aspectRatio: this.props.width / this.props.height,
      });
    }
  }

  resizeCroppedCanvas(canvas) {
    return new Promise((resolve, reject) => {
      const croppedImageSrc = canvas.toDataURL("image/png");
      const resizedImage = new Image();
      resizedImage.src = croppedImageSrc;

      resizedImage.onload = () => {
        const ctx = canvas.getContext("2d");

        canvas.width = this.props.width;
        canvas.height = this.props.height;
        console.log(this.props.width, this.props.height);
        ctx.drawImage(resizedImage, 0, 0, this.props.width, this.props.height);
        resolve(canvas);
      };
    });
  }

  async cropImage() {
    const canvas = this.cropper.getCroppedCanvas();
    const resizedCanvas = await this.resizeCroppedCanvas(canvas);
    console.log("RESIZED CANVAS", resizedCanvas);
    const resizedImageSrc = resizedCanvas
      .toDataURL("image/png")
      .replace(/^data:image\/[a-z]+;base64,/, "");
    this.props.onCrop(resizedImageSrc);
  }

  render() {
    const hasSrc = !!this.props.src;
    return (
      <div className="image-cropper">
        <div className="image-container">
          {hasSrc && (
            <img
              ref={this.imageElement}
              src={this.props.src}
              alt="Image Cropper"
            />
          )}
        </div>
        {hasSrc && !this.props.disableCrop && (
          <div className="text-center">
            <Button variant="dark" text="Crop Image" onClick={this.cropImage} />
          </div>
        )}
      </div>
    );
  }
}

ImageCropper.propTypes = propTypes;
ImageCropper.defaultProps = defaultProps;

export default ImageCropper;
