import axios from "axios";

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      "An error occurred while processing the request."
    );
  }

  return "unexpected error";
};
