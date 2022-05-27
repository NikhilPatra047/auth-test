import React, {useRef, useState} from "react";
import { useGlobalContext } from "../contexts/AuthContext";
import {Card, Alert, Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const emailref = useRef('');

    const { passwordReset } = useGlobalContext();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    //ERROR
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await passwordReset(emailref.current.value);
            setMessage("Check your inbox for further instructions");
        } catch(err) {
            setError("Failed to reset password");
            console.log(err);
        }   

        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>

                    {/* { currentUser.email } */}
                    {message && <Alert variant='success'>{message}</Alert>}
                    { error && <Alert variant="danger">{error}</Alert> }

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Email" ref={emailref} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to='/login'>Log in</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to='/signup'>Sign up</Link>
            </div>
        </>
    );
};

export default ForgotPassword;