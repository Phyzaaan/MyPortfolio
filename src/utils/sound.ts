// src/utils/sounds.ts

interface SoundOptions {
  isEnabled?: boolean;
  volume?: number;
  speed?: number;
  time?: number;
}

// Our Maestro's list now needs to know the NAME of the sound, too!
// So we store it as an object.
let currentlyPlaying: { source: string; audio: HTMLAudioElement }[] = [];

// This function still Works for muting everything, so we'll keep it!
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
  
  // Before we play a new sound, let's check if the SAME sound is already playing.
  const existingSound = currentlyPlaying.find(p => p.source === soundFile);
  if (existingSound) {
    // If we find one, we stop just that one!
    existingSound.audio.pause();
    existingSound.audio.currentTime = 0;
    // And we remove it from the list.
    currentlyPlaying = currentlyPlaying.filter(p => p.audio !== existingSound.audio);
  }

  // Now, we create and play the new sound like normal.
  const audio = new Audio(soundFile);
  audio.volume = volume;
  audio.playbackRate = speed;
  audio.currentTime = time;

  audio.addEventListener('ended', () => {
    // This part is the same: when a sound finishes, it removes itself.
    currentlyPlaying = currentlyPlaying.filter(p => p.audio !== audio);
  });
  
  // Add our new sound (with its name!) to the list.
  currentlyPlaying.push({ source: soundFile, audio: audio });
  
  audio.play().catch(error => {
    console.log("Audio playback failed.", error);
    // If playback fails, also remove it.
    currentlyPlaying = currentlyPlaying.filter(p => p.audio !== audio);
  });
};