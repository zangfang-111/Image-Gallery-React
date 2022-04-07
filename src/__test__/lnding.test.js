import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Landing from '../components/landing';
import { getPhotos } from '../store';
import { MOCK_PHOTOS } from './fixtures';

jest.mock('../store/index.js', () => ({ 
  getPhotos: jest.fn()
}));

beforeEach(() => {
  jest.useFakeTimers();
  cleanup();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('renders landing page', () => {
  it('shows warning if there is no data', () => {
    getPhotos.mockImplementation(() => null);

    const { getByText } = render(<Landing />);
    const element = getByText('loading...');

    expect(element).toBeInTheDocument();
  });

  it('should renders the elements', async () => {
    getPhotos.mockImplementation(() => MOCK_PHOTOS);

    act(() => jest.advanceTimersByTime(1000));
    render(<MemoryRouter><Landing /></MemoryRouter>);

    const element = await waitFor(() => screen.getByTestId('photo-0'));
    expect(element).toBeInTheDocument();
  });
});
