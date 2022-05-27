import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert} from "react-bootstrap";
import { useGlobalContext }  from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const emailref = useRef('');
    const passwordref = useRef('');

    const { login, getData } = useGlobalContext();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailref.current.value, passwordref.current.value);
            await getData(emailref.current.value);

            navigate('/', {replace: true});

        } catch(err) {
            setError("Failed to sign in");
            console.log(err);
        }   

        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log in</h2>

                    {/* { currentUser.email } */}
                    { error && <Alert variant="danger">{error}</Alert> }

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Email" ref={emailref} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordref} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Log in</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/forgot-password'>Forgot Password ?</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to='/signup'>Sign up</Link>
            </div>
        </>
    );
};

export default Login;