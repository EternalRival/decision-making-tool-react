import { Link } from 'react-router';
import UiButton from '~/core/components/ui-button';
import Route from '~/route.enum';
import styles from './control-panel-form.module.css';
import SvgIcon from '~/core/components/svg-icon';
import { toggleMute } from '../store/sound-slice';
import { useState } from 'react';
import { useDispatch, useSelector } from '~/core/store/hooks';

const BACK_BUTTON_TEXT = 'Back';

const TOGGLE_SOUND_BUTTON_TEXT = 'Toggle sound';

const DURATION_LABEL_TEXT = 'Duration';
const DURATION_INPUT_PLACEHOLDER_TEXT = 'sec';
const DURATION_MIN_VALUE = '5';
const DURATION_INITIAL_VALUE = '16';

const PICK_BUTTON_TEXT = 'Pick';

type ControlPanelFormProps = { onSubmit: (props: { duration: number; sound: boolean }) => void };

const ControlPanelForm = ({ onSubmit }: ControlPanelFormProps) => {
  const [duration, setDuration] = useState(DURATION_INITIAL_VALUE);
  const soundEnabled = useSelector((store) => store.sound.soundEnabled);
  const dispatch = useDispatch();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({ duration: Number(duration), sound: soundEnabled });
      }}
    >
      <Link
        className={styles.backButton}
        to={Route.LIST_OF_OPTION}
        title={BACK_BUTTON_TEXT}
        aria-label={BACK_BUTTON_TEXT}
      >
        <SvgIcon name="square-arrow-out-up-left" />
      </Link>

      <UiButton
        className={styles.soundLabel}
        title={TOGGLE_SOUND_BUTTON_TEXT}
        aria-label={TOGGLE_SOUND_BUTTON_TEXT}
        onClick={() => {
          dispatch(toggleMute());
        }}
      >
        <SvgIcon name={soundEnabled ? 'volume-2' : 'volume-off'} />
      </UiButton>

      <label
        className={styles.durationLabel}
        title={DURATION_LABEL_TEXT}
        aria-label={DURATION_LABEL_TEXT}
      >
        <SvgIcon name="timer" />
        <input
          className={styles.durationInput}
          type="number"
          min={DURATION_MIN_VALUE}
          defaultValue={duration}
          required
          placeholder={DURATION_INPUT_PLACEHOLDER_TEXT}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
          onInput={(event) => {
            if (event.target instanceof HTMLInputElement) {
              setDuration(event.target.value);
            }
          }}
        />
      </label>

      <UiButton
        className={styles.pickButton}
        title={PICK_BUTTON_TEXT}
        aria-label={PICK_BUTTON_TEXT}
      >
        <SvgIcon name="play" />
      </UiButton>
    </form>
  );
};

export default ControlPanelForm;
