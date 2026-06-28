import { api } from "../Api/api";

export const getMusic = async () => {
  try {
    const response = await api.get("/music/get");
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const uploadMusic = async (musicData) => {
  try {
    const response = await api.post("/music/create", musicData);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
