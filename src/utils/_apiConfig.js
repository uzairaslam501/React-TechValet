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

export const getAuthToken = (getState) => {
  const user = getState()?.authentication?.userAuth;

  if (!user?.tokenExpiry) {
    throw new Error("Authorization token is missing. Please log in again.");
  }

  return `${user.tokenExpiry}`;
};

export const getAuthUserId = (getState) => {
  const user = getState()?.authentication?.userAuth;

  return `${user.id}`;
};
