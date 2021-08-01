import authReducer from "../../reducers/auth";

test('should return uid with type for Login', () => {
    const action = {
        type: 'LOGIN',
        uid: 1
    }
    const state = authReducer({}, action);
    expect(state).toEqual({uid: 1})
})

test('should return empty array for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({}, action);
    expect(state).toEqual({})
})