import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
const LoginForm = ({
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button variant="primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
            {/* <form onSubmit={handleLogin}>
                <div>
                  username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id = 'username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                  password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id = 'password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form> */}
        </div>
    )}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm