import { useState } from 'react'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { ExpensesPage } from './pages/ExpensesPage'
import { IncomesPage } from './pages/IncomesPage'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { AddExpensePage } from './pages/AddExpensePage'
import { UpdateExpensePage } from './pages/UpdateExpensePage'
import { AddIncomePage } from './pages/AddIncomePage'
import BarChart from './components/BarChart'
import Chatbot from './components/Chatbot'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/expenses" element = {<ExpensesPage/>}/>
            <Route path = "/incomes" element = {<IncomesPage/>}/>
            <Route path = "/addExpense" element= {<AddExpensePage/>}/>
            <Route path = "/addIncome" element= {<AddIncomePage/>}/>
            <Route path='/updateExpense' element= {<UpdateExpensePage/>}/>
            <Route path='/bar' element= {<BarChart/>}/>
            <Route path='/chatbot' element= {<Chatbot/>}/>

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
