import axios from "axios";

export const getErrorResponse = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message[0];
    } else {
      return "An unknown error occurred.";
    }
  }
};
