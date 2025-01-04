import ICON_URL from '~/assets/icons/icons.sprite.svg';

type IconName = 'play' | 'square-arrow-out-up-left' | 'timer' | 'volume-2' | 'volume-off' | 'x';

type SvgIconProps = { name: IconName };

const SvgIcon = ({ name }: SvgIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <use href={`${ICON_URL}#${name}`} />
    </svg>
  );
};

export default SvgIcon;
