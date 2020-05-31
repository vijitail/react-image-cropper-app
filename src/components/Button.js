import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const defaultProps = {
  variant: "default",
  disabled: false,
};

const Button = ({ variant, text, disabled, onClick, ...props }) => (
  <button
    className={`button is-${variant}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {text}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
