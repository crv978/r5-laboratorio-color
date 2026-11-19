import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectorColor } from "../src/components/SelectorColor";

describe("SelectorColor", () => {
  it("muestra un error junto al campo hexadecimal inválido", async () => {
    const usuario = userEvent.setup();
    render(
      <SelectorColor
        label="Color de texto"
        nombre="Texto"
        valor="#767676"
        onChange={vi.fn()}
      />,
    );

    await usuario.clear(screen.getByLabelText("Color hexadecimal"));
    await usuario.type(screen.getByLabelText("Color hexadecimal"), "#12");

    expect(screen.getByRole("alert")).toHaveTextContent("Hexadecimal inválido");
  });

  it("llama al cambio con el valor expandido", async () => {
    const usuario = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SelectorColor
        label="Color de texto"
        nombre="Texto"
        valor="#767676"
        onChange={onChange}
      />,
    );

    const campo = screen.getByLabelText("Color hexadecimal");
    await usuario.clear(campo);
    await usuario.type(campo, "#767676");

    expect(onChange.mock.calls.at(-1)?.[0]).toBe("#767676");
  });
});
