const playSound = (soundUrl: string): void => {
  try {
    const audio = new Audio(soundUrl);
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};

export default playSound;
