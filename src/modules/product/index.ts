import { PrismaClient } from "../../generated/prisma"
import {Elysia, t} from "elysia";
import {ProductPlain, ProductPlainInputCreate} from "../../generated/prismabox/Product";

const prisma = new PrismaClient()

export const product = new Elysia({prefix: "/product"})
    .get("/", async () => await prisma.product.findMany(), {response: t.Array(ProductPlain)})
    .get("/:id", () => "get post by id")
    .post("/", async ({body}) => prisma.product.create(
        {data: body}
    ), {
        body: ProductPlainInputCreate,
        response: ProductPlain
    })
    .patch("/:id", () => "update post by id")
    .delete("/:id", () => "delete post by id")
