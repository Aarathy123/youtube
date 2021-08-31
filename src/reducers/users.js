const usersReducerDefaultState = [];
export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case "USER_PRESENT":
      return { userPresent: true };
    case "NO_USER_PRESENT":
      return { userPresent: false };
    case "NO_LOGIN_EXISTS":
      return { noLoginExists: true };
    default:
      return state;
  }
};
