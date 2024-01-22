import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Table.css';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Button } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';
const helpers = require('../utils/helpers');




const Summary = () => {
    const [transactions, setTransactions] = useState([])
    const [spendable, setSpendable] = useState(0.8)
    const initialToken = sessionStorage.getItem('token')
    const [token, setToken] = useState(initialToken)


    useEffect(() => {

        const fetchUserId = async (token) => {
            try {
                const decodedToken = jwtDecode(token)
                const email = decodedToken.email
                const users = await axios.get("http://localhost:8800/users")
                const user = users.data.find(transaction => transaction.email === email);
    
                let user_id = -1
                if (user) {
                    user_id = user.user_id;
                    console.log("User ID:", user_id);
                } else {
                    try {
                        // if the user doesn't exist, then add them to the list of users 
                        const user_id = uuidv4(); // Generate a new UUID for user_id

                        await fetch ('http://localhost:8800/users', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ email , user_id}),
                    })} catch(err) {

                    }
                }
                return user_id
    
        } catch (error) {
                console.error("Error fetching user ID:", error);
            }
    
        }
    
        const fetchAllTransactions = async () => {
            try {
                const token = sessionStorage.getItem('token')
                console.log(token)
    
                console.log(48)
                const user_id = await fetchUserId(token)
                console.log(50)
                const decodedToken = jwtDecode(token)
    
                const headers = {
                    headers: {
                      'token': token,
                  
                    }
                  };
                const res = await axios.get(`http://localhost:8800/transactions/${user_id}`, headers)
    
                setTransactions(res.data)
            } catch (err) {
                console.log("ERROR: " + err)
                window.location.href = '/login';
            }
        }
        fetchAllTransactions()
    
    }, [])

    let summaryTransactions = helpers.getSummaryList(transactions, spendable)

    // at this point summaryTransactions can be broken down into
    // summaryTransactions[i].date
    // summaryTransaction[i].totalAmount
    // summaryTransactions[i].spendable
    // summaryTransaction[i].totalSpent
    const handleSignOut = (e) => {
        setToken(null)
        sessionStorage.setItem('token', null)
        console.log(sessionStorage.getItem('token'))
        window.location.href = '/login';
    }

    const { pathname } = useLocation();

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                <Tabs value={pathname} >
                    <Tab label="Summary" component={Link} to="/summary" value="/summary" />
                    <Tab label="Spending History" component={Link} to="/history" value="/history" />
                </Tabs>
                <Button onClick={handleSignOut} variant="outlined" color="error" style={{ marginRight: 0 }}>Sign out</Button>
            </div>
            <div style={{ textAlign: 'center' }}>

                <h1>Summary</h1>

                <div>
                    <table style={{ margin: '0 auto' }}>
                        <thead>
                            <tr>
                                <th>Paycheck Date</th>
                                <th>Total Amount ($)</th>
                                <th>Spendable ($)</th>
                                <th>Total Spent ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className='td-2'>{transaction.date}</td>
                                    <td className='td-2'>{transaction.totalAmount}</td>
                                    <td className='td-2'>{transaction.spendable}</td>
                                    <td className='td-2'>{transaction.totalSpent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Button variant="contained" color="success"> Add Paycheck </Button>

            </div>
        </>


    )
}

export default Summary
