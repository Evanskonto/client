import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setError('Failed to fetch expenses');
        }
    };

    const addExpense = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const newExpense = { description, amount, paidBy };
            await axios.post('http://localhost:5001/api/expenses', newExpense);
            fetchExpenses();
            setDescription('');
            setAmount('');
            setPaidBy('');
        } catch (err) {
            setError('Failed to add expense');
        }
    };

    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);

    const deleteExpense = async (id) => {
        await axios.delete(`/api/expenses/${id}`); // Ensure this endpoint is defined in your Express server
        fetchExpenses();
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Expense Tracker</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={addExpense}>
                <Form.Group controlId="formDescription">
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAmount">
                    <Form.Control
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPaidBy">
                    <Form.Control
                        type="text"
                        placeholder="Paid By"
                        value={paidBy}
                        onChange={(e) => setPaidBy(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Add Expense
                </Button>
            </Form>
            <h4 className="mt-4">Total Expenses: ${totalExpenses}</h4>
            <Row className="mt-4">
                {expenses.map(expense => (
                    <Col key={expense.id} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{expense.description}</Card.Title>
                                <Card.Text>
                                    Amount: ${expense.amount}<br />
                                    Paid by: {expense.paidBy}
                                </Card.Text>
                                <Button variant="danger" onClick={() => deleteExpense(expense.id)}>
                                    <FaTrash /> Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExpenseTracker;