import User from "../database/schemas/User";

declare global {
    namespace Express{
        export interface Request{
            user: Partial<User>
        }
    }
}