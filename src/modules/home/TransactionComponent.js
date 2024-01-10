import { useEffect, useState } from "react";
import styled from "styled-components"


const Container = styled.div`
display:flex;
flex-direction : column;
align-items : flex-start;
padding : 10px 22px;
font-size : 18px;
width : 100%;
gap:10px;
font-weight : bold;
& input {
    padding : 10px 12px;
    border-radius : 12px;
    background : #e6e8e9;
    border : 1px solid #e6e8e9;
    outline : none;
    width : 100%;
}

`;
const Cell = styled.div`
display : flex;
flex-direction : row;
padding : 10px 15px;
font-size : 14px;
border-radius : 2px;
justify-content : space-between;
width : 100%;
border : 1px solid #e6e8e9;
border-right : 4px solid ${(props)=>(props.isExpense ? 'red' : 'green')}

`;

const TransactionCell = (props)=>{
    
    return (
        <Cell isExpense = {props.payload?.type === "EXPENSE"}>
            <span>{props.payload.desc}</span>
            <span>${props.payload.amount}</span>
        </Cell>
    )
}
const TransactionComponent = (props) =>{
    const [filteredTranaction , updateTnx] = useState(props.transactions);
    const [searchText , updateSearchText] = useState("");

    const  filterdata = (searchText)=>{
        if(!searchText || !searchText.trim().length ){
            updateTnx(props.transactions)
            return; 
        }
        let tnx = [...props.transactions];
        tnx=tnx.filter((payload)=> payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
        updateTnx(tnx);
    }
    useEffect(()=>filterdata(searchText), [props.transactions])
    return <Container>Transactions
        <input placeholder="search"
         value = {searchText} 
         onChange = {(e)=>{
            updateSearchText(e.target.value);
             filterdata(e.target.value);
             }}
             />
        {filteredTranaction?.length?filteredTranaction.map((payload)=><TransactionCell payload = {payload}/>):""}
    </Container>
}
export default TransactionComponent;