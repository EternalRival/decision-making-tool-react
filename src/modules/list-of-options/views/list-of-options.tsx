import { APP_NAME, OPTIONS_JSON_FILE_NAME } from '~/core/models/constants';
import OptionList from '../components/option-list';
import styles from './list-of-options.module.css';
import { useDispatch, useSelector } from '~/core/store/hooks';
import UiButton from '~/core/components/ui-button';
import { clearOptions, createOption, parseOptions, replaceOptions } from '~/core/store/options-slice';
import { Link } from 'react-router';
import Route from '~/route.enum';

const ADD_BUTTON_TEXT = 'Add Option';
const PASTE_MODE_BUTTON_TEXT = 'Paste list';
const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
const START_BUTTON_TEXT = 'Start';

const ListOfOptions = () => {
  const { lastId, list } = useSelector((state) => state.options);
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>{APP_NAME}</h1>

      <OptionList />

      <UiButton
        className={styles.addOptionButton}
        onClick={() => {
          dispatch(createOption());
        }}
      >
        {ADD_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.pasteListButton}
        onClick={() => {
          // todo modal
        }}
      >
        {PASTE_MODE_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.clearListButton}
        onClick={() => {
          dispatch(clearOptions());
        }}
      >
        {CLEAR_LIST_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.saveListButton}
        onClick={() => {
          Object.assign(document.createElement('a'), {
            download: OPTIONS_JSON_FILE_NAME,
            href: URL.createObjectURL(new Blob([JSON.stringify({ list, lastId })])),
          }).click();
        }}
      >
        {SAVE_LIST_TO_FILE_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.loadListButton}
        onClick={() => {
          void new Promise<string>((res) => {
            Object.assign(document.createElement('input'), {
              type: 'file',
              accept: '.json',
              onchange: (event: Event) => {
                if (event.target instanceof HTMLInputElement) {
                  void event.target.files?.item(0)?.text().then(res);
                }
              },
            }).click();
          }).then((data) => dispatch(replaceOptions(parseOptions(JSON.parse(data)))));
        }}
      >
        {LOAD_LIST_FROM_FILE_BUTTON_TEXT}
      </UiButton>

      <Link
        className={styles.startButton}
        to={Route.DECISION_PICKER}
      >
        {START_BUTTON_TEXT}
      </Link>
    </main>
  );
};

export default ListOfOptions;
