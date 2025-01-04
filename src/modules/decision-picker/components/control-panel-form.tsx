import clsx from 'clsx';
import { Link } from 'react-router';
import SvgIcon from '~/core/components/svg-icon';
import UiButton from '~/core/components/ui-button';
import { useDispatch, useSelector } from '~/core/store/hooks';
import Route from '~/route.enum';
import { setDuration, toggleMute } from '../store/decision-picker-slice';
import styles from './control-panel-form.module.css';

const BACK_BUTTON_TEXT = 'Back';

const TOGGLE_SOUND_BUTTON_TEXT = 'Toggle sound';

const DURATION_LABEL_TEXT = 'Duration';
const DURATION_INPUT_PLACEHOLDER_TEXT = 'sec';
const DURATION_MIN_VALUE = '5';

const PICK_BUTTON_TEXT = 'Pick';

type ControlPanelFormProps = {
  disabled: boolean;
  onSubmit: (props: { duration: number; sound: boolean }) => void;
};

const ControlPanelForm = ({ disabled, onSubmit }: ControlPanelFormProps) => {
  const { durationValue, soundEnabled } = useSelector((store) => store.decisionPicker);
  const dispatch = useDispatch();

  return (
    <form
      className={clsx(styles.form, disabled && styles.disabled)}
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({ duration: durationValue, sound: soundEnabled });
      }}
    >
      <Link
        className={styles.backButton}
        to={Route.LIST_OF_OPTION}
        title={BACK_BUTTON_TEXT}
        aria-label={BACK_BUTTON_TEXT}
        tabIndex={disabled ? -1 : 0}
      >
        <SvgIcon name="square-arrow-out-up-left" />
      </Link>

      <UiButton
        type="button"
        className={styles.soundButton}
        title={TOGGLE_SOUND_BUTTON_TEXT}
        aria-label={TOGGLE_SOUND_BUTTON_TEXT}
        disabled={disabled}
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
          defaultValue={durationValue}
          required
          placeholder={DURATION_INPUT_PLACEHOLDER_TEXT}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
          onInput={(event) => {
            if (event.target instanceof HTMLInputElement) {
              dispatch(setDuration({ durationValue: Number(event.target.value) }));
            }
          }}
        />
      </label>

      <UiButton
        className={styles.pickButton}
        title={PICK_BUTTON_TEXT}
        aria-label={PICK_BUTTON_TEXT}
        disabled={disabled}
      >
        <SvgIcon name="play" />
      </UiButton>
    </form>
  );
};

export default ControlPanelForm;
