import {reactive} from 'vue'
import axios from "axios";

export const userData = reactive({
    isLoggedIn: false,
    accessToken: "",
    refreshToken: "",
    issuedAt: 0,
    expiresAt: 0,
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: 0,
    isAdmin: false,
    logIn: function (accessToken: string, refreshToken: string) {
        console.log()
        console.log("Login")
        this.isLoggedIn = true
        this.setNewTokens(accessToken, refreshToken)
        console.log("Access Token:")
        console.log(accessToken)
        console.log()
        try {
            this.processToken()
            this.ensureValidity()
        } catch (e) {
            this.logOut()
        }
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
        this.isLoggedIn = false
        this.accessToken = ""
        this.refreshToken = ""
        localStorage.accessToken = this.accessToken
        localStorage.refreshToken = this.refreshToken
        this.issuedAt = 0
        this.expiresAt = 0
        this.id = 0
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.phone = ""
        this.role = 0
        this.isAdmin = false
    },
    fetchUserInfo: function () {
        axios.get("/api/users/data", {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }).then(r => {
                console.log(r)
                this.firstName = r.data.firstName.trim()
                this.lastName = r.data.lastName.trim()
                this.email = r.data.email.trim()
                this.phone = r.data.phone.trim()
                this.role = r.data.role
                this.isAdmin = r.data.isAdmin
            }
        ).catch(() => {
            this.logOut()
        })
    },
    getAuthHeader: function () {
        this.ensureValidity()
        return {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }
    },
    getFullName: function () {
        return this.firstName + " " + this.lastName
    },
    getCanAddToWiki: function () {
        return this.isAdmin || this.role === 2 || this.role === 4
    },
    getCanEditOrDeleteWiki: function (authorId: number) {
        return this.isAdmin || this.id === authorId
    }
})