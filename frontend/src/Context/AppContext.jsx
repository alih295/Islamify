import { createContext, useState, useRef, useEffect } from "react";
import { getMusic } from "../Services/musicService"; // 1. Apni service ko import kiya
import { checkAuthSession } from "../Services/authService";

export const MusicContenxt = createContext();

const AppContext = ({ children }) => {
  const BACKEND_URL = "http://localhost:4000";
  // Backups / Placeholders arrays as initial layout configurations
  const [audio, setAudio] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [user, setUser] = useState(null);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await checkAuthSession();
        if (data && data.success) {
          setUser(data.user); // 🎉 Refresh par user automatic restore ho gaya!
        }
      } catch (err) {
        console.log("No active session or token found.");
        setUser(null); // Valid session nahi hai
      } finally {
        setLoading(false); // Check complete ho gaya, loading band
      }
    };

    initAuth();
  }, []);

  // 2. Dynamic Backend Async call function setup kiya (Naming collision se bachne ke liye)
  const getMusicData = async () => {
    try {
      setLoading(true);
      const data = await getMusic(); // Services key methods wrapper trigger

      if (data && data.success) {
        // Safe mappings check if backend contains array list wrapper
        setAudio(data.music || data.tracks || data);
      }
    } catch (err) {
      console.error(
        "Error fetching music list inside context layer:",
        err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // 3. Application initialization lifecycle event hook block
  useEffect(() => {
    getMusicData(); // Automatically fetch on application mounting pipeline phase

    const audio = audioRef.current;
    const setAudioData = () => setDuration(audio.duration || 0);
    const setAudioTime = () => setCurrentTime(audio.currentTime || 0);

    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

 const playTrack = (track) => {
  // MongoDB IDs support check mapping (_id fallback logic)
  const trackId = track.id || track._id;
  const currentPlayingId = nowPlaying?.id || nowPlaying?._id;

  if (currentPlayingId === trackId) {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  } else {
    // 1. Backslashes (\) ko Forward slashes (/) me convert karein
    let cleanPath = track.audioUrl.replace(/\\/g, "/");

    // 2. Check karein agar track.audioUrl me pehle se "uploads/" mojood hai
    let audioPath = "";
    if (cleanPath.startsWith("uploads/")) {
      audioPath = `http://localhost:4000/${cleanPath}`;
    } else {
      audioPath = `http://localhost:4000/uploads/${cleanPath}`;
    }

    console.log("Fixed Audio Path:", audioPath);

    // 3. Audio source set aur play karein
    audioRef.current.src = audioPath;
    audioRef.current.load(); // Browser ko batata hai k source update ho gaya hai
    
    audioRef.current.play()
      .then(() => {
        setNowPlaying(track);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log("Playback error:", err);
      });
  }
};

  const togglePlay = () => {
    if (!nowPlaying) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log(err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <MusicContenxt.Provider
      value={{
        loading,
        setLoading,
        audio, setAudio,
        nowPlaying,
        setNowPlaying,
        isPlaying,
        playTrack,
        togglePlay,
        currentTime,
        duration,
        handleSliderChange,
        user,
        setUser,
        getMusicData,
        error,
        setError,
        audioRef
      }}
    >
      {children}
    </MusicContenxt.Provider>
  );
};

export default AppContext;
