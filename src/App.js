import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
import ExpenseTracker from './ExpenseTracker';

function App() {
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Expense Sharing App</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                </Nav>
            </Navbar>
            <ExpenseTracker />
        </div>
    );
}

export default App;
