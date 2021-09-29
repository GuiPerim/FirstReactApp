import { Component } from "react";

export class Button extends Component {
  render() {
    const { text, eventClick } = this.props;
    return <button onClick={eventClick}>{text}</button>;
  }
}
