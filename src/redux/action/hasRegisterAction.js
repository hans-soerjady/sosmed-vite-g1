import { HAS_REGISTER } from "../reducer/type";

export const hasRegisterAction = (data) => {
    return {
      type: HAS_REGISTER,
      payload: data,
    };
  };