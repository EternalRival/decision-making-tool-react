export const FADE_IN = {
  keyframes: [
    { opacity: 0, pointerEvents: 'none' },
    { opacity: 1, pointerEvents: 'none' },
  ],
  options: { duration: 250, easing: 'ease-in-out' },
};

export const FADE_OUT = {
  keyframes: [
    { opacity: 1, pointerEvents: 'none' },
    { opacity: 0, pointerEvents: 'none' },
  ],
  options: { duration: 150, easing: 'ease-in-out' },
};

type Keyframes = Keyframe[] | PropertyIndexedKeyframes | null;

type KeyframeOptions = KeyframeAnimationOptions;

export async function animateDialog(
  dialog: HTMLDialogElement,
  keyframes: Keyframes,
  options?: KeyframeOptions
): Promise<void> {
  const animations = [
    dialog.animate(keyframes, options),
    dialog.animate(keyframes, { ...options, pseudoElement: '::backdrop' }),
  ];

  await Promise.all(animations.map(({ finished }) => finished));
}
