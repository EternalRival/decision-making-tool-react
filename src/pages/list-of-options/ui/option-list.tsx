import { deleteOption, updateOption } from '~/entities/option';
import { useDispatch, useSelector } from '~/shared/lib/redux';
import { UiButton } from '~/shared/ui/ui-button';
import styles from './option-list.module.css';

const TITLE_INPUT_PLACEHOLDER_TEXT = 'Title';
const WEIGHT_INPUT_PLACEHOLDER_TEXT = 'Weight';
const DELETE_BUTTON_TEXT = 'Delete';

export const OptionList = () => {
  const list = useSelector((state) => state.options.list);
  const dispatch = useDispatch();

  return (
    <ul className={styles.list}>
      {list.map((optionData) => (
        <li
          key={optionData.id}
          className={styles.option}
        >
          <label
            htmlFor={`option-${optionData.id}`}
            className={styles.id}
          >
            {optionData.id}
          </label>
          <input
            className={styles.title}
            id={`option-${optionData.id}`}
            value={optionData.title}
            placeholder={TITLE_INPUT_PLACEHOLDER_TEXT}
            onInput={(event) => {
              if (event.target instanceof HTMLInputElement) {
                dispatch(
                  updateOption({
                    id: optionData.id,
                    field: 'title',
                    value: event.target.value,
                  })
                );
              }
            }}
          />
          <input
            type="number"
            className={styles.weight}
            defaultValue={optionData.weight}
            placeholder={WEIGHT_INPUT_PLACEHOLDER_TEXT}
            onInput={(event) => {
              if (event.target instanceof HTMLInputElement) {
                dispatch(
                  updateOption({
                    id: optionData.id,
                    field: 'weight',
                    value: event.target.value,
                  })
                );
              }
            }}
          />
          <UiButton
            type="button"
            onClick={() => {
              dispatch(deleteOption({ id: optionData.id }));
            }}
          >
            {DELETE_BUTTON_TEXT}
          </UiButton>
        </li>
      ))}
    </ul>
  );
};
