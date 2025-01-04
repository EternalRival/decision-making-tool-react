import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { APP_NAME, SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import { useSelector } from '~/core/store/hooks';
import Route from '~/route.enum';
import ControlPanelForm from '../components/control-panel-form';
import Wheel from '../components/wheel';
import RotationStatus from '../model/rotation-status.enum';
import styles from './decision-picker.module.css';

const DecisionPicker = () => {
  const navigate = useNavigate();

  const optionList = useSelector((store) => store.options.list);

  const isPlayable =
    optionList.filter((option) => Boolean(option.title) && Number(option.weight) > 0).length >= SLICE_LIST_MIN_LENGTH;

  const [isControlDisabled, setIsControlDisabled] = useState(false);

  useEffect(() => {
    if (!isPlayable) {
      void navigate(Route.LIST_OF_OPTION);
    }
  }, [isPlayable, navigate]);

  return (
    isPlayable && (
      <main className={styles.main}>
        <h1 className={styles.heading}>{APP_NAME}</h1>

        <ControlPanelForm disabled={isControlDisabled} />

        <Wheel
          onRotationStatusChange={(rotationStatus) => {
            setIsControlDisabled(rotationStatus === RotationStatus.PICKING);
          }}
        />
      </main>
    )
  );
};

export default DecisionPicker;
