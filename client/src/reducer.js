export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'DEFINE_MEDIA_QUERY':
      return {
        ...state,
        mobileSize: payload,
      };

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
      const isCurrentPin = deletedPin._id === state.currentPin._id;

      return {
        ...state,
        pins: filteredPins,
        currentPin: isCurrentPin ? null : state.currentPin,
      };
    case 'CREATE_COMMENT':
      const updatedCurrentPin = payload;
      console.log('updatedCurrentPin: ', updatedCurrentPin);
      const updatedPins = state.pins.map(pin =>
        pin._id === updatedCurrentPin._id ? updatedCurrentPin : pin,
      );
      return {
        ...state,
        pins: updatedPins,
        currentPin: updatedCurrentPin,
      };
    default:
      return state;
  }
}
