import styled from "styled-components"
import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import { useEffect, useState } from "react";



const Container = styled.div`
display:flex;
flex-direction : column;
font-family : montserrat;
align-items : center;
margin : 30px 0 10px;
width : 360px;
`
const HomeComponent = (props) =>{
    const [transactions,updateTransactions] = useState([]);
    const [expense,updateExpense] = useState(0);
    const [income, updateIncome] = useState(0)
    const addTransaction = (payload)=>{
        const transactionArray = [...transactions]
        transactionArray.push(payload);
        updateTransactions(transactionArray)
    }

    const calculateBalance = ()=>{
        let exp = 0;
        let inc = 0;

        transactions.map((payload) => {
            payload.type === "EXPENSE" ? (exp=exp + payload.amount) : (inc =inc + payload.amount)
        });
        updateIncome(inc);
        updateExpense(exp);
    }

    useEffect(()=>calculateBalance(), [transactions]);

    return <Container>
        <OverviewComponent addTransaction = {addTransaction} expense = {expense} income = {income}/>
        <TransactionComponent transactions = {transactions}/>
    </Container>
}
export default HomeComponent;