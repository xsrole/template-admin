import http from "@/http"
import '@/mock/user.mock'
export const _feachLogin = (data) => {
    return http.post('user/login', data)
}
export const _feachStatus = () => {
    return http.get('user/status')
}