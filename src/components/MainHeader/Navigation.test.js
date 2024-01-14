import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";
import AuthContext from "../../store/auth-context";

describe("Navigation Component", () => {
  test("renders Navigation component with Logout button when user is logged in", () => {
    const authContextValue = {
      isLoggedIn: true,
      onLogout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Navigation />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("does not render Users, Admin, and Logout button when user is not logged in", () => {
    const authContextValue = {
      isLoggedIn: false,
      onLogout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Navigation />
      </AuthContext.Provider>
    );

    expect(screen.queryByText("Users")).toBeNull();
    expect(screen.queryByText("Admin")).toBeNull();
    expect(screen.queryByRole("button", { name: "Logout" })).toBeNull();
  });

  test("calls onLogout when Logout button is clicked", () => {
    const authContextValue = {
      isLoggedIn: true,
      onLogout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Navigation />
      </AuthContext.Provider>
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    expect(authContextValue.onLogout).toHaveBeenCalledTimes(1);
  });
});
