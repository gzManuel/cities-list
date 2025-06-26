import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../app/page";

// Mock out the imported cities
jest.mock("../app/database/cities.json", () => [
  { id: 1, name: "b city", deleted: false },
  { id: 2, name: "a city", deleted: false },
  { id: 3, name: "c city", deleted: false },
  { id: 3, name: "d city", deleted: true },
]);

describe("Page", () => {
  beforeEach(() => {
    render(<Page />);
  });

  // renders only non deleted cities
  it("Renders only non deleted cities lists", () => {
    // Arrange, Act, Assert
    screen.getByText("a city");
    screen.getByText("b city");
    const cities = screen.getAllByRole("listitem");

    expect(cities).toHaveLength(3);
  });

  // Add a new city
  it("Add a new city", () => {
    const inputCity = screen.getByLabelText("Add City");
    const submitButton = screen.getByRole("button");

    fireEvent.change(inputCity, { target: { value: "Sucre" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Sucre")).toBeInTheDocument();
  });

  // Add a city that already exist
  it("Add a ciy that already exist", () => {
    const inputCity = screen.getByLabelText("Add City");
    const submitButton = screen.getByRole("button", { name: /Submit/ });
    const inputCityValue = "c city";
    const errorMessage = `Error: The city ${inputCityValue} you've entered already exist`;

    fireEvent.change(inputCity, { target: { value: inputCityValue } });
    fireEvent.click(submitButton);

    expect(screen.getByText(errorMessage));
  });

  // remove the city
  it("Remove the city 'a city'", () => {
    const liSucre = screen.getByText("a city");

    fireEvent.click(liSucre);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  // sorting the cities
  it("Sort cities, Z-A", () => {
    const inputSortType = screen.getByLabelText("Sort type");

    fireEvent.change(inputSortType, { target: { value: "z-a" } });

    const sortedLi = screen
      .getAllByRole("listitem")
      .map((li) => li.textContent);

    expect(sortedLi).toEqual(["c city", "b city", "a city"]);
  });
});
