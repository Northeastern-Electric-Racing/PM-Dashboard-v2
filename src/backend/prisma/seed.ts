/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { PrismaClient, Role } from '@prisma/client';
import { exampleAllUsers } from 'utils';

const prisma = new PrismaClient();

const performSeed: () => Promise<void> = async () => {
  for (const exampleUser of exampleAllUsers) {
    await prisma.user.create({
      data: {
        user_id: exampleUser.id,
        first_name: exampleUser.firstName,
        last_name: exampleUser.lastName,
        email_id: exampleUser.emailId,
        last_login: exampleUser.lastLogin,
        role: Role.LEADERSHIP
      }
    });
  }
};

performSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
