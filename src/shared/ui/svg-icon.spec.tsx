import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SvgIcon } from './svg-icon';

describe('SvgIcon', () => {
  it('renders w/o errors', () => {
    expect(() => render(<SvgIcon name="play" />)).not.toThrow();
  });
});
