import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import UiButton from '~/core/components/ui-button';
import animateDialog, { FADE_IN, FADE_OUT } from '~/core/utils/animate-dialog';
import styles from './paste-option-list-dialog.module.css';

const TEXTAREA_EXAMPLE_VALUE = `
title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with "quotes",4   -> | title with "quotes"   | 4 |
`.trim();

const TEXT_AREA_PLACEHOLDER_TEXT = `Paste a list of new options in a CSV-like format:\n\n${TEXTAREA_EXAMPLE_VALUE}`;

const CONFIRM_BUTTON_TEXT = 'Confirm';
const CANCEL_BUTTON_TEXT = 'Cancel';

type PasteOptionListDialogProps = {
  onConfirm: (pasteData: [string, string][]) => void;
  open: boolean;
  onClose: () => void;
};

function parseFromCSV(csv?: string): [string, string][] {
  if (!csv) {
    return [];
  }

  return csv.split(/\n/).reduce<[string, string][]>((acc, line) => {
    const fields = /^(.*)[\t,]\s*(\d*)\s*$/.exec(line);

    if (fields && typeof fields[1] === 'string' && typeof fields[2] === 'string') {
      acc.push([fields[1].trim(), fields[2].trim()]);
    }

    return acc;
  }, []);
}

const PasteOptionListDialog = ({ open, onClose, onConfirm }: PasteOptionListDialogProps) => {
  const [text, setText] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = async () => {
    const { current: dialog } = dialogRef;

    if (dialog) {
      dialog.showModal();
      await animateDialog(dialog, FADE_IN.keyframes, FADE_IN.options);
    }
  };

  const closeDialog = async (returnValue?: string) => {
    const { current: dialog } = dialogRef;

    if (dialog) {
      await animateDialog(dialog, FADE_OUT.keyframes, FADE_OUT.options);
      dialog.close(returnValue);
    }
  };

  useLayoutEffect(() => {
    if (open) {
      void openDialog();
    }
  }, [open]);

  return (
    open &&
    createPortal(
      <dialog
        ref={dialogRef}
        className={styles.uiDialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            void closeDialog('cancel');
          }
        }}
        onClose={() => {
          onClose();
        }}
      >
        <form
          className={styles.container}
          onSubmit={(event) => {
            event.preventDefault();

            onConfirm(parseFromCSV(text));
            void closeDialog();
          }}
        >
          <textarea
            className={styles.textarea}
            rows={12}
            cols={64}
            placeholder={TEXT_AREA_PLACEHOLDER_TEXT}
            name="table"
            onInput={(event) => {
              if (event.target instanceof HTMLTextAreaElement) {
                setText(event.target.value);
              }
            }}
          ></textarea>
          <UiButton
            type="button"
            className={styles.cancel}
            onClick={() => {
              void closeDialog();
            }}
          >
            {CANCEL_BUTTON_TEXT}
          </UiButton>
          <UiButton className={styles.confirm}>{CONFIRM_BUTTON_TEXT}</UiButton>
        </form>
      </dialog>,
      document.body
    )
  );
};

export default PasteOptionListDialog;
