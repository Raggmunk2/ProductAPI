import fs from "fs"

export function loadProducts() : any{
    try {
        const data = fs.readFileSync("./src/data.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Could not read data")
    }

}

export function addProduct(newProduct:any) {
    fs.writeFileSync("./src/data.json", JSON.stringify(newProduct));
}