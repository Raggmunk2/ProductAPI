// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { fuzzySearch } from "./controllers/fuzzySearch";
import {loadProducts , addProduct} from "./controllers/dataLoader"

dotenv.config();
const app: Express = express();
// To parse the body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;

// Port to listen on
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  
// Get endpoint returns string with all products
app.get("/products", (req: Request, res: Response) => {

  const jsonProducts = loadProducts();
  
  res.json(`${JSON.stringify(jsonProducts)}`).status(200);
});

// Get with id endpoint returns one product
app.get("/products/:id", (req: Request, res: Response) => {
  const stringId = req.params.id;
  const jsonProducts = loadProducts();
  var id: number = +stringId;
  res.json(`${JSON.stringify(jsonProducts[id - 1])}`).status(200);
});

// Post endpoint to add product. Writes to file to add it
app.post("/products", bodyParser.json(), (req: Request, res: Response) => {
  let stringBody = req.body;
  const jsonProducts = loadProducts();
  let jsonObject = JSON.parse(JSON.stringify(stringBody));
  jsonObject.id = jsonProducts.length + 1;
  jsonProducts.push(jsonObject);
  addProduct(jsonProducts)
  res.json(`${JSON.stringify(stringBody)}`).status(200);
});

// Get endpoint with fuzzy search of the names. Returns the matching products
app.get("/search", (req: Request, res: Response) => {
    const search = req.query.search as string;
    const jsonProducts = loadProducts();
    const result = fuzzySearch(search, jsonProducts);
    res.json(JSON.stringify(result)).status(200);
  }
);
