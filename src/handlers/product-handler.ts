import { Request, Response } from "express"
import { ProductUsecase } from "../usecases/product-usecase.js"
import { AppDataSource } from "../database/database.js"
import { CreateProductValidator } from "./validators/product-validator.js"
import { generateValidationErrorMessage } from "./validators/utils.js"
import { Product } from "../database/entities/product.js"
import { ResourceConflictError } from "../usecases/error.js"

export const CreateProduct = async (req: Request, res: Response) => {
    // validation
    const validation = CreateProductValidator.validate(req.body)
    if (validation.error) {
        return res.status(400).send(generateValidationErrorMessage(validation.error.details))
    }
    
    // usecase
    const productUsecase = new ProductUsecase(AppDataSource.getRepository(Product));
    try {
        const product = await productUsecase.createProduct(req.body.name, req.body.price);
        return res.status(201).send(product);
    } catch(error: unknown) {
        if (error instanceof ResourceConflictError) {
            return res.status(409).send({
                name: "name is already taken"
            })
        }

        return res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

