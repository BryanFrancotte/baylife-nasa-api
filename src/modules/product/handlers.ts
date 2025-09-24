import prisma from "../../database";
import {AddProductBody, ProductInputCreate, ProductInputUpdate, UpdateProductBody} from "./model";

export async function getProducts(){
    try {
        return await prisma.product.findMany()
    } catch (e: unknown) {
        console.log(`Error getting product: ${e}`)
        throw e;
    }
}

export async function getProduct(id: string){
    const product = await prisma.product.findUnique({where: {id}})
    if (!product) {
        throw new Error(`Product not found for id: ${id}`)
    }
    return product
}

export async function addProduct(options: AddProductBody){
    const {name, price, stock, categoryId} = options
    let newProduct: ProductInputCreate = {name, price, stock}
    if(categoryId != undefined && categoryId != ""){
        newProduct.Category = {connect: {id: categoryId}}
    }
    try {
        return await prisma.product.create({data: {name, price, stock}})
    } catch (e: unknown) {
        console.log(`Error adding product: ${e}`)
        throw e;
    }
}

export async function updateProduct(id: string, options: UpdateProductBody){
    const {name, price, stock, categoryId} = options
    let updateProduct: ProductInputUpdate = {name, price, stock}
    if(categoryId != undefined && categoryId != ""){
        updateProduct.Category = {connect: {id: categoryId}}
    }
    try {
        return await prisma.product.update({where: {id}, data: updateProduct})
    } catch (e: unknown) {
        console.log(`Error updating product: ${e}`)
        throw e;
    }
}

export async function deleteProduct(options: {id: string}){
    try {
        const {id} = options
        return await prisma.product.delete({where: {id}})
    } catch (e: unknown) {
      console.log(`Error deleting product: ${e}`)
      throw e;
    }
}