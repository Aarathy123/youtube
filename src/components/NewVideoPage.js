import React from "react";
import { connect } from "react-redux";
import AddVideoForm from "./AddVideoForm";
import { startAddVideo } from "../actions/video";

class NewVideoPage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (video) => {
    this.props.startAddVideo(video);
    this.props.history.push("/");
  };
  render() {
    return <AddVideoForm onSubmit={this.onSubmit} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddVideo: (video) => dispatch(startAddVideo(video)),
});

export default connect(undefined, mapDispatchToProps)(NewVideoPage);
