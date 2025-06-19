"use client";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import importedCities from "./database/cities.json";

interface City {
  id: number;
  name: string;
  department?: string;
  population?: number;
  deleted: boolean;
}

type SortType = "normal" | "a-z" | "z-a";

export default function Home() {
  const [cities, setCities] = useState<Array<City>>(importedCities);
  const [inputCity, setInputCity] = useState<string>("");
  const [sortType, setSortType] = useState<SortType>("normal");
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (
      cities.find(
        (city) =>
          city.name.toLowerCase() === inputCity.toLocaleLowerCase() &&
          !city.deleted
      )
    ) {
      error || setError(true);
    } else {
      setCities((prevCities) => {
        const newCity: City = {
          id: prevCities.length + 1,
          name: inputCity,
          deleted: false,
        };
        return [...prevCities, newCity];
      });
      setInputCity("");
      setError(false);
    }
  };

  const handleOnChangeCityInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCity(event.target.value);
  };

  const handleDeleteCity = (deleteCity: City) => {
    setCities((prevCities) => {
      const updatedCities = prevCities.map((city) =>
        city.id === deleteCity.id ? { ...city, deleted: true } : city
      );
      return updatedCities;
    });
  };

  const handleOnChangeSortTypeSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSortType(event.target.value as SortType);
  };

  const sortCities = (sortType: string) => {
    console.log("testing");
    switch (sortType) {
      case "normal":
        return cities.slice();
      case "a-z":
        return cities.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      case "z-a":
        return cities.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      default:
        return cities.slice();
    }
  };

  // const sortedCities = useMemo(() => {
  //   return sortCities(sortType);
  // }, [sortType]);

  const sortedCities = sortCities(sortType);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Create an visited cities list app with the following requirements
              1. Has a form with an input and a label called new city
              2. A button that when you click it add a new city to the list 
              3. If a city it's already added show a message that there is a city with that name. 
              4. A list of the cities that shows them when the delete it's === false
              6. If you click any of those cities, you remove it, and change it's state to deleted
              5. The form has an input list to sort the list from A-Z, Z-A and the default 
        */}

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <div className="flex gap-1">
                <label htmlFor="inputCity">Add City</label>
                <input
                  id="inputCity"
                  name="inputCity"
                  className="border"
                  type="text"
                  value={inputCity}
                  onChange={handleOnChangeCityInput}
                />
              </div>

              {error && (
                <span className="text-red-500">{`Error: The city ${inputCity} you've entered already exist`}</span>
              )}
            </div>
            <div className="flex gap-1">
              <label htmlFor="sortType">Sort type</label>
              <select
                id="sortType"
                name="sortType"
                value={sortType}
                onChange={handleOnChangeSortTypeSelect}
              >
                <option value="">normal</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>

            <input className="border p-1 rounded-xl" type="submit"></input>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl">List of city you've visited in Bolivia</h1>
          <ol className="list-decimal">
            {sortedCities.map(
              (city) =>
                !city.deleted && (
                  <li key={city.id} onClick={() => handleDeleteCity(city)}>
                    {city.name}
                  </li>
                )
            )}
          </ol>
        </div>
      </main>
    </div>
  );
}
