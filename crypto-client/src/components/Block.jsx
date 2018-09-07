import React from 'react';

// function doSomething(num) {
//   num.block.
// }

// function doSomething(num) {
//   return num + 1;
// }

// function doSomething(num) {
//   const arr = [];
//   debugger;
//   arr.push(num);
//   debugger;
//   return arr;
// }

// function doSomething(num) {
//   const arr = [];
//   arr.push(num);
//   const value = arr.reduce((accumulator, value) => {
//     return accumulator + value;
//   }, 0)
//   return value;
// }

function Block({ block }) {
  return (
    <span>{block.transaction_num}</span>
  )
}

export default Block;
