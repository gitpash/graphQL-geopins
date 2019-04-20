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

    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          longitude: 0,
          latitude: 0,
        },
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null,
      };
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload,
      };

    default:
      return state;
  }
}
