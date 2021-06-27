import React from 'react';
import CartItem from './CartItem';

export default function CartList({value,increment,decrement,removeItem}) {
  return (
    <div className="container-fluid">
      {value.map(item=>{
      return <CartItem key={item._id} item={item} increment={increment} decrement={decrement} removeItem={removeItem}/>
      })}
     
    </div>
  )
}
