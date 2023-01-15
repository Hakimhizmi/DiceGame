import React from "react";
import './App.css';
import { useState } from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import img from './img/daim.png'
import img1 from './img/gren.png'
import Swal from 'sweetalert2'




function App() {
  const dispatch = useDispatch()
  const state = useSelector((value) => value)
  const [sta,setSta] = useState(false)
  const [mines, setMines] = useState(1);
  const [Amount, setAmount] = useState(0);
  const [count, setcount] = useState(0);
  const [res1, setRes1] = useState();
  const [sta1,setSta1] = useState(false)
  const [wal, setWale] = useState(50);
 

  function select(i, index) {
    const te = i == 1 ? img : img1
    document.getElementById(index).innerHTML = '<img src=' + te + ' width="300" />';
    document.getElementById(index).style.pointerEvents = 'none';
    const action = { type: "play", data: i }
    dispatch(action)
    setcount(count+1)
    if(i===0){
      setSta1(false)
      setRes1(0)
      setcount(0)
      setTimeout(()=>{
        setWale(wal-Amount)
        const action = { type: "lose"}
        dispatch(action)
        setSta(false)
      },2000);
    }

  }

  function Cashout (){
    setSta1(false)
    const res =  (Amount * 2 ) / (9 - mines)
    setRes1(res*count)
    setWale(wal+(res*count))
    setTimeout(()=>{
      const action = { type: "lose"}
      dispatch(action)
      setSta(false)
      setRes1(0)
      setcount(0)
    },700);
    
  }
  
  function Bit() {
    if  (Amount > wal || mines > 3){
      Swal.fire({
        position: 'top-end',
        icon : "info" ,
        title: 'your cash is :  ' +wal.toFixed(2) +'$ \nChoose a mines less than 3 ',
        background : "#213743" ,
        color : "white",
        showConfirmButton: false,
        timer: 1500 ,
      })
     
    }
    else{
      setSta1(true)
      const action = { type: "generate", data: mines , sta : true }
      dispatch(action)
      setSta(true)
    }
    }

  console.log(state)
  console.log("c "+count+" am "+Amount+" mi "+mines+" re "+res1)  
  return (
    <>
    <div className="score">
      <h2><span style={{color:'#03e9f4'}}>Wal</span>let&nbsp; : <span style={{color:'#03e9f4'}}>&nbsp;{wal.toFixed(2)}$</span> </h2>
    </div>
      <div className="login-box">
            <h2> <span style={{color:'#03e9f4'}}>Mines</span> Game</h2>
            <form>
                <div className="user-box">
                    <input type="number"  required onChange={(e)=>{setAmount(e.target.value)}}  max={wal}/>
                    <label> <span style={{color:'#03e9f4'}}>Bet</span> Amount</label>
                </div>
                <div className="user-box">
                    <input type="number"  required max={3} onChange={(e)=>{setMines(e.target.value)}}/>
                    <label>Mines <span style={{color:'#03e9f4'}}>(1-3)</span>  </label>
                </div>
                
                <div className="user-box">
                <span style={{color:'#03e9f4'}}><span style={{color:'white'}}>Tot</span>al Profit</span>
                    <input type="number" disabled required value={res1}/>
                    
                </div>
                
                { sta1 ? 
                <a href="#" onClick={() => { Cashout() }}>
                    <span />
                    <span />
                    <span />
                    <span />
                    &nbsp;&nbsp;&nbsp;Cashout &nbsp;&nbsp;&nbsp;
                </a> : <a href="#" onClick={() => { Bit() }}>
                    <span />
                    <span />
                    <span />
                    <span />
                    &nbsp;&nbsp;&nbsp;Bit &nbsp;&nbsp;&nbsp;
                </a>
}
            </form>
            <h6>by hakim hizmi</h6>
        </div>
      <div  className="container">
        
        {sta ? state.map(
          (item, index) => {
            return (
              <div className="entry" id={index} onClick={() => {select(item, index) ; this.onclick = null; }}>
                <div className="entry-content" ></div>
                <div className="corner-container">
                  <span className="corner" />
                  <span className="corner" />
                  <span className="corner" />
                  <span className="corner" />
                </div>
              </div>
            )
            
          }
        ) : <h1  >start <span style={{color:'#03e9f4'}}>game</span> </h1>}

      </div>





      

    </>
  );
}

export default App;
