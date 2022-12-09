import { reactive } from 'vue'
import axios from "axios";

export const userData = reactive({
    loggedIn: false,
    accessToken: "",
    refreshToken: "",
    issuedAt: 0,
    expiresAt: 0,
    id: 0,
    logIn: function (accessToken: string, refreshToken: string) {
        console.log()
        console.log("Login")
        this.loggedIn = true
        this.setNewTokens(accessToken, refreshToken)
        console.log("Access Token:")
        console.log(accessToken)
        console.log()
        this.processToken()
        this.ensureValidity()
    },
    setNewTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        localStorage.accessToken = this.accessToken
        localStorage.refreshToken = this.refreshToken
    },
    ensureValidity: async function () {
        const expiryDate = new Date(this.expiresAt * 1000)
        if (expiryDate.getTime() - 100000 < Date.now()) {
            console.log("Trying to Refresh")
            const data = {
                accessToken: this.accessToken
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${this.refreshToken}`
                }
            }
            const response = await axios.post("/api/user/refresh", data, config)
            console.log(response)
            if (response.data.accessToken === undefined) {
                this.logOut()
                return
            }
            this.setNewTokens(response.data.accessToken, response.data.refreshToken)
        }
        this.processToken()
        this.fetchUserInfo()
    },
    processToken: function () {
        let tokenData = JSON.parse(atob(this.accessToken.split('.')[1]))
        this.id = tokenData.id
        this.issuedAt = tokenData.iat
        this.expiresAt = tokenData.exp
    },
    logOut: function () {
        this.loggedIn = false
        this.accessToken = ""
        this.refreshToken = ""
        localStorage.accessToken = this.accessToken
        localStorage.refreshToken = this.refreshToken
        this.issuedAt = 0
        this.expiresAt = 0
        this.id = 0
    },
    fetchUserInfo: function () {
    },
    getAuthHeader: function () {
        this.ensureValidity()
        return {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }
    }
})