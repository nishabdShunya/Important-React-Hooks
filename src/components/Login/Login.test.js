import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

const mockOnLogin = jest.fn();

jest.useFakeTimers();

afterEach(cleanup); // Ensure cleanup is called after each test

describe("Login Component", () => {
  test("updates form validity after a delay", async () => {
    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByText("Login")).toBeDisabled();

    await act(async () => {
      jest.advanceTimersByTime(500);
      await Promise.resolve(); // Ensure promises are resolved
    });

    expect(screen.getByText("Login")).not.toBeDisabled(); // Use not.toBeDisabled for enabled state
  });

  test("cleans up the timer on unmount", () => {
    const spyClearTimeout = jest.spyOn(global, "clearTimeout"); // Mock clearTimeout

    render(<Login onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText("E-Mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByText("Login")).toBeDisabled();

    cleanup(); // Manually call cleanup to simulate unmount

    expect(spyClearTimeout).toHaveBeenCalled();

    spyClearTimeout.mockRestore();
  });
});
