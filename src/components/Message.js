import React from "react";

const Message = ({ variant, title, text }) => (
  <article className={`w-100 message is-${variant}`}>
    <div className="message-header">
      <p>{title}</p>
    </div>
    <div className="message-body">{text}</div>
  </article>
);

export default Message;
