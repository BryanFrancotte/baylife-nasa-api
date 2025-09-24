import {Elysia, t} from "elysia";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from "./handlers";
import {addProductBody, productPlain, updateProductBody} from "./model";

export const product = new Elysia({prefix: "/product"})

    .get("/",
        () => getProducts()
    )
    .get("/:id",
        ({params:{id}}) => getProduct(id)
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
    .guard(
        {body: t.Object({id: t.String()})}
    )
    .delete("/:id", ({body}) => deleteProduct(body))
    //TODO: check if the delete is implemented correctly