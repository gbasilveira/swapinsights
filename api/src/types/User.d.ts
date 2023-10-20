interface User {
    id: number,
    email: string,
    name: string,
    role: string,
    password?: string,
    passwordHash?: string
    profileId: number
}