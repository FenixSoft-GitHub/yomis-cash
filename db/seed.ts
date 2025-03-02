import { db, Exchange } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Exchange).values([
    {
      id: 1,
      country: "EE.UU",
      currency: "Dollar",
      rate: 76,
      symbol: "$",
    },
    {
      id: 2,
      country: "Perú",
      currency: "Sol",
      rate: 176,
      symbol: "$",
    },
    {
      id: 3,
      country: "Chile",
      currency: "Pesos",
      rate: 10,
      symbol: "$",
    },
    {
      id: 4,
      country: "Colombia",
      currency: "Peso",
      rate: 15,
      symbol: "$",
    },
  ]);
}
