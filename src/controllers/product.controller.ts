import fs from "fs"

class fileReader {
    constructor() {
        
    }
    loadProducts = () => {
        try {
            const data = fs.readFileSync("./data.json", "utf-8")
            return JSON.parse(data)
        } catch (error) {
            
        }
    }
}

export function loadProducts() {
    try {
        const data = fs.readFileSync("./data.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Could not read data")
    }

}

