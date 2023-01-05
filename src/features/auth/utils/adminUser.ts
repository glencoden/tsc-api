import 'dotenv/config';
import { TUser } from '../types/TUser';
import { getShaPass } from '../helpers/getShaPass';

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export default {
    userName: ADMIN_USERNAME,
    password: getShaPass(ADMIN_PASSWORD as string),
} as TUser;