'use strict';

const cells = document.querySelectorAll('td');
const field = document.querySelector('tbody');
const button = document.querySelector('.message');
const fieldChilren = [...field.children];
const fieldMatrix = fieldChilren.map(row => [...row.children]);
let elemSelected  //coordinates of the selected element
let selectedNumber //value of the selected element
let arrSelectedNumber = []  //array elements with the value of the selected element over the whole field
let arrResult = []  //array elements with the value of the selected element according to the given conditionsi

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

const clearField = () => {    // clear the element marking
  state.forEach((row, indexRow) =>{
    row.forEach((cell, indexColom) => {
        const elem = fieldMatrix[indexRow][indexColom]
        elem.classList.remove('field-cell--8');
    })
  }) 
  arrSelectedNumber = []
  arrResult = []
}

button.addEventListener('click', clearField);

const findElem = (x, y) => {   // search for cells according to the condition
  const newCells = []
  const filterCells = []
  newCells.push([x + 1, y])
  newCells.push([x - 1, y])
  newCells.push([x, y + 1])
  newCells.push([x, y - 1])
 
  newCells.forEach(cell => {
    if(arrSelectedNumber.some(item => item[0] === cell[0] && item[1] === cell[1]) 
      && !arrResult.some(item => item[0] === cell[0] && item[1] === cell[1])) {
      filterCells.push(cell)
      arrResult.push(cell)
    }
  })

  if (filterCells.length > 0) {
    filterCells.forEach(cell => {
    findElem(cell[0], cell[1])
    })
  } else {
    arrResult.forEach (element => {    // label the cells that match the condition
      const elem = fieldMatrix[element[0]][element[1]]
      elem.classList.add('field-cell--8');
    })
  }
}

const creatArrSelectedCells = (arrSelectedNumber, elemSelected) => {   // create an array of cells matching the condition
  findElem(elemSelected[0], elemSelected[1], arrSelectedNumber)
    arrResult.push(elemSelected)
    arrResult.forEach (element => {
    const elem = fieldMatrix[element[0]][element[1]]
    elem.classList.add('field-cell--8');
  })
} 

cells.forEach((elem, index) => {                     //by going through all the elements of the field
  elem.addEventListener('click', (e) => {
    elem.classList.add('clicked-item');
    selectedNumber = e.target.innerText

    state.forEach((row, indexRow) =>{
      row.forEach((cell, indexColom) => {
        if (cell === +selectedNumber) {
          arrSelectedNumber.push([indexRow, indexColom])  // create an array of elements with the content as in the selected cell 
          const elem = fieldMatrix[indexRow][indexColom]
      
          if (elem.classList.contains('clicked-item')) {    // individuate the selected cell
            elemSelected = [indexRow, indexColom]
            elem.classList.remove('clicked-item')

          }
        }
      })
    }) 
    creatArrSelectedCells(arrSelectedNumber, elemSelected)
  });
})


