import { Elysia } from "elysia";

import swagger from "@elysiajs/swagger";

import {role} from "./modules/role";
import {fleet} from "./modules/fleet";
import {product} from "./modules/product";

const app = new Elysia()
    .use(swagger())
    .use(role)
    .use(fleet)
    .use(product)
    .get("/", () => "Hello Elysia")
    .listen(5200);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
