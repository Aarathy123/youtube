import React from "react";
import { connect } from "react-redux";
import AddVideoForm from "./AddVideoForm";
import { startAddVideo, closeNewVideo } from "../actions/video";

class NewVideoPage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (video) => {
    this.props.startAddVideo(video);
  };
  render() {
    return (
      <AddVideoForm
        onSubmit={this.onSubmit}
        openNewVideo={this.props.openNewVideo}
        closeNewVideo={this.props.closeNewVideo}
        isGlobal={this.props.isGlobal}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddVideo: (video) => dispatch(startAddVideo(video)),
  closeNewVideo: () => dispatch(closeNewVideo()),
});

const mapStateToProps = (state) => ({
  openNewVideo: state.video.openNewVideo,
  isGlobal: state.video.isGlobal,
});
export default connect(mapStateToProps, mapDispatchToProps)(NewVideoPage);
