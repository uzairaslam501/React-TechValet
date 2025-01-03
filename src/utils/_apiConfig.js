export const getAuthConfig = (getState) => {
  const user = getState()?.authentication?.userAuth;

  if (!user?.token) {
    throw new Error("Authorization token is missing. Please log in again.");
  }

  // Return the config with Authorization header
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };
};

export const getTokenTime = (getState) => {
  const user = getState()?.authentication?.userAuth;

  if (!user?.tokenExpire) {
    throw new Error("Authorization token is missing. Please log in again.");
  }

  return `${user.tokenExpire}`;
};

export const getAuthUserId = (getState) => {
  const user = getState()?.authentication?.userAuth;

  return `${user.id}`;
};

export const getUserRole = (getState) => {
  const { userAuth } = getState()?.authentication;

  return `${userAuth.role}`;
};

export const getToken = (getState) => {
  const user = getState()?.authentication?.userAuth;
  const tokenValues = {
    token: user?.token,
    expired: user?.tokenExpire,
  };
  return tokenValues;
};
