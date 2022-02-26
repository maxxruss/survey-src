export const authDataLoaded = (data) => {
  return {
    type: "FETCH_AUTH_SUCCESS",
    payload: data,
  };
};

export const authDataError = (error) => {
  return {
    type: "FETCH_AUTH_FAILURE",
    payload: error,
  };
};

export const authLogOut = () => {
  return {
    type: "AUTH_LOGOUT",
  };
};