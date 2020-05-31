import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  variant: "default",
};

const Button = ({ variant, text, onClick, ...props }) => (
  <button className={`button is-${variant}`} onClick={onClick} {...props}>
    {text}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
