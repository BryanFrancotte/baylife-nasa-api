import {t} from "elysia";

export namespace  RoleModel {
    // Define a DTO for Elysia validation
    export const roleBody = t.Object({
        order: t.Number(),
        name: t.String(),
        permission: t.String(),
        percentage: t.Number(),
    })

    // Define it as a TypeScript type
    export type roleBody = typeof roleBody.static
}