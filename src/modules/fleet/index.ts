import {Elysia, t} from "elysia";
import {Car, CarInputCreate, CarInputUpdate} from "../../generated/prismabox/Car";
import {addCar, deleteCar, getCar, getCars, updateCar} from "./handlers";

export const fleet = new Elysia({prefix: "/fleet"})
    .get("/",
        () => getCars(),
        {response: t.Array(Car)}
    )
    .get("/:id",
        ({params: {id}}) => getCar(id),
        {params: t.Object({id: t.String()}), response: Car}
    )
    .post("/",
        ({body}) => addCar(body),
        {body: CarInputCreate, response: Car}
    )
    .patch("/:id",
        ({params: {id}, body}) => updateCar(id, body),
        {params: t.Object({id: t.String()}), body: CarInputUpdate, response: Car}
    )
    .delete("/",
        ({body}) => deleteCar(body),
        {body: t.Object({id: t.String()}), response: Car})