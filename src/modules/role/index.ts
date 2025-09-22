import {Elysia, t} from "elysia";
import {Role, RolePlain, RolePlainInputCreate} from "../../generated/prismabox/Role";
import {addRole, deleteRole, getRoles, updateRole} from "./handlers";

export const role = new Elysia({prefix: "/role"})
    .get("/",
        () => getRoles(),
        {response: t.Array(RolePlain)})
    .get("/:id", () => "get post by id")
    .post("/",
        ({body}) => addRole(body),
        {body: RolePlainInputCreate, response: RolePlain}
    )
    .patch("/:id",
        ({params: {id}, body}) => updateRole(id, body),
        {params: t.Object({id: t.String()}), body: RolePlainInputCreate, response: RolePlain}
    )
    .delete("/",
        ({body}) => deleteRole(body),
        {body: t.Object({id: t.String()}), response: RolePlain}
    )