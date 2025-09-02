import { Elysia } from "elysia";

import swagger from "@elysiajs/swagger";
import apollo, {gql} from "@elysiajs/apollo";

import "./database/db.setup";

import {role} from "./modules/role";
import {fleet} from "./modules/fleet";

const app = new Elysia()
    .use(swagger())
    .use(apollo({
        typeDefs: gql`
				type Book {
					title: String
					author: String
				}

				type Query {
					books: [Book]
				}
			`,
        resolvers: {
            Query: {
                books: () => {
                    return [
                        {
                            title: 'Elysia',
                            author: 'saltyAom'
                        }
                    ]
                }
            }
        }
    }))
    .use(role)
    .use(fleet)
    .get("/", () => "Hello Elysia")
    .listen(5200);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
