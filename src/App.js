import { useState, useEffect, useRef } from 'react'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import { Blog_detail } from './components/Blog'
//import { voteBlog } from './reducers/blogReducer'
//import blogService from './services/blogs'
//import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setFlag } from './reducers/flagReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/loginReducer'
import { initializeUsersFromServer } from './reducers/usersReducer'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams, //useHistory, useNavigate
} from 'react-router-dom'
//import { Table } from 'react-bootstrap'


const Users = () => {
    const users = useSelector(state => state.users)
    if (!users) {
        return null
    }
    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

const User = () => {
    const user = useSelector(state => state.users)
    const id = useParams().id
    const userToShow = user.find(u => u.id === id)
    if (!userToShow) {
        return null
    }
    return (
        <div>
            <h2>{userToShow.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {userToShow.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
    //const blogs = useSelector(state => state.blogs)
    //console.log(blogs)
    //const [blogs, setBlogs] = useState([])
    // const [newTitle, setNewTitle] = useState('')
    // const [newAutor, setNewAuthor] = useState('')
    // const [newUrl, setNewUrl] = useState('')
    // const [showAll, setShowAll] = useState(true)
    // const [errorMessage, dispatch(setNotification] = useState(null)
    // const [flag, setFlag] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    // const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        // blogService.getAll().then(initialblogs =>
        //     setBlogs( initialblogs )
        // )
        dispatch(initializeBlogs())
        dispatch(initializeUsersFromServer())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON){
            // const user = JSON.parse(loggedUserJSON)
            // setUser(user)
            // blogService.setToken(user.token)
            dispatch(initializeUser())
        }
    }, [])



    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('logging in with', username, password)
        // try {
        // const user = await loginService.login({
        //     username, password,
        // })
        // window.localStorage.setItem(
        //     'loggedBlogappUser', JSON.stringify(user)
        // )

        dispatch(loginUser(username,password))
        // blogService.setToken(user.token)
        //setUser(user)
        setUsername('')
        setPassword('')
        // dispatch(setFlag('success',5))
        // dispatch(setNotification('Logged in successfully',5))
        // setTimeout(() => {
        //     dispatch(setNotification(null)
        //     setFlag('')
        // },5000)
        // } catch (exception) {
        //     dispatch(setFlag('error',5))
        //     dispatch(setNotification(exception.response.data.error,5))
        // } }
    }


    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleLogin={handleLogin}
                />
            </Togglable>
        )
    }

    const blogForm = () => {return (

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}
            // newTitle={newTitle} handleTitleChange={handleTitleChange}
            // newAutor={newAutor} handleAuthorChange={handleAuthorChange}
            // newUrl={newUrl} handleUrlChange={handleUrlChange}
            />
        </Togglable>
    )
    }

    const loggedin = () => {
        const padding = {
            paddingRight: 5
        }
        return (
            <div>
                <h2>blogs</h2>
                <Link style={padding} to="/blogs">blogs</Link>
                <Link style={padding} to="/users">users</Link>
                <p>{user.name} logged in
                    <button onClick={
                        () => dispatch(logoutUser())
                    }>logout</button>
                </p>
                {blogForm()}
                {/* <BlogList userview={user.name}/> */}
                {/* {blogs
                    .sort((a,b) => b.likes - a.likes)
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            // updateBlog={updateBlog}
                            // deleteBlogs={deleteBlog}
                            userview={user.name}
                        />
                    )} */}
            </div>
        )
    }

    // const Navigation_total = () => {
    //     const padding = {
    //         paddingRight: 5
    //     }
    //     return (
    //         <div>
    //             <Link style={padding} to="/">blogs</Link>
    //             <Link style={padding} to="/users">users</Link>
    //         </div>
    //     )
    // }

    // const updateBlog = async (id, blogObject) => {
    //     try{
    //         const returnedBlog = await blogService.update(id, blogObject)
    //         //setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

    //         dispatch(setFlag('success',5))
    //         dispatch(setNotification('Blog updated successfully',5))
    //         // setTimeout(() => {
    //         //     dispatch(setNotification(null)
    //         //     setFlag('')
    //         // },5000)
    //     }catch(exception){
    //         dispatch(setFlag('error',5))
    //         dispatch(setNotification(exception.response.data.error,5))
    //         // setTimeout(() => {
    //         //     dispatch(setNotification(null)
    //         //     setFlag('')
    //         // },5000)
    //     }
    // }

    // const deleteBlog = async (id) => {
    //     try{
    //         await blogService.remove(id)
    //         setBlogs(blogs.filter(blog => blog.id !== id))
    //         dispatch(setFlag('success',5))
    //         dispatch(setNotification('Blog deleted successfully',5))
    //         // setTimeout(() => {
    //         //     dispatch(setNotification(null)
    //         //     setFlag('')
    //         // },5000)
    //     }catch(exception){
    //         dispatch(setFlag('error',5))
    //         dispatch(setNotification(exception.response.data.error,5))
    //         // setTimeout(() => {
    //         //     dispatch(setNotification(null)
    //         //     setFlag('')
    //         // },5000)
    //     }
    // }

    const addBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            //const returnedBlog = await blogService.create(blogObject)
            dispatch(createBlog(blogObject))
            dispatch(setFlag('success',5))
            dispatch(setNotification('New blog added successfully',5))
            // setTimeout(() => {
            //     dispatch(setNotification(null)
            //     setFlag('')
            // },5000)
        }catch(exception){
            dispatch(setFlag('error',5))
            dispatch(setNotification(exception.response.data.error,5))
            // setTimeout(() => {
            //     dispatch(setNotification(null)
            //     setFlag('')
            // },5000)}

        }
    }


    return (
        <div className='container'>
            <Router>
                <div>
                    <h1>Blog App</h1>
                </div>
                <Notification />
                {user === null ?loginForm() :loggedin()}
                <Routes>
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/blogs/:id" element={<Blog_detail userview={user === null?null:user.name}/>} />
                </Routes>

            </Router>


            {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )} */}
        </div>
    )
}

export default App