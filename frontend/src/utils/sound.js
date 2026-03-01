// Uses Web Audio API to generate a soft notification beep
// No external files needed!

export const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    // Create two oscillators for a pleasant two-tone chime
    const playTone = (frequency, startTime, duration) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, startTime);

      // Fade in
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
      // Fade out
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    playTone(880, now, 0.15);         // first tone  — A5
    playTone(1100, now + 0.1, 0.2);   // second tone — C#6

  } catch (err) {
    // Silently fail if browser doesn't support Web Audio API
    console.log("Audio not supported:", err);
  }
};