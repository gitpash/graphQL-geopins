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

    case 'CREATE_PIN':
      const newPin = payload;
      const prevPins = state.pins.filter(({ _id }) => _id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin],
      };
    case 'GET_PINS':
      return {
        ...state,
        pins: payload,
      };
    default:
      return state;
  }
}
