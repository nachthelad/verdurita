import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardItem from "../index";

describe("CardItem", () => {
  it("opens the matching calculator from the keyboard and labels the main rate", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <CardItem
        moneda="Dólar Blue"
        loadingData={false}
        data={[
          { texto: "Venta", precio: 1560 },
          { texto: "Compra", precio: 1540 },
        ]}
        onClick={onClick}
      />,
    );

    const card = screen.getByRole("button", {
      name: "Abrir calculadora de Dólar Blue",
    });
    expect(screen.getAllByText("Venta")).toHaveLength(1);
    expect(screen.queryByText("Abrir calculadora")).toBeNull();
    await user.tab();
    expect(document.activeElement).toBe(card);
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledWith("Dólar Blue");
  });
});
