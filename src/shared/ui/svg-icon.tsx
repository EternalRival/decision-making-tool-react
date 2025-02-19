const ICON_URL = '/assets/icons/icons.sprite.svg';

type IconName = 'play' | 'timer' | 'volume-2' | 'volume-off' | 'undo-2' | 'x';

type SvgIconProps = { name: IconName };

export const SvgIcon = ({ name }: SvgIconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <use href={`${ICON_URL}#${name}`} />
    </svg>
  );
};
