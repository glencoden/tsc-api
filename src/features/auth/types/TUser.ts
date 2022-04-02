type TUserSettings = {
    theme: string
}

export type TUser = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    settings?: TUserSettings,
    isAdmin?: boolean,
};