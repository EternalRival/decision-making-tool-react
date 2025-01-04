import TA_DA_SOUND_SRC from '~/assets/sounds/ta-da.mp3';

const audio = Object.assign(new Audio(TA_DA_SOUND_SRC), { volume: 0.5 });

export default function playTaDaSound(): Promise<void> {
  audio.currentTime = 0;

  return audio.play();
}
