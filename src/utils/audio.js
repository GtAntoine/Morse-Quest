import { BASE_TIMINGS } from './constants.js';

export class AudioFeedback {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  playDot(speedMultiplier = 1) {
    this.playBeep(600, BASE_TIMINGS.DOT * speedMultiplier);
  }

  playDash(speedMultiplier = 1) {
    this.playBeep(600, BASE_TIMINGS.DASH * speedMultiplier);
  }

  playBeep(frequency, duration) {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.value = 0.1;

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }
}