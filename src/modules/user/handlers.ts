import {User, UserInputCreate, UserInputUpdate} from "../../generated/prismabox/User";
import prisma from "../../database";
import {t} from "elysia";

export async function getUsers(){
    try {
        return await prisma.user.findMany({
            include: {
                Role: true,
            }}
        )
    } catch (e: unknown) {
        console.log(`Error getting users: ${e}`)
        throw e;
    }
}

export async function getUser(id: string){
    const user = await prisma.user.findUnique({where: {id}})
    if (!user) {
        throw new Error(`User not found for id: ${id}`)
    }
    return user
}


export async function addUser(options: (typeof UserInputCreate)["static"]){
    try {
        const {name, email, phone, picture} = options
        return await prisma.user.create({data: {name, email, phone, picture}})
    } catch (e: unknown) {
        console.log(`Error adding user: ${e}`)
        throw e;
    }
}

export async function updateUser(id: string, options: (typeof UserInputUpdate)["static"]){
    try {
        const {name, email, phone, picture} = options
        return await prisma.user.update({where: {id}, data: {name, email, phone, picture}})
    } catch (e: unknown) {
        console.log(`Error updating user: ${e}`)
        throw e;
    }
}

export async function setRoleToUser(userId: string, roleId: string){
    try {
        return await prisma.user.update({
            where: {id: userId},
            data: {
                Role: {connect: {id: roleId}}
            },
            include: {Role: true}
        })
    } catch (e:unknown) {
        console.log(`Error adding role to user: ${e}`)
        throw e;
    }
}

export async function removeRoleFromUser(userId: string, roleId: string){
    try {
        return await prisma.user.update({
            where: {id: userId},
            data: {
                Role: {disconnect: {id: roleId}}
            },
            include: {Role: true}
        })
    } catch (e:unknown) {
        console.log(`Error removing role from user: ${e}`)
    }
}

export async function deleteUser(options: {id: string}){
    try {
        const {id} = options
        return await prisma.user.delete({where: {id}})
    } catch (e: unknown) {
        console.log(`Error deleting user: ${e}`)
        throw e;
    }
}