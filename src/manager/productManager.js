import fs from "fs"

export class ProductManager {
    constructor() {
        this.path = './products.json'
    }

    async getProducts() {
        try {
            if(fs.existsSync(this.path)) {
                return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            } else return []
        } catch(error) {
            console.error(error)
        }
    }

     async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts()
            const product = {
                id: await this.getNextId() + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            if (!products.find((product) => product.code === code)){
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
            } else console.log('Este codigo ya esta asignado a otro producto')
        } catch(error) {
            console.error(error)
        }
    }

    async getNextId(){
        try {
            const products = await this.getProducts()
            let nextId = 0
            products.map((product)=>{
                if(product.id > nextId) nextId = product.id
            })
            return nextId
        } catch(error) {
            console.error(error)
        }
    }

    async getProductById(productId) {
        try {
            const products = await this.getProducts()
            const productWanted = products.find((product) => product.id === productId)
            if(productWanted) {
                return productWanted
            } else console.log('not found')
        } catch(error) {
            console.error(error)
        }
    }

    async getProductsByLimit(limit){
        try {
            const products = await this.getProducts()
            if(!limit || limit >= products.length) return products
            else return products.slice(0, limit)
        } catch (error) {
            console.error(error)
        }
      }

    async deleteProduct(productId) {
        try {
            const products = await this.getProducts()
            const productsUpdated = products.filter((allProducts) => allProducts.id !== productId)
            await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated))
        } catch(error) {
            console.error(error)
        }
    }

    async updateProduct(productId, title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts()
            const productUpdated = {
                id: productId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            const productToUpdate = products.findIndex((allProducts) => allProducts.id === productId)
            if(productToUpdate !== -1) {
                products[productToUpdate] = productUpdated
                await fs.promises.writeFile(this.path, JSON.stringify(products))
            } else console.log('Producto no encontrado')
        } catch(error) {
            console.error(error)
        }
    }
}


