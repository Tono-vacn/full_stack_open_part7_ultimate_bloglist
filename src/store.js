import { configureStore } from '@reduxjs/toolkit'
// import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import flagReducer from './reducers/flagReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
// import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        //anecdotes: anecdoteReducer,
        notification: notificationReducer,
        flag: flagReducer,
        blogs: blogReducer,
        login: loginReducer,
        users: usersReducer,
        //filter: filterReducer
    }
})

export default store