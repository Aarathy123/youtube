import {login, logout} from '../../actions/auth';

test('should return login type when called with uid', () => {
    const action = login(1);
    expect(action).toEqual({
        type: 'LOGIN',
        uid: 1
    })
})

test('should return logout type', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT',
    })
})