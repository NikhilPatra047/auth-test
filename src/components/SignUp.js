import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useGlobalContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from '../firebase';
import {collection, addDoc} from "firebase/firestore";

function SignUp() {
    const emailref = useRef('');
    const passwordref = useRef('');
    const passwordConfirmref = useRef('');
    const nameref = useRef('');

    const { signup } = useGlobalContext();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //ERROR
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordref.current.value !== passwordConfirmref.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailref.current.value, passwordref.current.value);

            await addDoc(collection(db, 'userData'), {
                name: nameref.current.value,
                email: emailref.current.value,
                image: ''
            });

        } catch (err) {
            setError("Failed to create account");
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">SignUp</h2>

                    {/* { currentUser.email } */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Name" ref={nameref} />
                        </Form.Group>
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
                        <Form.Group id="passwordConfirm">
                            <Form.Label>
                                Password Confirmation
                            </Form.Label>
                            <Form.Control type="password" placeholder="Retype Password" ref={passwordConfirmref} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to='/login'>Log in</Link>
            </div>
        </>
    );
};

export default SignUp;