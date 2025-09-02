import {Elysia} from "elysia";

export const role = new Elysia({prefix: "/role"})
    .get("/", () => "Hello role controller!")