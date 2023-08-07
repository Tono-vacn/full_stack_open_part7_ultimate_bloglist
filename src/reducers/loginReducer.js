import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setFlag } from './flagReducer'

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        login(state,action) {
            return action.payload
        },
        logout() {
            return null
        }
    }
})

export const { login, logout } = loginSlice.actions
export const loginUser = (username,password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(login(user))
            dispatch(setFlag('success',5))
            dispatch(setNotification(`${user.name} logged in`,5))
        } catch (exception) {
            dispatch(setFlag('error',5))
            dispatch(setNotification('Wrong credentials',5))
        }
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(login(user))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(logout())
        dispatch(setFlag('success'))
        dispatch(setNotification('Logged out',5))
    }
}
export default loginSlice.reducer