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
        currentPin: null,
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
    case 'SET_PIN':
      return {
        ...state,
        currentPin: payload,
        draft: null,
      };
    case 'GET_PINS':
      return {
        ...state,
        pins: payload,
      };
    case 'DELETE_PIN':
      const deletedPin = payload;
      const filteredPins = state.pins.filter(
        ({ _id }) => _id !== deletedPin._id,
      );
      return {
        ...state,
        pins: filteredPins,
        currentPin: null,
      };
    default:
      return state;
  }
}
