import React from "react";
import { connect } from "react-redux";
import SignUpForm from "./SignUpForm";
import { startAddUser, startCheckUser } from "../actions/users";

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (user) => {
    this.props.startAddUser(user);
    this.props.history.push("/");
  };
  render() {
    return (
      <SignUpForm
        onSubmit={this.onSubmit}
        userPresent={this.props.userPresent}
        startCheckUser={this.props.startCheckUser}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddUser: (user) => dispatch(startAddUser(user)),
  startCheckUser: (user) => dispatch(startCheckUser(user)),
});
const mapStateToProps = (state) => ({
  userPresent: state.user.userPresent,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
