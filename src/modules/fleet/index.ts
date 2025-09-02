import {Elysia} from "elysia";
import Car from "../fleet/entity";
import {FleetModel} from "./model";

export const fleet = new Elysia({prefix: "/fleet"})
    .get("/", async ({ set }) => {
        try {
            return await Car.find();
        } catch (e: unknown) {
            set.status = 500;
            return {
                message: "Unable to fetch fleet from database.",
                status: 500,
            }
        }
    })
    .post("/", async ({ body, set }) => {
        try {
            const newCar = new Car(body);
            await newCar.save();
            return {
                message: "car added successfully.",
                status: 200,
            }
        } catch (e: unknown) {
            set.status = 500;
        }
    },  {
        body: FleetModel.fleetBody,
    })