import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"] 
    : ["error"],
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("DB Connected via prisma");
        return true;
    }catch(error){
        console.error(`DB connection error: ${error}`);
        return false;
    }
}

const disconnectDB = async () => {
        await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB};