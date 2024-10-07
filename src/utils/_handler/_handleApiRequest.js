import { handleApiError, processApiResponse } from "./_exceptions";

export const handleApiRequest = async (
  requestFn,
  dispatch,
  tokenExpiryTime = null
) => {
  try {
    const response = await requestFn();
    const responseBack = processApiResponse(
      response,
      dispatch,
      tokenExpiryTime
    );
    return responseBack;
  } catch (error) {
    // Handle and throw the error
    handleApiError(error?.response?.data || error, dispatch, tokenExpiryTime);
    throw error;
  }
};
