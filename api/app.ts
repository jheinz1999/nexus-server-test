import { use, server } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import cors from 'cors';

use(prisma())

server.express.use(cors());
