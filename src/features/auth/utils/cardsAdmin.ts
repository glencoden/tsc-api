import 'dotenv/config';
import { TUser } from '../types/TUser';
import { getShaPass } from '../helpers/getShaPass';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export default {
    firstName: 'Simon',
    lastName: 'Meyer',
    userName: ADMIN_USERNAME,
    email: 'simon.der.meyer@gmail.com',
    password: getShaPass(ADMIN_PASSWORD as string),
    isAdmin: true,
} as TUser;