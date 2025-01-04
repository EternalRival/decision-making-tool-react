import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { APP_NAME, SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import { useSelector } from '~/core/store/hooks';
import type { OptionData } from '~/core/store/options-slice';
import getRandomColor from '~/core/utils/get-random-color';
import getRandomNumber from '~/core/utils/get-random-number';
import Route from '~/route.enum';
import ControlPanelForm from '../components/control-panel-form';
import Wheel, { type OptionSlice } from '../components/wheel';
import styles from './decision-picker.module.css';

const PICKED_OPTION_INITIAL_TEXT = 'Press start button'.toUpperCase();

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

const DecisionPicker = () => {
  const navigate = useNavigate();

  const optionList = useSelector((store) => store.options.list);

  const sliceList = createOptionSliceList(
    optionList.filter((option) => Boolean(option.title) && Number(option.weight) > 0).sort(() => getRandomNumber(-1, 1))
  );

  const isPlayable = sliceList.length >= SLICE_LIST_MIN_LENGTH;

  const [rotation, setRotation] = useState(0);
  const [pickedOption, setPickedOption] = useState(PICKED_OPTION_INITIAL_TEXT);
  const [isPicked, setIsPicked] = useState(false);

  void [setRotation, setPickedOption, setIsPicked];

  useEffect(() => {
    if (!isPlayable) {
      void navigate(Route.LIST_OF_OPTION);
    }
  }, [isPlayable, navigate]);

  return (
    isPlayable && (
      <main className={styles.main}>
        <h1 className={styles.heading}>{APP_NAME}</h1>

        <ControlPanelForm
          onSubmit={({ duration, sound }) => {
            console.log({ duration, sound });
          }}
        />

        <p className={clsx(styles.pickedOption, isPicked && styles.picked)}>{pickedOption}</p>

        <Wheel
          rotation={rotation}
          optionSliceList={sliceList}
        />
      </main>
    )
  );
};

export default DecisionPicker;
