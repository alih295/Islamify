import { createContext, useState, useRef, useEffect } from "react";

export const MusicContenxt = createContext();

const AppContext = ({ children }) => {
  const [naats, setNaats] = useState([
    {
      id: 1,
      title: "Faslon Ko Takalluf Hai Humse Agar",
      artistName: "Qari Waheed Zafar Qasmi",
      bannerImg: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Zaheer-e-Muqaddar Jo Huzoor",
      artistName: "Qari Waheed Zafar Qasmi",
      bannerImg: "https://images.unsplash.com/photo-1590075865003-e48277afd55d?q=80&w=400&auto=format&fit=crop",
      audioUrl: "https://naatsharif.com/download/6134/Zahir-E-Muqaddar.mp3",
    },
    {
      id: 3,
      title: "Tajdar-e-Haram",
      artistName: "Atif Aslam (Coke Studio)",
      bannerImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop",
      audioUrl: "https://pub-c5e31b5cdafb419a824e6939b08bc84f.r2.dev/Tajdar-e-Haram.mp3",
    },
    {
      id: 4,
      title: "Main To Ummati Hoon",
      artistName: "Junaid Jamshed",
      bannerImg: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=400&auto=format&fit=crop",
      audioUrl: "https://ia601402.us.archive.org/27/items/AbdallahKamelSura107AlMaoon_201906/Junaid%20Jamshed_%20Main%20To%20Ummati%20Hoon.mp3",
    },
    {
      id: 5,
      title: "Ilahi Teri Chaukhat Par",
      artistName: "Junaid Jamshed",
      bannerImg: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop",
      audioUrl: "https://ia601402.us.archive.org/27/items/AbdallahKamelSura107AlMaoon_201906/Junaid%20Jamshed_%20Makkah%20Yaad%20Aata%20Hai.mp3",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio ke time track karne ke liye states
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [user , setUser] = useState(null)

  const audioRef = useRef(new Audio());

  // Listen to Audio Events
  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => setDuration(audio.duration || 0);
    const setAudioTime = () => setCurrentTime(audio.currentTime || 0);
    
    // Automatic next track ya stop karne ke liye jab naat khatam ho jaye
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
    if (nowPlaying?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.log(err));
        setIsPlaying(true);
      }
    } else {
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => console.log(err));
      setNowPlaying(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!nowPlaying) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log(err));
    }
    setIsPlaying(!isPlaying);
  };

  // Slider ko manually change (seek) karne ka function
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
        naats,
        setNaats,
        nowPlaying,
        setNowPlaying,
        isPlaying,
        playTrack,
        togglePlay,
        currentTime,
        duration,
        handleSliderChange,
        user,
        setUser
      }}
    >
      {children}
    </MusicContenxt.Provider>
  );
};

export default AppContext;