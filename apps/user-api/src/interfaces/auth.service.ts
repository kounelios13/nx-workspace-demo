export interface GenericAuthService {
    register(email: string, password: string, username ?: string): Promise<{ message: string; user: { username: string } }>

    login(email: string, password: string): Promise<{ username: string; token: string  , refreshToken: string }> 

    refreshToken(token: string): Promise<{ token: string }>
    logout(token: string): Promise<{ message: string }>
}
