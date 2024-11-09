//npm run dev to run
// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fs from "fs";

dotenv.config();

const app: Express = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;

app.get("/products", (req: Request, res: Response) => {
  const data = fs.readFileSync("./src/data.json", "utf-8");
  const jsonProducts = JSON.parse(data);
  //console.log(JSON.parse(jsonProducts)[0]) // får ut ett objekt
  //console.log(jsonProducts)
  res.json(`${JSON.stringify(jsonProducts)}`).status(200);
});

app.get("/product/:id", (req: Request, res: Response) => {
  const stringId = req.params.id;
  console.log(stringId);
  const data = fs.readFileSync("./src/data.json", "utf-8");
  const jsonProducts = JSON.parse(data);
  var id: number = +stringId;
  console.log(jsonProducts[id - 1]);
  res.json(`${JSON.stringify(jsonProducts[id - 1])}`).status(200);
});

app.post("/add_product", bodyParser.json(), (req: Request, res: Response) => {
  let stringBody = req.body;
  //console.log(stringBody)
  const data = fs.readFileSync("./src/data.json", "utf-8");
  let jsonProducts = JSON.parse(data);
  //console.log(jsonProducts.length)
  let jsonObject = JSON.parse(JSON.stringify(stringBody));
  jsonObject.id = jsonProducts.length + 1;
  //console.log(jsonObject)
  jsonProducts.push(jsonObject);
  console.log(jsonProducts);
  fs.writeFileSync("./src/data.json", JSON.stringify(jsonProducts));
  res.json(`${JSON.stringify(stringBody)}`).status(200);
});

app.get("/search-products", bodyParser.json(), (req: Request, res: Response) => {
    const search = req.body;
    console.log(search);

    const data = fs.readFileSync("./src/data.json", "utf-8");
    let jsonProducts = JSON.parse(data);
    const titleArray = jsonProducts.map((p: any) => {
      return p.title;
    });
    console.log(titleArray);
    const result = fuzzySearch(search, jsonProducts);
    console.log("result: " + result);
    
    res.json(JSON.stringify(result)).status(200);
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

function fuzzySearch(search: string, array: any[]) {
  const result = array.filter((item) => {
    const word = search.search.toString().toLowerCase();
    return levenshteinDistance(word, item.title.toString().toLowerCase()) <= 2;
  });
  return result;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  console.log(a);
  console.log(b);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }

  return matrix[a.length][b.length];
}
