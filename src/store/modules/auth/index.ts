import { defineStore } from "pinia";
enum Auth{
    USER='user',
    ADMIN='admin',
    SUPER='super'
}
type state = {
    user: {
        id?: number,
        userName?: string,
        nickName?: string,
        auth?: string,
        avatar?: string,
        token?: string
    },
    auth:`${Auth}`|undefined
}
export const useAuthStore = defineStore({
    id: 'authStore',
    state: ():state => ({
        user:{},
        auth:'super'
    }),
    actions: {

    },
    getters: {
        getAuth(state){
            return state.auth +'222'
        }
    }
})