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
            const mappedCar = await mapCar(body);
            const newCar = Car.create(mappedCar)
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

async function mapCar(input: FleetModel.fleetBody){
    const carCount = await Car.countDocuments();
    return {
        order: carCount + 1,
        vehicleType: input.name,
        plate: input.plate,
        mileage: 0,
        seating: input.seating,
        storage: input.storage,
        location: input.location,
    }
}