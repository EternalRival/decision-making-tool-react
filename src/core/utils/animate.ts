import clampValue from './clamp-value';

export default function animate({
  duration,
  easingFn,
  onFrameChange,
  onFinish,
}: {
  duration: number;
  easingFn: (progress: number) => number;
  onFrameChange: (progress: number) => void;
  onFinish: () => void;
}): void {
  const start = performance.now();

  const callback: FrameRequestCallback = (time) => {
    const timeProgress = clampValue(0, (time - start) / (duration * 1000), 1);

    const animationProgress = easingFn(timeProgress);

    onFrameChange(animationProgress);

    if (timeProgress < 1) {
      requestAnimationFrame(callback);
    } else {
      onFinish();
    }
  };

  requestAnimationFrame(callback);
}
