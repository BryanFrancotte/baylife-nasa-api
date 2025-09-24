import {t} from "elysia";
import {Product, ProductInputCreate, ProductInputUpdate, ProductPlain} from "../../generated/prismabox/Product";

const addProductBody = t.Object({
    name: t.String(),
    price: t.Number(),
    stock: t.Number(),
    categoryId: t.Optional(t.String())
})

const updateProductBody = t.Object({
    name: t.Optional(t.String()),
    price: t.Optional(t.Number()),
    stock: t.Optional(t.Number()),
    categoryId: t.Optional(t.String())
})

export {
    addProductBody,
    updateProductBody
}

export type AddProductBody = typeof addProductBody.static
export type UpdateProductBody = typeof updateProductBody.static

//#region PrismaBox Export
export {
    Product as product,
    ProductPlain as productPlain,
    ProductInputCreate as productInputCreate,
    ProductInputUpdate as productInputUpdate,
}

export type ProductInputCreate = typeof ProductInputCreate.static
export type ProductInputUpdate = typeof ProductInputUpdate.static

//#endregion