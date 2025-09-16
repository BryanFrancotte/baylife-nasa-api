import {Elysia, t} from "elysia";
import {PrismaClient} from "../../generated/prisma"
import {CarPlain, CarPlainInputCreate} from "../../generated/prismabox/Car";

const prisma = new PrismaClient();

export const fleet = new Elysia({prefix: "/fleet"})
    .get("/",
        async () => await prisma.car.findMany(),
        {response: t.Array(CarPlain)})
    .post("/", async ({body}) => prisma.car.create({
        data: body
    }), {
        body: CarPlainInputCreate,
        response: CarPlain
    })