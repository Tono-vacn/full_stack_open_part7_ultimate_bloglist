//import{ useState } from 'react'
import { voteBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setFlag } from '../reducers/flagReducer'
import { useParams, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export const Blog_detail = ({ userview }) => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blogToShow = blogs.find(b => b.id === id)
    const dispatch = useDispatch()

    const addLike = async (event) => {
        event.preventDefault()
        const blogObject = {
            user: blogToShow.user,
            title: blogToShow.title,
            author: blogToShow.author,
            url: blogToShow.url,
            likes: blogToShow.likes+1
        }
        try{console.log(blogObject)
        // updateBlog(blog.id,blogObject)
            dispatch(voteBlog(blogToShow.id,blogObject))
            dispatch(setFlag('success',5))
            dispatch(setNotification('Blog updated successfully',5))}
        catch(exception){
            dispatch(setFlag('error',5))
            dispatch(setNotification('Blog update failed',5))
        }
    }

    const delete_Blog = async (event) => {
        event.preventDefault()
        try{if(window.confirm(`Remove blog ${blogToShow.title} by ${blogToShow.author}`)){
            dispatch(deleteBlog(blogToShow.id))
        }}catch(exception){
            dispatch(setFlag('error',5))
            dispatch(setNotification('Blog deletion failed',5))
        }

    }

    const add_comment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        try{
            dispatch(addBlogComment(blogToShow.id,comment))
            dispatch(setFlag('success',5))
            dispatch(setNotification('Comment added successfully',5))
        }catch(exception){
            dispatch(setFlag('error',5))
            dispatch(setNotification('Comment addition failed',5))
        }

    }

    if (!blogToShow) {
        return null
    }
    if (userview !== blogToShow.user.name){
        return (
            <div>
                <h2>{blogToShow.title}</h2>
                <a href={blogToShow.url}>{blogToShow.url}</a>
                <p>{blogToShow.likes} likes <button onClick={addLike}>like</button></p>
                <p>added by {blogToShow.author}</p>
                <h3>comments</h3>
                <form onSubmit={add_comment}>
                    <input name="comment"/>
                    <button type="submit">add comment</button>
                </form>

                <ul>
                    {blogToShow.comments.map((comment,index) => <li key={index}>{comment}</li>)}
                </ul>
            </div>
        )
    }
    else{
        return (
            <div>
                <h2>{blogToShow.title}</h2>
                <a href={blogToShow.url}>{blogToShow.url}</a>
                <p>{blogToShow.likes} likes <button onClick={addLike}>like</button></p>
                <p>added by {blogToShow.author}</p>
                <button onClick={delete_Blog}>remove</button>
                <h3>comments</h3>
                <form onSubmit={add_comment}>
                    <input name="comment"/>
                    <button type="submit">add comment</button>
                </form>
                <ul>
                    {blogToShow.comments.map((comment,index) => <li key={index}>{comment}</li>)}
                </ul>
            </div>
        )
    }
}

const Blog = ({
    blog,
    // userview
}) => {
    //const dispatch = useDispatch()
    //const blogs = useSelector(state => state.blogs)
    // const [visible, setVisible] = useState(false)
    // const hideWhenVisible = { display: visible ? 'none' : '' }
    // const showWhenVisible = { display: visible ? '' : 'none' }


    // const blogStyle = {
    //     paddingTop: 10,
    //     paddingLeft: 2,
    //     border: 'solid',
    //     borderWidth: 1,
    //     marginBottom: 5
    // }

    return(
        // <div style={blogStyle}>
        <div>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
    )

    // const addLike = async (event) => {
    //     event.preventDefault()
    //     const blogObject = {
    //         user: blog.user,
    //         title: blog.title,
    //         author: blog.author,
    //         url: blog.url,
    //         likes: blog.likes+1
    //     }
    //     try{console.log(blogObject)
    //     // updateBlog(blog.id,blogObject)
    //         dispatch(voteBlog(blog.id,blogObject))
    //         dispatch(setFlag('success',5))
    //         dispatch(setNotification('Blog updated successfully',5))}
    //     catch(exception){
    //         dispatch(setFlag('error',5))
    //         dispatch(setNotification('Blog update failed',5))
    //     }
    // }

    // const delete_Blog = async (event) => {
    //     event.preventDefault()
    //     try{if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
    //         dispatch(deleteBlog(blog.id))
    //     }}catch(exception){
    //         dispatch(setFlag('error',5))
    //         dispatch(setNotification('Blog deletion failed',5))
    //     }

    // }

    // if (userview !== blog.user.name){
    //     //console.log('can not delete')
    //     //console.log(userview)
    //     // console.log(blog)
    //     return (
    //         <div style={blogStyle} className='blog'>
    //             <div>
    //                 {blog.title}
    //                 <div style={hideWhenVisible} >
    //                     Title: {blog.title} by {blog.author}<br/>
    //                     <button onClick={() => {setVisible(!visible)}}>view</button>
    //                 </div>
    //                 <div style={showWhenVisible}>
    //                     {blog.title}<br/>
    //                     {blog.url}<br/>
    //                     {blog.likes} likes<button onClick={addLike}>like</button><br/>
    //                     {blog.author}<br/>
    //                     <button onClick={() => {setVisible(!visible)}}>hide</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    // else{
    //     // console.log('can delete')
    //     // console.log(userview)
    //     // console.log(blog.user.name)
    //     return (
    //         <div style={blogStyle} className='blog'>
    //             <div>
    //                 {blog.title}
    //                 <div style={hideWhenVisible} >
    //                 Title: {blog.title} by {blog.author}<br/>
    //                     <button onClick={() => {setVisible(!visible)}}>view</button>
    //                 </div>
    //                 <div style={showWhenVisible}>
    //                     {blog.title}<br/>
    //                     {blog.url}<br/>
    //                     {blog.likes} likes<button onClick={addLike}>like</button><br/>
    //                     {blog.author}<br/>
    //                     <button onClick={delete_Blog}>delete</button>
    //                     <button onClick={() => {setVisible(!visible)}}>hide</button>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

const BlogList = (
    // { userview }
) => {
    //const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    return(
        <>
            <div>
                <Table striped>
                    <tbody>
                        {blogs.map(blog => blog).sort((a,b) => b.likes - a.likes).map(blog =>
                            <tr key={blog.id}>
                                <td>
                                    <Blog key={blog.id} blog={blog}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            {/* <div>
                {blogs.map(blog => blog).sort((a,b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog}
                    // userview={userview}
                />)}
            </div> */}
        </>
    )
}

export default BlogList