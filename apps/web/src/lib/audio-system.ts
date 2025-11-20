/**
 * Cyberpunk Audio System
 * Manages ambient sounds, UI feedback, and background music
 */

import { loadAudio, ASSET_URLS } from './asset-loader';

export type SoundType = 'hover' | 'click' | 'success' | 'error' | 'ambient';

interface AudioSystemConfig {
  enabled: boolean;
  volume: number;
  ambientVolume: number;
}

class AudioSystem {
  private config: AudioSystemConfig = {
    enabled: false,
    volume: 0.3,
    ambientVolume: 0.15,
  };

  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private ambientSound: HTMLAudioElement | null = null;
  private initialized = false;

  /**
   * Initialize the audio system
   * Must be called after user interaction (browser autoplay policy)
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Load all sound effects
      await Promise.allSettled([
        this.loadSound('hover'),
        this.loadSound('click'),
        this.loadSound('success'),
        this.loadSound('error'),
      ]);

      this.initialized = true;
      // Audio system initialized successfully
    } catch (error) {
      console.error('Failed to initialize audio system:', error);
    }
  }

  private async loadSound(type: SoundType): Promise<void> {
    try {
      const audio = await loadAudio(ASSET_URLS.audio[type]);
      audio.volume = this.config.volume;
      this.sounds.set(type, audio);
    } catch (error) {
      console.warn(`Failed to load ${type} sound:`, error);
    }
  }

  /**
   * Play a sound effect
   */
  play(type: SoundType, volumeOverride?: number): void {
    if (!this.config.enabled || !this.initialized) return;

    const sound = this.sounds.get(type);
    if (!sound) return;

    try {
      // Clone the audio to allow overlapping sounds
      const clone = sound.cloneNode() as HTMLAudioElement;
      clone.volume = volumeOverride ?? this.config.volume;
      clone.play().catch((error) => {
        console.warn(`Failed to play ${type} sound:`, error);
      });
    } catch (error) {
      console.warn(`Error playing ${type} sound:`, error);
    }
  }

  /**
   * Start ambient background music (looped)
   */
  async startAmbient(): Promise<void> {
    if (!this.config.enabled || this.ambientSound) return;

    try {
      this.ambientSound = await loadAudio(ASSET_URLS.audio.ambient);
      this.ambientSound.volume = this.config.ambientVolume;
      this.ambientSound.loop = true;
      await this.ambientSound.play();
    } catch (error) {
      console.warn('Failed to start ambient sound:', error);
    }
  }

  /**
   * Stop ambient background music
   */
  stopAmbient(): void {
    if (this.ambientSound) {
      this.ambientSound.pause();
      this.ambientSound.currentTime = 0;
      this.ambientSound = null;
    }
  }

  /**
   * Toggle audio system on/off
   */
  toggle(): boolean {
    this.config.enabled = !this.config.enabled;
    if (!this.config.enabled) {
      this.stopAmbient();
    }
    return this.config.enabled;
  }

  /**
   * Enable audio system
   */
  enable(): void {
    this.config.enabled = true;
    if (!this.initialized) {
      this.initialize();
    }
  }

  /**
   * Disable audio system
   */
  disable(): void {
    this.config.enabled = false;
    this.stopAmbient();
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume = this.config.volume;
    });
  }

  /**
   * Set ambient music volume (0-1)
   */
  setAmbientVolume(volume: number): void {
    this.config.ambientVolume = Math.max(0, Math.min(1, volume));
    if (this.ambientSound) {
      this.ambientSound.volume = this.config.ambientVolume;
    }
  }

  /**
   * Get current audio system status
   */
  getStatus(): AudioSystemConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const audioSystem = new AudioSystem();

// Convenience hooks for React components
export function useAudioSystem() {
  const playHover = () => audioSystem.play('hover', 0.15);
  const playClick = () => audioSystem.play('click', 0.25);
  const playSuccess = () => audioSystem.play('success', 0.35);
  const playError = () => audioSystem.play('error', 0.35);

  return {
    playHover,
    playClick,
    playSuccess,
    playError,
    enable: () => audioSystem.enable(),
    disable: () => audioSystem.disable(),
    toggle: () => audioSystem.toggle(),
    setVolume: (volume: number) => audioSystem.setVolume(volume),
    startAmbient: () => audioSystem.startAmbient(),
    stopAmbient: () => audioSystem.stopAmbient(),
  };
}
