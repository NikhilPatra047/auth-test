import React, { useRef, useState } from "react";
import { useGlobalContext } from "../contexts/AuthContext";
import { Card, Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const emailref = useRef('');
    const nameref = useRef('');

    const { currentUser, userData, updateName, getData  } = useGlobalContext();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { name } = userData;

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError("");
            setLoading(true);

            await updateName(nameref.current.value, currentUser.email);
            await getData(currentUser.email);

            setMessage('Updated Successfully');
        } catch (err) {
            setMessage('');
            setError("Failed to update profile");
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>

                    {/* { currentUser.email } */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Name" ref={nameref} required
                                defaultValue={name} />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Email" ref={emailref} required
                                defaultValue={currentUser.email} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 btn btn-primary mt-2" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;