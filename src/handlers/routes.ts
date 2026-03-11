import { Application, Request, Response } from "express";
import { CreateProduct } from "./product-handler.js";

export const initHandlers = (app: Application) => {
    app.get("/", (req, res) => {
        return res.send({
            message: "Hell world"
        })
    })

    app.post("/products", CreateProduct)
} 
