import { PrismaClient } from "@prisma/client";


let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {
 if (!prisma) {
    prisma = new PrismaClient();
 } else {
  
  console.log(Error)
 }
 return prisma;
}


