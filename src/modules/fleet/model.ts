import {t} from "elysia";

export namespace FleetModel {
    export const fleetBody = t.Object({
        name: t.String(),
        plate: t.String(),
        seating: t.Number(),
        storage: t.Number(),
        location: t.String(),
    })

    export type fleetBody = typeof fleetBody.static
}