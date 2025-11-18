import { createStore } from 'vuex'
interface UserInfo {
    account: string
    nickname: string
    id: number
}

const store = createStore<UserInfo>({
    state() {
        return {
            account: '',
            nickname: '',
            id: NaN
        }
    },
    getters: {
        isLogin: (state) => {
            return !isNaN(state.id)
        }
    },
    mutations: {
        clearUserInfo(state) {
            state.account = "";
            state.nickname = "";
            state.id = NaN
        },
        registUserInfo(state, userinfo: UserInfo) {
            state.account = userinfo.account;
            state.nickname = userinfo.nickname;
            state.id = userinfo.id
        }
    }
})
export default store;
export { UserInfo };