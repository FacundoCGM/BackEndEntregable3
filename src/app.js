import express from "express"
import { ProductManager } from "./manager/productManager.js"
const productManager = new ProductManager("./products.json")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    try {
      const { limit } = req.query
      const products = await productManager.getProducts()
      if(!limit) res.status(200).json(products)
      else {
          const productsByLimit = await productManager.getProductsByLimit(limit)
          res.status(200).json(productsByLimit)
      }
    } catch (error) {
      res.status(500).json(error.message)
    }
})
  
app.get('/products/:pid', async(req, res)=>{
    try {
        const { pid } = req.params
        const product = await productManager.getProductById(Number(pid))
        if(!product) res.status(404).json({ message: 'Product not found' })
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.listen(8080)