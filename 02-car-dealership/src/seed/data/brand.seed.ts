import { v4 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Corolla',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Civic',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Cherokee',
    createAt: new Date().getTime(),
  },
];
