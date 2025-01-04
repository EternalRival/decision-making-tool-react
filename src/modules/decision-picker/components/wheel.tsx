import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { OptionData } from '~/core/schemas/options-state.schema';
import { useSelector } from '~/core/store/hooks';
import animate from '~/core/utils/animate';
import easeInOut from '~/core/utils/ease-in-out';
import getRandomColor from '~/core/utils/get-random-color';
import shuffle from '~/core/utils/shuffle';
import { CANVAS_SIZE, CIRCLE } from '../model/constants';
import type { OptionSlice } from '../model/option-slice.type';
import RotationStatus from '../model/rotation-status.enum';
import type { DecisionPickerState } from '../schemas/decision-picker-state.schema';
import drawWheel from '../utils/draw-wheel';
import playTaDaSound from '../utils/play-ta-da-sound';
import rotationEmitter from '../utils/rotation-emitter';
import styles from './wheel.module.css';

const PICKED_OPTION_INITIAL_TEXT = 'Press start button'.toUpperCase();

const CANVAS_TEXT = 'Decision Picker Wheel';

function createOptionSliceList(optionDataList: OptionData[]): OptionSlice[] {
  const total = optionDataList.reduce((acc, { weight }) => acc + Number(weight), 0);
  const offset = { value: 0 };

  return optionDataList.map(({ id, title, weight }) => {
    const color = getRandomColor();
    const startAngle = offset.value;
    const endAngle = offset.value + (Number(weight) / total) * 2 * Math.PI;

    offset.value = endAngle;

    return { id, title, color, startAngle, endAngle };
  });
}

function getTitleByRadian(sliceList: OptionSlice[], radian: number) {
  const CIRCLE = 2 * Math.PI;
  const offset = CIRCLE - (radian % CIRCLE);

  const slice =
    sliceList.find(({ startAngle, endAngle }) => offset >= startAngle && offset <= endAngle) ?? sliceList.at(-1);

  if (!slice) {
    throw new Error('Option slice not found');
  }

  return slice.title;
}

type WheelProps = {
  onRotationStatusChange: (rotationStatus: RotationStatus) => void;
};

const Wheel = ({ onRotationStatusChange }: WheelProps) => {
  const optionList = useSelector((store) => store.options.list);

  const sliceList = useMemo(
    () =>
      createOptionSliceList(shuffle(optionList.filter((option) => Boolean(option.title) && Number(option.weight) > 0))),
    [optionList]
  );

  const [rotationStatus, setRotationStatus] = useState(RotationStatus.INITIAL);
  const [pickedOption, setPickedOption] = useState(PICKED_OPTION_INITIAL_TEXT);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    onRotationStatusChange(rotationStatus);
  }, [onRotationStatusChange, rotationStatus]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      drawWheel({ ctx, sliceList, rotation: (rotation + CIRCLE * 0.75) % CIRCLE });
    }
  }, [rotation, sliceList]);

  useEffect(() => {
    function handleRotation({ durationValue, soundEnabled }: DecisionPickerState) {
      setRotationStatus(RotationStatus.PICKING);

      const targetRotationOffset = CIRCLE * Math.random();

      const fullTurnsRotation = durationValue * CIRCLE;
      const targetRotation = fullTurnsRotation + targetRotationOffset;

      animate({
        duration: durationValue,
        easingFn: easeInOut,
        onFrameChange: (progress) => {
          const rotation = progress * targetRotation;

          setRotation(rotation);
          setPickedOption(getTitleByRadian(sliceList, rotation));
        },
        onFinish: () => {
          setRotation(targetRotation);
          setRotationStatus(RotationStatus.PICKED);

          if (canvasRef.current && soundEnabled) {
            void playTaDaSound();
          }
        },
      });
    }

    rotationEmitter.on(handleRotation);

    return () => {
      rotationEmitter.off(handleRotation);
    };
  }, [sliceList]);

  return (
    <>
      <p className={clsx(styles.pickedOption, rotationStatus === RotationStatus.PICKED && styles.picked)}>
        {pickedOption}
      </p>

      <canvas
        ref={canvasRef}
        className={styles.wheelCanvas}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
      >
        {CANVAS_TEXT}
      </canvas>
    </>
  );
};

export default Wheel;
