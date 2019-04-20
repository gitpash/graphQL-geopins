export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload.me,
        isAuth: payload.isLoggedIn,
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
case 'CREATE_DRAFT': {
  
}
    default:
      return state;
  }
}
