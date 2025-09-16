import {Elysia, t} from "elysia";
import {PrismaClient} from "../../generated/prisma";
import {RolePlain, RolePlainInputCreate} from "../../generated/prismabox/Role";

const prisma = new PrismaClient();

export const role = new Elysia({prefix: "/role"})
    .get("/", async () => await prisma.role.findMany(), {response: t.Array(RolePlain)})
    .post("/", async ({body}) => prisma.role.create({
        data: body
    }), {
        body: RolePlainInputCreate,
        response: RolePlain
    }
    )