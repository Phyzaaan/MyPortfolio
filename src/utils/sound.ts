interface SoundOptions {
  isEnabled?: boolean;
  volume?: number;
  speed?: number;
  time?: number;
  stopSounds?: boolean;
}

let currentlyPlaying: { source: string; audio: HTMLAudioElement }[] = [];

export const stopAllSounds = () => {
  currentlyPlaying.forEach(p => {
    p.audio.pause();
    p.audio.currentTime = 0;
  });
  currentlyPlaying = [];
};

export const playSound = (soundFile: string, options: SoundOptions = {}) => {
  const { isEnabled = true, volume = 1.0, speed = 1.0 , time = 0} = options;

  if (!isEnabled) {
    return;
  }
  const audio = new Audio(soundFile);
  audio.volume = volume;
  audio.playbackRate = speed;
  audio.currentTime = time;

  audio.addEventListener('ended', () => {
    currentlyPlaying = currentlyPlaying.filter(p => p.audio !== audio);
  });
  
  currentlyPlaying.push({ source: soundFile, audio: audio });
  
  audio.play().catch(error => {
    console.log("Audio playback failed.", error);
    currentlyPlaying = currentlyPlaying.filter(p => p.audio !== audio);
  });
};