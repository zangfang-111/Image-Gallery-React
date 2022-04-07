import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Photos, { details } from '../components/photos';
import { getSelectedPhoto } from '../store';
import { MOCK_PHOTO_DETAILS } from './fixtures';

jest.mock('../store/index.js', () => ({ 
  getSelectedPhoto: jest.fn()
}));

beforeEach(() => {
  jest.useFakeTimers();
  cleanup();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('renders photos page', () => {
  it('shows warning if there is no data', () => {
    getSelectedPhoto.mockImplementation(() => null);

    const { getByText } = render(<Photos />);
    const element = getByText('loading...');

    expect(element).toBeInTheDocument();
  });

  it('should renders the detail photo', async () => {
    getSelectedPhoto.mockImplementation(() => MOCK_PHOTO_DETAILS);

    act(() => jest.advanceTimersByTime(1000));
    render(<MemoryRouter><Photos /></MemoryRouter>);

    const element = await waitFor(() => screen.getByTestId(`image-${MOCK_PHOTO_DETAILS.id}`));
    expect(element).toBeInTheDocument();
  });

  details.forEach(item => {
    it('should renders detail fields', async () => {
      getSelectedPhoto.mockImplementation(() => MOCK_PHOTO_DETAILS);
  
      act(() => jest.advanceTimersByTime(1000));
      render(<MemoryRouter><Photos /></MemoryRouter>);

      const field = await waitFor(() => screen.getByTestId(`field-${item.value}`));
      expect(field).toBeInTheDocument();
    });
  });

  it('should renders the "go back" button', async () => {
    getSelectedPhoto.mockImplementation(() => MOCK_PHOTO_DETAILS);

    act(() => jest.advanceTimersByTime(1000));
    const { container } = render(<MemoryRouter><Photos /></MemoryRouter>);

    const button = await waitFor(() => container.getElementsByClassName('category__go-back'));
    expect(button.length).toBe(1);
  });

  it('should return to the landing page when click the "go back" button', async () => {
    getSelectedPhoto.mockImplementation(() => MOCK_PHOTO_DETAILS);

    act(() => jest.advanceTimersByTime(1000));
    render(<MemoryRouter><Photos /></MemoryRouter>);

    const button = await waitFor(() => screen.getByRole('button'));
    fireEvent.click(button);

    expect(button).toBeCalled;
  });
});
