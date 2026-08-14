import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { users, customers, invoices, revenue } =
    require('../app/lib/placeholder-data');

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Start seeding...');

    // 1. Seed Users
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: hashedPassword,
            },
        });
    }

    console.log('✅ Users seeded');

    // 2. Seed Customers
    for (const customer of customers) {
        await prisma.customer.upsert({
            where: { id: customer.id },
            update: {},
            create: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                image_url: customer.image_url,
            },
        });
    }

    console.log('✅ Customers seeded');

    // 3. Seed Invoices
    for (const invoice of invoices) {
        await prisma.invoice.create({
            data: {
                customer_id: invoice.customer_id,
                amount: invoice.amount,
                status: invoice.status,
                date: new Date(invoice.date),
            },
        });
    }

    console.log('✅ Invoices seeded');

    // 4. Seed Revenue
    for (const rev of revenue) {
        await prisma.revenue.upsert({
            where: { month: rev.month },
            update: {},
            create: {
                month: rev.month,
                revenue: rev.revenue,
            },
        });
    }

    console.log('✅ Revenue seeded');
    console.log('🌱 Seeding finished successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });