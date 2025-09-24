import {Elysia, t} from "elysia";
import {
    addProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from "./handlers";
import {
    addProductBody,
    productPlain,
    updateProductBody
} from "./model";

export const product = new Elysia({prefix: "/product"})
    .get("/",
        () => getProducts()
    )
    .get("/:id",
        ({params:{id}}) => getProduct(id),
        {params: t.Object({id: t.String()})}
    )
    .guard(
        {body: addProductBody}
    )
    .post("/",
        ({body}) => addProduct(body),
        {response: productPlain}
    )
    .guard(
        {body: updateProductBody}
    )
    .patch("/:id",
        ({params: {id}, body}) => updateProduct(id, body),
        {params: t.Object({id: t.String()}), response: productPlain}
    )
    .delete("/:id",
        ({params: {id}}) => deleteProduct(id),
        {params: t.Object({id: t.String()}), response: productPlain}
    )