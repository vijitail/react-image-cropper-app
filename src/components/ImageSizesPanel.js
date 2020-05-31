import React from "react";
import PropTypes from "prop-types";

import { IMAGE_SIZES as imageSizes } from "../constants";

const propTypes = {
  activeSizeIndex: PropTypes.number,
};

const defaultProps = {
  activeSizeIndex: null,
};

const ImageSizesPanel = ({ activeSizeIndex }) => (
  <nav className="panel is-info w-100">
    <p className="panel-heading">Image Sizes</p>
    {imageSizes.map((size, i) => (
      <div
        className={`panel-block ${activeSizeIndex === i && "is-active"} d-flex`}
        key={size.name}
      >
        <span className="size-name">{size.name}</span>
        <span className="size-dim">
          {size.width} x {size.height}
        </span>
      </div>
    ))}
  </nav>
);

ImageSizesPanel.propTypes = propTypes;
ImageSizesPanel.defaultProps = defaultProps;

export default ImageSizesPanel;
