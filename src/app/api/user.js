import axiosApi from "../../../utils/axios";
import axios from "axios";

export const getProfile = async () => {
  try {
    const response = await axiosApi.get("/user/getInfo");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const swapToken = async (from, to, amount) => {
  try {
    const response = await axiosApi.post("/user/swap", {
      from: from,
      to: to,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getExchangeRate = async (base, quote) => {
  try {
    let APIKEY = process.env.NEXT_PUBLIC_COINAPI_KEY;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://rest.coinapi.io/v1/exchangerate/${base}/${quote}`,
      headers: {
        Accept: "text/plain",
        "X-CoinAPI-Key": APIKEY,
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data; // 确保返回数据
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null; // 出错时返回 null
  }
};
