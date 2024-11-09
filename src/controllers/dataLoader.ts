import fs from "fs"
import product from "src/model/product";

export function loadProducts() : any{
    try {
        const data = fs.readFileSync("./src/data.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Could not read data")
    }

}

export function addProduct(newProduct:product) {
    fs.writeFileSync("./src/data.json", JSON.stringify(newProduct));
}