import {Elysia} from "elysia";
import Role from "../role/entity";
import {RoleModel} from "./model";

export const role = new Elysia({prefix: "/role"})
    .get("/", async ({ set }) => {
        try {
            return await Role.find();
        } catch (e: unknown) {
            set.status = 500;
            return {
                message: "Unable to fetch roles from database.",
                status: 500,
            }
        }
    })
    .post("/", async ({ body, set }) => {
        try {
            const newRole = await Role.create(body);
            return {
                message: "role added successfully.",
                status: 200,
            }
        } catch (e: unknown) {
            set.status = 500;
        }
    }, {
        body: RoleModel.roleBody,
    })