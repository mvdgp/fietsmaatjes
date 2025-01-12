import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Faq from '@/slices/Faq';

const mockSlice = {
  slice_type: 'faq',
  variation: 'default',
  primary: {
    set: [
      { question: 'Question 1', answer: 'Answer 1' },
      { question: 'Question 2', answer: 'Answer 2' },
      { question: 'Question 3', answer: 'Answer 3' },
    ],
  },
};

describe('Faq', () => {
  test('renders the FAQ section with all questions', () => {
    render(<Faq slice={mockSlice} />);
    expect(screen.getByText(/Veelgestelde Vragen/i)).toBeInTheDocument();
    mockSlice.primary.set.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  test('toggles the visibility of the FAQ answers', () => {
    render(<Faq slice={mockSlice} />);
    const question1 = screen.getByText(/Question 1/i);
    const question2 = screen.getByText(/Question 2/i);
    const question3 = screen.getByText(/Question 3/i);

    // Initially, answers should not be visible
    expect(screen.queryByText(/Answer 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Answer 2/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Answer 3/i)).not.toBeInTheDocument();

    // Click on the first question to toggle visibility
    fireEvent.click(question1);
    expect(screen.getByText(/Answer 1/i)).toBeInTheDocument();

    // Click on the second question to toggle visibility
    fireEvent.click(question2);
    expect(screen.getByText(/Answer 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Answer 1/i)).not.toBeInTheDocument();

    // Click on the third question to toggle visibility
    fireEvent.click(question3);
    expect(screen.getByText(/Answer 3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Answer 2/i)).not.toBeInTheDocument();

    // Click on the third question again to hide the answer
    fireEvent.click(question3);
    expect(screen.queryByText(/Answer 3/i)).not.toBeInTheDocument();
  });
});