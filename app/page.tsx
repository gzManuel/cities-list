"use client";
import { useState } from "react";
import importedCities from "./database/cities.json";

interface City {
  id: number;
  name: string;
  department: string;
  population: number;
}

export default function Home() {
  const [cities, setCities] = useState<Array<City>>(importedCities);
  const [inputCity, setInputCity] = useState<string>("");

  const handleSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Create an visited cities list app with the following requirements
              1. Has a form with an input and a label called new city
              2. The form has an input list to sort from A-Z, Z-A and the default
              3. A button that when you click it add a new city to the list 
              4. If a city it's already added show a message that there is a city with that name. 
              5. A list of the cities
        */}

        <div>
          <form className="flex flex-col gap-2" action={handleSubmit}>
            <div className="flex gap-1">
              <label>Add City</label>
              <input className="border" type="text" value={inputCity} />
            </div>

            <input className="border p-1 rounded-xl" type="submit"></input>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl">List of city you've visited in Bolivia</h1>
          <ol className="list-decimal">
            {cities.map((city) => (
              <li key={city.id}>{city.name}</li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
