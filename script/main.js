'use strict';

const cells = document.querySelectorAll('td');
const field = document.querySelector('tbody');
const button = document.querySelector('.message');
const fieldChilren = [...field.children];
const fieldMatrix = fieldChilren.map(row => [...row.children]);
let elemSelected
let selectedNumber
let arrSelectedNumber = []
let arrResult = []

let state = [
  [2, 2, 1, 2, 1, 2],
  [1, 1, 2, 2, 2, 2],
  [2, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2],
  [1, 1, 2, 2, 2, 2],
  [2, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2],
];

 const clearField = () => {
  state.forEach((row, indexRow) =>{
    row.forEach((cell, indexColom) => {
        const elem = fieldMatrix[indexRow][indexColom]
        elem.classList.remove('field-cell--8');
    })
  }) 
  arrSelectedNumber = []
  arrResult = []
console.log(`After clear ALLNumber - ${arrSelectedNumber}`)
console.log(`After clear SelectCell- ${arrResult}`)
 }

 button.addEventListener('click', clearField);

const findElem = (x, y) => {
   const newCells = []
 newCells.push([x + 1, y])
 newCells.push([x - 1, y])
 newCells.push([x, y + 1])
 newCells.push([x, y - 1])
 const filterCells = []
 console.log(`NewCells - ${newCells}`)
 console.log(`Arra in NEW- ${arrSelectedNumber}`)
  newCells.forEach(cell => {
    console.log(arrSelectedNumber.some(item => item[0] === cell[0] && item[1] === cell[1]))
      console.log(!arrResult.some(item => item[0] === cell[0] && item[1] === cell[1]))
    if(arrSelectedNumber.some(item => item[0] === cell[0] && item[1] === cell[1]) 
      && !arrResult.some(item => item[0] === cell[0] && item[1] === cell[1])) {
      filterCells.push(cell)
      arrResult.push(cell)
      console.log(`Result in find- ${arrResult}`)
    }
  })

 if (filterCells.length > 0) {
  filterCells.forEach(cell => {
    findElem(cell[0], cell[1])
  })
 } 
  console.log(`END arrResult - ${arrResult}`)
  arrResult.forEach (element => {
    const elem = fieldMatrix[element[0]][element[1]]
    elem.classList.add('field-cell--8');
  })
 

}

const creatArrSelectedCells = (arrSelectedNumber, elemSelected) => {
  findElem(elemSelected[0], elemSelected[1], arrSelectedNumber)
  arrResult.push(elemSelected)
  console.log(`Result- ${arrResult}`)
  console.log(`Arra- ${arrSelectedNumber}`)
console.log(`elemSelected- ${elemSelected}`)
} 

cells.forEach((elem, index) => {
  elem.addEventListener('click', (e) => {
    console.log(`${e.target.innerText} - ${index}`)
    elem.classList.add('Great');
    selectedNumber = e.target.innerText

  state.forEach((row, indexRow) =>{
   row.forEach((cell, indexColom) => {
     if (cell === +selectedNumber) {
       arrSelectedNumber.push([indexRow, indexColom])
       const elem = fieldMatrix[indexRow][indexColom]
      
       console.log(`Start- ${selectedNumber}`)
       if (elem.classList.contains('Great')) {
        elemSelected = [indexRow, indexColom]
       }
      }
    })

  }) 
  creatArrSelectedCells(arrSelectedNumber, elemSelected)
  });

})


