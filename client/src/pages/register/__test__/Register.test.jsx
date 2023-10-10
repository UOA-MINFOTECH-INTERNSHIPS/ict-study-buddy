import { render, screen, fireEvent } from 'vitest';
import Register from '../Register';

describe('Register Component', () => {
  it('renders the registration form', () => {
    render(<Register />);
  
    const usernameInput = screen.getByPlaceholderText('Username');
    expect(usernameInput).toBeInTheDocument();
  });

  it('submits the form', async () => {
    render(<Register />);
  
    // Simulate user input and form submission. 
    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    // Simulate filling in the form fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Find and submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Write assertions to check if the form submission is handled as expected.
    const successMessage = await screen.findByText('Registration successful!');
    expect(successMessage).toBeInTheDocument();
  });
});
