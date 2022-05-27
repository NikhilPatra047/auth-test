import React, {useState} from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useGlobalContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const DashBoard = () => {
    const [error, setError] = useState();
    const {currentUser, logout, userData} = useGlobalContext();
    const {name, userID} = userData;

    const handleLogout = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await logout();
        } catch(err) {
            setError('Failed to log out');
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Name: </strong> {name}
                    <br />
                    <strong>Id: </strong> {userID}
                    <br />
                    <strong>Email: </strong> {currentUser.email}
                    <br/>
                    <Link to='/update-profile' className="mt-4">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    );
};

export default DashBoard;