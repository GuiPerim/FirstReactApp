import { Component } from "react";

import "./styles.css";

export class Button extends Component {
  render() {
    const { text, eventClick, disabled } = this.props;
    return (
      <button className="button" onClick={eventClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}
