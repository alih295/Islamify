import { MusicContenxt } from "../Context/AppContext";
import { useContext } from "react";
import { uploadMusic } from "../Services/musicService";

const useMusicApi = () => {
  const { user, setUser, loading, setLoading, error, setError } =
    useContext(MusicContenxt);

  const addMusic = async (musicData) => {
    try {
      setLoading(true);
      const data = await uploadMusic(musicData);

      // Agar data mila aur usme success hai toh wo return hoga (true/false)
      return data?.success;
    } catch (err) {
      console.log("Error in addMusic:", err.message);
      return false; // 👈 FIX: Error ke case mein false return karein
    } finally {
      setLoading(false);
    }
  };

  return { addMusic, loading, error };
};

export default useMusicApi;
