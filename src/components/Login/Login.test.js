import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

describe("Login component", () => {
  it("updates email input and form validity correctly", () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    const emailInput = screen.getByLabelText("E-Mail");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Login");

    // Typing a valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(loginButton);
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("");

    // Typing an invalid email
    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
    fireEvent.click(loginButton);
    expect(emailInput.value).toBe("invalidEmail");
    expect(passwordInput.value).toBe("");
  });

  it("updates password input and form validity correctly", () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    const passwordInput = screen.getByLabelText("Password");
    const emailInput = screen.getByLabelText("E-Mail");
    const loginButton = screen.getByText("Login");

    // Typing a valid password
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });
    fireEvent.click(loginButton);
    expect(passwordInput.value).toBe("validPassword");
    expect(emailInput.value).toBe("");

    // Typing an invalid password
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(loginButton);
    expect(passwordInput.value).toBe("short");
    expect(emailInput.value).toBe("");
  });

  it("handles form submission correctly", () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    const loginButton = screen.getByText("Login");

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "validPassword" },
    });

    fireEvent.click(loginButton);
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith(
      "test@example.com",
      "validPassword"
    );
  });
});
