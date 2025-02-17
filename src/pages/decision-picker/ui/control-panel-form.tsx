import clsx from 'clsx';
import { Link } from 'react-router';
import { useDispatch, useSelector } from '~/shared/lib/redux';
import { Route } from '~/shared/routes';
import { SvgIcon } from '~/shared/ui/svg-icon';
import { UiButton } from '~/shared/ui/ui-button';
import { setDuration, toggleMute } from '../model/decision-picker-slice';
import { rotationEmitter } from '../model/rotation-emitter';
import styles from './control-panel-form.module.css';

const BACK_BUTTON_TEXT = 'Back';

const SOUND_FIELD_NAME = 'sound';
const TOGGLE_SOUND_BUTTON_TEXT = 'Toggle sound';

const DURATION_FIELD_NAME = 'duration';
const DURATION_LABEL_TEXT = 'Duration';
const DURATION_INPUT_PLACEHOLDER_TEXT = 'sec';
const DURATION_MIN_VALUE = '5';

const PICK_BUTTON_TEXT = 'Pick';

type ControlPanelFormProps = {
  disabled: boolean;
};

const DurationField = ({ disabled }: { disabled: boolean }) => {
  const durationValue = useSelector((store) => store.decisionPicker.durationValue);
  const dispatch = useDispatch();

  return (
    <label
      className={styles.durationLabel}
      title={DURATION_LABEL_TEXT}
      aria-label={DURATION_LABEL_TEXT}
    >
      <SvgIcon name="timer" />
      <input
        className={styles.durationInput}
        type="number"
        name={DURATION_FIELD_NAME}
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
  );
};

const SoundField = ({ disabled }: { disabled: boolean }) => {
  const soundEnabled = useSelector((store) => store.decisionPicker.soundEnabled);
  const dispatch = useDispatch();

  return (
    <label
      className={styles.soundLabel}
      title={TOGGLE_SOUND_BUTTON_TEXT}
    >
      <input
        className={styles.soundInput}
        type="checkbox"
        name={SOUND_FIELD_NAME}
        disabled={disabled}
        defaultChecked={soundEnabled}
        onChange={(event) => {
          if (event.target instanceof HTMLInputElement) {
            dispatch(toggleMute());
          }
        }}
      />
      <SvgIcon name={soundEnabled ? 'volume-2' : 'volume-off'} />
    </label>
  );
};

export const ControlPanelForm = ({ disabled }: ControlPanelFormProps) => (
  <form
    className={clsx(styles.form, disabled && styles.disabled)}
    onSubmit={(event) => {
      event.preventDefault();

      if (event.target instanceof HTMLFormElement) {
        const formData = new FormData(event.target);

        const durationValue = Number(formData.get(DURATION_FIELD_NAME));
        const soundEnabled = Boolean(formData.get(SOUND_FIELD_NAME));

        rotationEmitter.emit({ durationValue, soundEnabled });
      }
    }}
  >
    <Link
      className={styles.backButton}
      to={Route.LIST_OF_OPTION}
      title={BACK_BUTTON_TEXT}
      aria-label={BACK_BUTTON_TEXT}
      tabIndex={disabled ? -1 : 0}
    >
      <SvgIcon name="undo-2" />
    </Link>

    <SoundField disabled={disabled} />

    <DurationField disabled={disabled} />

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
