import { Col, Row, Button } from 'react-bootstrap';


export default function Bookings({ content }) {
    return (
        <Row className='p-3' style={{ borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3," }} >
            <Col sm={1}>
                <p>{content}</p>
                <Button variant='warning'>Edit</Button>
                <Button variant='danger'>Delete</Button>
            </Col>
        </Row>
    );
}