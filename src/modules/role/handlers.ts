import prisma from "../../database";
import {NotFoundError} from "elysia";
import {RoleInputCreate, RoleInputUpdate} from "../../generated/prismabox/Role";

export async function getRoles() {
    try {
        return await prisma.role.findMany({orderBy: {order: "asc"}})
    } catch (e: unknown) {
        console.log(`Error getting role: ${e}`)
        throw e
    }
}

export async function getRole(id: string) {
    const role = await prisma.role.findUnique({where: {id}})
    if (!role) {
        throw new NotFoundError('Role not found')
    }
    return role
}

export async function addRole(options: (typeof RoleInputCreate)["static"]) {
    try {
        const {name, permission, percentage} = options
        const order = await prisma.role.count()
        return await prisma.role.create({data: {order, name, permission, percentage}})
    } catch (e: unknown) {
        console.log(`Error creating role: ${e}`)
        throw e
    }
}

export async function updateRole(id: string, data: (typeof RoleInputUpdate)["static"]) {
    try {
        return await prisma.role.update({where: {id}, data})
    } catch (e: unknown) {
        console.log(`Error updating role: ${e}`)
        throw e
    }
}

export async function deleteRole(options: { id: string }) {
    try {
        const {id} = options
        return await prisma.role.delete({where: {id}})
    } catch (e: unknown) {
        console.log(`Error deleting role: ${e}`)
        throw e
    }
}