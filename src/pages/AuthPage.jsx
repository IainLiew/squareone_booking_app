import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import squareone from "../components/images/squareone.png"
import { AuthContext } from "../components/AuthProvider";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/landing");
    }, [currentUser, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password,
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col sm={6} >
                <Image src={squareone} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="bi bi-house-fill" style={{ fontSize: 50, color: "black" }}></i>

                <p className="mt-5" style={{ fontSize: 64 }}>Training Tomorrows Athletes</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Welcome To SquareOne</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"> Sign up with Google</i>
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}>By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use</p>
                    <p className="mt-5" style={{ fontWeight: "bold" }}>Already have an account?</p>
                    <Button className="rounded-pill" variant="outline-primary" onClick={handleShowLogin}>Sign In</Button>
                </Col>
                <Modal show={modalShow} onHide={handleClose} centered>
                    <Modal.Body className="d-grid gap-2 px-5">
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp" ? "Create your account" : "Log in to your account"}</h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignup : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className="rounded-pill" variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className="rounded=pill" variant="primary" type="submit">
                                {modalShow === "Signup" ? "SignUp" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}