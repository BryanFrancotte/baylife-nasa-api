import prisma from "../../database";
import {NotFoundError} from "elysia";
import {CarInputCreate, CarInputUpdate} from "../../generated/prismabox/Car";

export async function getCars() {
    try {
        return await prisma.car.findMany({orderBy: {order: 'asc'}})
    } catch (e: unknown) {
        console.log(`Error getting car: ${e}`)
        throw e
    }
}

export async function getCar(id: string) {
    const car = await prisma.car.findUnique({where: {id}})
    if (!car) {
        throw new NotFoundError('Car not found')
    }
    return car
}

export async function addCar(options: (typeof CarInputCreate)["static"]) {
    try {
        const {vehicleName, plate, mileage, seating, storage, location} = options
        const order = await prisma.car.count()
        return await prisma.car.create({data: {order, vehicleName, plate, mileage, seating, storage, location}})
    } catch (e: unknown) {
        console.log(`Error creating car: ${e}`)
        throw e
    }
}

export async function updateCar(id: string, data: (typeof CarInputUpdate)["static"]) {
    try {
        return await prisma.car.update({where: {id}, data})
    } catch (e: unknown) {
        console.log(`Error updating car: ${e}`)
        throw e
    }
}

export async function deleteCar(options: { id: string }) {
    try {
        const {id} = options
        return await prisma.car.delete({where: {id}})
    } catch (e: unknown) {
        console.log(`Error deleting car: ${e}`)
        throw e
    }
}
