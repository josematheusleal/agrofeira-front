import { render, screen } from "@testing-library/react";

describe("Configuração Inicial", () => {
  it("deve somar dois números corretamente", () => {
    expect(1 + 1).toBe(2);
  });

  it("deve renderizar um elemento no DOM virtual", () => {
    render(<h1>Olá, Agrofeira!</h1>);

    expect(screen.getByText("Olá, Agrofeira!")).toBeInTheDocument();
  });
});
