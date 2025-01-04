import { lazy, useState } from 'react';
import { useNavigate } from 'react-router';
import UiButton from '~/core/components/ui-button';
import { APP_NAME, OPTIONS_JSON_FILE_NAME, SLICE_LIST_MIN_LENGTH } from '~/core/models/constants';
import optionsStateSchema from '~/core/schemas/options-state.schema';
import { useDispatch, useSelector } from '~/core/store/hooks';
import { addOption, clearOptions, replaceOptions } from '~/core/store/options-slice';
import Route from '~/route.enum';
import OptionList from '../components/option-list';
import styles from './list-of-options.module.css';

const PasteOptionListDialog = lazy(() => import('../components/paste-option-list-dialog'));
const WarningDialog = lazy(() => import('../components/warning-dialog'));

const ADD_BUTTON_TEXT = 'Add Option';
const PASTE_MODE_BUTTON_TEXT = 'Paste list';
const CLEAR_LIST_BUTTON_TEXT = 'Clear list';
const SAVE_LIST_TO_FILE_BUTTON_TEXT = 'Save list to file';
const LOAD_LIST_FROM_FILE_BUTTON_TEXT = 'Load list from file';
const START_BUTTON_TEXT = 'Start';

const ListOfOptions = () => {
  const { lastId, list } = useSelector((state) => state.options);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pasteModalOpen, setPasteModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>{APP_NAME}</h1>

      <OptionList />

      <UiButton
        className={styles.addOptionButton}
        onClick={() => {
          dispatch(addOption({ title: '', weight: '' }));
        }}
      >
        {ADD_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.pasteListButton}
        onClick={() => {
          setPasteModalOpen(true);
        }}
      >
        {PASTE_MODE_BUTTON_TEXT}
      </UiButton>
      <PasteOptionListDialog
        open={pasteModalOpen}
        onClose={() => {
          setPasteModalOpen(false);
        }}
        onConfirm={(options) => {
          options.forEach(([title, weight]) => dispatch(addOption({ title, weight })));
        }}
      />

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
          }).then((data) => dispatch(replaceOptions(optionsStateSchema.parse(JSON.parse(data)))));
        }}
      >
        {LOAD_LIST_FROM_FILE_BUTTON_TEXT}
      </UiButton>

      <UiButton
        className={styles.startButton}
        onClick={() => {
          const isPlayable =
            list.filter((option) => Boolean(option.title) && Number(option.weight) > 0).length >= SLICE_LIST_MIN_LENGTH;

          if (isPlayable) {
            void navigate(Route.DECISION_PICKER);
          } else {
            setWarningModalOpen(true);
          }
        }}
      >
        {START_BUTTON_TEXT}
      </UiButton>
      <WarningDialog
        open={warningModalOpen}
        onClose={() => {
          setWarningModalOpen(false);
        }}
      />
    </main>
  );
};

export default ListOfOptions;
