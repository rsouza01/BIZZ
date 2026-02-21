// server.ts
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import fs from 'fs';
import path from 'path';

const fastify = Fastify();
const DATA_PATH = path.join(__dirname, 'data');

fastify.register(cors);
fastify.register(fastifyStatic, {
  root: DATA_PATH,
  prefix: '/images/', 
});

// API to map the folder structure
fastify.get('/api/magazines', async () => {
  const dirs = fs.readdirSync(DATA_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const magPath = path.join(DATA_PATH, dirent.name);
      const images = fs.readdirSync(magPath)
        .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      
      return { name: dirent.name, images };
    });
  return dirs;
});

fastify.listen({ port: 3001 });