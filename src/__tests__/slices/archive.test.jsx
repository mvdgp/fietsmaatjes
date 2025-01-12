import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderGroupedItems, renderSortedItems } from '@/slices/Archive/index';

describe('archive.test.jsx', () => {
  const mockToggleYear = jest.fn();
  const mockToggleMonth = jest.fn();
  const mockSetState = jest.fn();
  const mockToggleDefaultGroup = jest.fn();

  const groupedItems = {
    2023: {
      1: [{ uid: '1', first_publication_date: '2023-01-01T00:00:00Z', data: { title: [{ text: 'Title 1' }] } }],
      2: [{ uid: '2', first_publication_date: '2023-02-01T00:00:00Z', data: { title: [{ text: 'Title 2' }] } }],
    },
  };

  const sortedItems = [
    { uid: '1', data: { title: 'Route 1' } },
    { uid: '2', data: { title: 'Route 2' } },
  ];

  const expandedYears = { 2023: true };
  const expandedMonths = { '2023-1': true };
  const state = {
    expandedDefaultGroup: true,
    selectedItem: null,
    itemNotFound: false,
  };

  test('renders grouped items correctly', () => {
    const { getByText } = render(
      renderGroupedItems(groupedItems, mockToggleYear, mockToggleMonth, expandedYears, expandedMonths, mockSetState)
    );

    expect(getByText('2023')).toBeInTheDocument();
    expect(getByText('januari')).toBeInTheDocument();
    expect(getByText('Title 1')).toBeInTheDocument();
  });

  test('toggles year expansion', () => {
    const { getByText } = render(
      renderGroupedItems(groupedItems, mockToggleYear, mockToggleMonth, expandedYears, expandedMonths, mockSetState)
    );

    fireEvent.click(getByText('2023'));
    expect(mockToggleYear).toHaveBeenCalledWith("2023");
  });

  test('toggles month expansion', () => {
    const { getByText } = render(
      renderGroupedItems(groupedItems, mockToggleYear, mockToggleMonth, expandedYears, expandedMonths, mockSetState)
    );

    fireEvent.click(getByText('januari'));
    expect(mockToggleMonth).toHaveBeenCalledWith("2023", "1");
  });

  test('handles item click in grouped items', () => {
    const { getByText } = render(
      renderGroupedItems(groupedItems, mockToggleYear, mockToggleMonth, expandedYears, expandedMonths, mockSetState)
    );

    fireEvent.click(getByText('Title 1'));
    expect(mockSetState).toHaveBeenCalled();
  });

  test('renders sorted items correctly', () => {
    const { getByText } = render(
      renderSortedItems(sortedItems, state, mockSetState, mockToggleDefaultGroup)
    );

    expect(getByText('Route 1')).toBeInTheDocument();
    expect(getByText('Route 2')).toBeInTheDocument();
  });

  test('toggles default group expansion', () => {
    const { getByText } = render(
      renderSortedItems(sortedItems, state, mockSetState, mockToggleDefaultGroup)
    );

    fireEvent.click(getByText('Fietsroutes'));
    expect(mockToggleDefaultGroup).toHaveBeenCalled();
  });

  test('handles item click in sorted items', () => {
    const { getByText } = render(
      renderSortedItems(sortedItems, state, mockSetState, mockToggleDefaultGroup)
    );

    fireEvent.click(getByText('Route 1'));
    expect(mockSetState).toHaveBeenCalled();
  });
});