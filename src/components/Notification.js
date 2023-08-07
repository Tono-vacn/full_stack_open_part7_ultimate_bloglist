import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification=(
    //{ message,flag }
) => {
    // const successStyle={
    //     color:'green',
    //     background:'lightgrey',
    //     fontSize:20,
    //     borderStyle:'solid',
    //     borderRadius:5,
    //     padding:10,
    //     marginBottom:10
    // }

    // const errorStyle={
    //     color:'red',
    //     background:'lightgrey',
    //     fontSize:20,
    //     borderStyle:'solid',
    //     borderRadius:5,
    //     padding:10,
    //     marginBottom:10
    // }

    const notification = useSelector(state => state.notification)
    const flag = useSelector(state => state.flag)

    if (notification===''){
        // console.log(notification)
        return null
    }
    else if (flag==='error'){
        // console.log(notification)
        return (
            // <div style={errorStyle} className="error">
            //     {notification}
            // </div>
            <Alert variant="error">
                {notification}
            </Alert>
        )
    }
    else{
        // console.log(notification)
        return (
            // <div style={successStyle}>
            //     {notification}
            // </div>
            <Alert variant="success">
                {notification}
            </Alert>
        )
    }
}

export default Notification