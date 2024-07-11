import { Col, Row, Container, Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByUser } from '../feature/posts/postsSlice';
import BookingCardLayout from '../components/BookingCardLayout';

export default function Bookings() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            dispatch(fetchPostsByUser(userId));
        }
    }, [dispatch]);

    return (
        <Container>
            <Row>
                <Col>
                    {loading && (<Spinner animation='border' className='ms-3 mt-3' variant='primary' />)}
                    {posts.length > 0 && posts.map((post) => (
                        <BookingCardLayout key={post.id} content={post.content} postId={post.id} />
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

