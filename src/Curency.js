import React, { useEffect, useState } from 'react'

const Curency = () => {
    const[from,Setfrom]=useState("USD");
    const[to,Setto]=useState("INR");
    const[value,Setvalue]=useState(100);
    const[ans,Setans]=useState(null);
   
   
   
   useEffect(function(){
        async function Curencyvalue() {
            let res= await fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${from}&to=${to}`);
            let data = await res.json();
            console.log(data);
            if(from === to && value(null)&&!data.rates[to]){
              Setans(value);
            }
            else{
            Setans(data.rates[to]);}
        }
      Curencyvalue();

     },[from,to,value]) 
 


  return (
    <div>
        <input
            type="number"
             onChange={(e) =>Setvalue(e.target.value)}
        />
     <select onChange={(e)=>Setfrom(e.target.value)} value={from}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e)=>Setto(e.target.value)} value={to}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{ans}  {to}</p>
    </div>
  );
}

export default Curency