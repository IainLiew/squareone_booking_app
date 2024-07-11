import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePost } from "../feature/posts/postsSlice";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function NewBookingModal({ show, handleclose }) {

    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [startDateTime, setStartDateTime] = useState(null);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(savePost(title, email, phone, service, startDateTime));
        handleclose();
        setTitle("");
        setEmail("");
        setPhone("");
        setService("");
        setStartDateTime("");
    };

    return (
        <>
            <Modal show={show} onHide={handleclose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="bookingformname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phonenumber">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control placeholder="+60" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="service">
                            <Form.Label>Service</Form.Label>
                            <Form.Select aria-label="Select" value={service} onChange={(e) => setService(e.target.value)}>
                                <option value="1">Personal Coaching</option>
                                <option value="2">Strength & Conditioning</option>
                                <option value="3">Multipurpose Court</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="datepicker">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date/Time"
                                    value={startDateTime}
                                    onChange={(date) => setStartDateTime(date)}
                                />
                            </LocalizationProvider>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="rounded-pil" onClick={handleSave}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
