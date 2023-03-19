// const { secureHeapUsed } = require("crypto");

const boardStruct=document.querySelector('#board');
const winner=document.querySelector('#winner');
const h1=document.querySelector('h1');

//Modal creation
const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const openModalBtn=document.querySelector('.btn-open');
const closeModalBtn=document.querySelector('.btn-close');
const section=document.querySelector('section');

const closeModal=function(){
    modal.classList.add("hidden");
    section.classList.remove("blur");
    // overlay.classList.add("hidden");
}

//closing modal when various events fireUp!!!
closeModalBtn.addEventListener('click',closeModal);
section.addEventListener('click',closeModal);
document.addEventListener('keydown',(e)=>{
    if(e.key==="Escape" && !modal.classList.contains("hidden")) closeModal();
})
//Open modal event
const openModal=function(){
    modal.classList.remove("hidden");
    section.classList.add("blur");
}
openModalBtn.addEventListener('click',openModal);

let playerRed= 'R';
let playerYellow= 'Y';
let currPlayer= playerRed;
winner.innerText="Red's turn";
winner.classList.add('red-text');
let currColumns;
let gameOver= false;
let board=[];

let rows=6,columns=7;
window.onload=function(){
    setBoard();
    
    // winner.innerText="hello"
}
 function setBoard(){
    currColumns=[5,5,5,5,5,5,5];
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            row.push(' ');
            // html
            let tile=document.createElement('div');
            tile.classList.add('hovering');
            tile.id=r.toString()+"-"+c.toString();
            tile.addEventListener('click', setPiece);
            tile.classList.add('tile');
            boardStruct.append(tile);
        }
        board.push(row);
    }
 }
 function setPiece(){
    if(!gameOver){
        let coords=this.id.split('-');
        // let r=parseInt(coords[0]);
        let c=parseInt(coords[1]);

        r=currColumns[c];
        if(r<0) return;
        else{
        board[r][c]=currPlayer;
        let tile=document.getElementById(r.toString()+'-'+c.toString());
        if(currPlayer===playerRed){
            tile.classList.add('red');
            currPlayer=playerYellow;
            winner.innerText="Yellow's turn";
            winner.classList.remove('red-text');
            winner.classList.add('yellow-text');
        } else{
            tile.classList.add('yellow');
            currPlayer=playerRed;
            winner.innerText="Red's turn";
            winner.classList.remove('yellow-text');
            winner.classList.add('red-text');
        }
        r-=1;
        currColumns[c]=r;
    }
    checkWinner();
    } 
 }
 function checkWinner(){
    // Horizontally
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c]!=' '){
                if((board[r][c]==board[r][c+1])&&(board[r][c+1]==board[r][c+1+1])&&(board[r][c+2]==board[r][c+1+2])){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    // vertically
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c]!=' '){
                if((board[r][c]==board[r+1][c])&&(board[r+1][c]==board[r+2][c])&&(board[r+2][c]==board[r+3][c])){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    
    //anti-diagonal
    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c]!=' '){
                if((board[r][c]==board[r+1][c+1])&&(board[r+1][c+1]==board[r+2][c+2])&&(board[r+2][c+2]==board[r+3][c+3])){
                    setWinner(r,c);
                    return;
            }
        }
    }
}
    // diagonal
    for(let r=3;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]!=' '){
                if((board[r][c]==board[r-1][c+1])&&(board[r-1][c+1]==board[r-2][c+2])&&(board[r-2][c+2]==board[r-3][c+3])){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
 }
 function setWinner(r,c){
    if(board[r][c]==playerRed) {winner.innerText="Red Wins";winner.classList.remove('yellow-text');winner.classList.add('red-text');h1.classList.add('red-text')}
    else {winner.innerText="Yellow wins";winner.classList.remove('red-text');winner.classList.add('yellow-text');h1.classList.add('yellow-text')}
    gameOver=true;
 }


