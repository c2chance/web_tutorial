import { defineStore, StoreDefinition } from 'pinia'

export const useStore = defineStore('main', {
	state(){
		return { userInfo: {}, token:'' }
	},
	actions:{
		setUserInfo(userInfo:object) {
			this.userInfo = userInfo
		},
		setToken(token: string) {
			this.token = token
		}
	},
	persist:{
		key:'userData',
		storage: window.sessionStorage,
		paths: ['userInfo', 'token']
	}
})
