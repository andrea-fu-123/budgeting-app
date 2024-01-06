import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Table.css';
import { getSpentHistory } from '../utils/helpers';
import {Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';



const SpendingHistory = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
          const token = sessionStorage.getItem('token')
          console.log("Token in Summary.jsx: " + token)
          const headers = { headers: { 'token': token }}
          const res = await axios.get("http://localhost:8800/transactions", headers)

          setTransactions(res.data)
      } catch (err) {
          console.log("ERROR: " + err)
          window.location.href = '/login';
      }
  }
  fetchAllTransactions()

  }, [])
  let negativeTransactions = getSpentHistory(transactions)

  const { pathname } = useLocation();
  console.log(pathname)
  return (
    <>
      <Tabs value={pathname}>
        <Tab label="Summary" component={Link} to="/summary" value="/summary" />
        <Tab label="Spending History" component={Link} to="/history" value="/history" />
      </Tabs>
      <div style={{ textAlign: 'center' }}>
        <h1>Spending History</h1>
        <div>
          <table style={{ margin: '0 auto' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount Spent ($) </th>
              </tr>
            </thead>
            <tbody>
              {negativeTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className='td-1'>{transaction.date}</td>
                  <td className='td-1'>{-1 * transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

export default SpendingHistory
