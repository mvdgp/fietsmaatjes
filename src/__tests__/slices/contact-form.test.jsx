import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from '@/slices/ContactForm/index';
import { useForm } from '@formspree/react';

jest.mock('@formspree/react', () => ({
  useForm: jest.fn(),
  ValidationError: () => <div />
}));

describe('ContactForm', () => {
  const mockHandleSubmit = jest.fn();
  const mockState = { submitting: false, succeeded: false, errors: [] };

  beforeEach(() => {
    useForm.mockReturnValue([mockState, mockHandleSubmit]);
  });

  test('renders the form with all fields', () => {
    render(<ContactForm slice={{ slice_type: 'contact_form', variation: 'default', primary: { body: [] } }} />);
    expect(screen.getByLabelText(/Voornaam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Achternaam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefoonnummer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Woonplaats en buurt/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Schrijf hier uw bericht/i)).toBeInTheDocument();
  });

  test('shows error message when required fields are empty', () => {
    render(<ContactForm slice={{ slice_type: 'contact_form', variation: 'default', primary: { body: [] } }} />);
    fireEvent.click(screen.getByRole('button', { name: /Verzenden/i }));
    expect(screen.getByText(/Vul alle verplichte velden in/i)).toBeInTheDocument();
  });

  test('submits the form when all required fields are filled', () => {
    render(<ContactForm slice={{ slice_type: 'contact_form', variation: 'default', primary: { body: [] } }} />);
    fireEvent.change(screen.getByLabelText(/Voornaam/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Telefoonnummer/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Woonplaats en buurt/i), { target: { value: 'Amsterdam' } });
    fireEvent.click(screen.getByRole('button', { name: /Verzenden/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test('displays success message when form is successfully submitted', () => {
    useForm.mockReturnValue([{ submitting: false, succeeded: true, errors: [] }, mockHandleSubmit]);
    render(<ContactForm slice={{ slice_type: 'contact_form', variation: 'default', primary: { body: [] } }} />);
    fireEvent.change(screen.getByLabelText(/Voornaam/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Telefoonnummer/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Woonplaats en buurt/i), { target: { value: 'Amsterdam' } });
    fireEvent.click(screen.getByRole('button', { name: /Verzenden/i }));
    expect(screen.getByText(/Formulier succesvol verzonden/i)).toBeInTheDocument();
  });

  test('displays error message when form submission fails', () => {
    useForm.mockReturnValue([{ submitting: false, succeeded: false, errors: [{ message: 'Error' }] }, mockHandleSubmit]);
    render(<ContactForm slice={{ slice_type: 'contact_form', variation: 'default', primary: { body: [] } }} />);
    fireEvent.change(screen.getByLabelText(/Voornaam/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Telefoonnummer/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Woonplaats en buurt/i), { target: { value: 'Amsterdam' } });
    fireEvent.click(screen.getByRole('button', { name: /Verzenden/i }));
    expect(screen.getByText(/Er is een fout opgetreden bij het verzenden van het formulier/i)).toBeInTheDocument();
  });
});