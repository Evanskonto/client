import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
    };

    const addExpense = async (e) => {
        e.preventDefault();
        const newExpense = { description, amount, paidBy };
        await axios.post('/api/expenses', newExpense);
        fetchExpenses(); // Refresh the expense list
        setDescription('');
        setAmount('');
        setPaidBy('');
    };

    return (
        <div>
            <h2>Expense Tracker</h2>
            <form onSubmit={addExpense}>
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Paid By" 
                    value={paidBy} 
                    onChange={(e) => setPaidBy(e.target.value)} 
                    required 
                />
                <button type="submit">Add Expense</button>
            </form>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description} - ${expense.amount} (Paid by: {expense.paidBy})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;