import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("loads and sets user login status from localStorage", () => {
    const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockReturnValueOnce("1");

    render(<App />);

    expect(mockGetItem).toHaveBeenCalledWith("isLoggedIn");
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    mockGetItem.mockRestore();
  });

  test("does not update user login status if localStorage is empty", () => {
    const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockReturnValueOnce(null);

    render(<App />);

    expect(mockGetItem).toHaveBeenCalledWith("isLoggedIn");
    expect(mockGetItem).toHaveBeenCalledTimes(1);

    mockGetItem.mockRestore();
  });

  test("updates user login status when logging in", () => {
    const mockGetItem = jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockReturnValueOnce(null);

    render(<App />);

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Login")).toBeDisabled();

    mockGetItem.mockRestore();
  });
});