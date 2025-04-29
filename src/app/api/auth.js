import axiosApi from "../../../utils/axios";

export const signIn = async (username, password) => {
  if (!username || !password) return false;
  try {
    const response = await axiosApi.post("/auth/signin", {
      username: username,
      password: password,
    });
    console.log("REsponse", response);
    return response.data;
  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};
