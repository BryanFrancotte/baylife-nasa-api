import {Elysia, t} from "elysia";
import {addUser, deleteUser, getUser, getUsers, removeRoleFromUser, setRoleToUser, updateUser} from "./handlers";
import {
    UserPlain,
    UserPlainInputCreate,
    UserPlainInputUpdate
} from "../../generated/prismabox/User";

export const user = new Elysia({prefix: "/user"})
    .get("/",
        () => getUsers()
    )
    .get("/:id",
        ({params: {id}}) => getUser(id)
    )
    .post("/",
        ({body}) => addUser(body),
        {body: UserPlainInputCreate}
    )
    .put("/:id",
        ({params: {id}, body}) => updateUser(id, body),
        {params: t.Object({id: t.String()}), body: UserPlainInputUpdate}
    )
    .put("/:id/role",
        ({params: {id}, body}) => setRoleToUser(id, body.roleId),
        {params: t.Object({id: t.String()}), body: t.Object({roleId: t.String()})}
    )
    .delete("/:id",
        ({body}) => deleteUser(body),
        {body: t.Object({id: t.String()}), response: UserPlain}
    )
    .delete("/:id/role/:roleId",
        ({body}) => removeRoleFromUser(body.id, body.roleId),
        {body: t.Object({id: t.String(), roleId: t.String()})}
    );
