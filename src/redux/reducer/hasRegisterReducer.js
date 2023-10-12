const INITIAL_STATE = false

export const hasRegisterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "HAS_REGISTER":
        return action.payload;
      default:
        return state;
    }
  };