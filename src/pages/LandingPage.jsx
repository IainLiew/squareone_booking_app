import { useEffect } from "react";
import { Container, Col, Nav } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Header from "../components/Header";
import CardItem from "../components/CardItem";


export default function LandingPage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    // Check for authToken immediately upon component mount and whenever authToken changes
    useEffect(() => {
        if (!authToken) {
            navigate("/login"); // Redirect to login if token is not present
        }
    }, [authToken, navigate]);


    const handleLogout = () => {
        setAuthToken(""); // Clear token from localStorage
    };

    return (
        <>
            <Container>
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/landing">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Outlet />
            </Container>
            <Col sm={11}>
                <Header />
                <CardItem />

            </Col>
        </>
    );
}