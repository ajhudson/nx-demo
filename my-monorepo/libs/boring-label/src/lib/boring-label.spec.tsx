import { render } from '@testing-library/react';

import BoringLabel from './boring-label';

describe('BoringLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BoringLabel />);
    expect(baseElement).toBeTruthy();
  });
});
