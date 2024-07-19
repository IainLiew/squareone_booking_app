import { Col, Row, Container, Spinner } from 'react-bootstrap';
//import { jwtDecode } from 'jwt-decode';
//import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchPostsByUser } from '../feature/posts/postsSlice';
import BookingCardLayout from '../components/BookingCardLayout';

export default function Bookings() {
    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);

    //useEffect(() => {
    //  const token = localStorage.getItem("authToken");
    //if (token) {
    //  const decodedToken = jwtDecode(token);
    //const userId = decodedToken.id;
    // dispatch(fetchPostsByUser(userId));
    // }
    //}, [dispatch]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Your Bookings</h1>
                    <p>
                        {loading && (<Spinner animation='border' className='ms-3 mt-3' variant='primary' />)}
                        {bookings.length > 0 && bookings.map((booking) => (
                            <BookingCardLayout key={booking.id} content={booking.content} bookingId={booking.id} />
                        ))}
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

