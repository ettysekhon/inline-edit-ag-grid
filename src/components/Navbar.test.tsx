import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Theme } from "@/types";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  test("renders as a banner with a heading and nav actions", () => {
    render(
      <Navbar
        theme={Theme.LIGHT}
        onToggleTheme={vi.fn()}
        onFetch={vi.fn()}
        onAddRow={vi.fn()}
      />
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /pricing/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /fetch data/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add row/i })
    ).toBeInTheDocument();
  });

  test("clicking buttons calls the provided handlers", async () => {
    const user = userEvent.setup();
    const onFetch = vi.fn();
    const onAddRow = vi.fn();
    const onToggleTheme = vi.fn();

    render(
      <Navbar
        theme={Theme.LIGHT}
        onToggleTheme={onToggleTheme}
        onFetch={onFetch}
        onAddRow={onAddRow}
      />
    );

    await user.click(screen.getByRole("button", { name: /fetch data/i }));
    expect(onFetch).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /add row/i }));
    expect(onAddRow).toHaveBeenCalledTimes(1);
  });
});
