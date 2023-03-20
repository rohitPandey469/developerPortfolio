let board, playerO="O",playerX="X";
let currPlayer= playerO;
let gameOver=false;

window.onload= function(){
    setGame();
}

function setGame(){
    board=[
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ];

    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){

            // div element creation
            let tile=document.createElement("div");
            tile.id=r.toString()+'-'+c.toString();
            tile.classList.add('tile');
            if((r===0)||(r===1)){
                tile.classList.add('horizontal-line');
            }
            if((c===0)||(c===1)){
                tile.classList.add('vertical-line');
            }
            tile.addEventListener('click',setTile);
            document.querySelector('#board').append(tile);
        }
    }
}
// class setTile{}
function setTile(){
    if(gameOver){
        return;
    }
    let coords=this.id.split('-');
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    
    if(board[r][c]!=null){
        return;
    }

    board[r][c]=currPlayer;
    this.innerText=currPlayer;
    if(currPlayer==playerO) currPlayer=playerX;
    else currPlayer=playerO;
    
    checkWinner();
}


function checkWinner(){
    //horizontally
    for(let r=0;r<3;r++){
        if((board[r][0]!=null)&&((board[r][0]==board[r][1])&&(board[r][1]==board[r][2] ))){
            for(let i=0;i<3;i++){
                let tile=document.getElementById(r.toString()+'-'+i.toString());
                tile.classList.add('winner');
            }
            gameOver=true;
            return;
        }
    }
    //vertically
    for(let c=0;c<3;c++){
        if( ((board[0][c]== board[1][c])&&(board[1][c]== board[2][c]) )&&(board[0][c]!=null)){
            for(let i=0;i<3;i++){
                let tile=document.getElementById(i.toString()+'-'+c.toString());
                tile.classList.add('winner');
            }
            gameOver=true;
            return;
        }
    }
    //diagonally
    if((board[0][0]== board[1][1])&&( board[1][1]== board[2][2]) &&(board[0][0]!=null)){
        for(let i=0;i<3;i++){
            let tile=document.getElementById(i.toString()+'-'+i.toString());
            tile.classList.add('winner');
        }
        gameOver=true;
        return;
    }
    //anti-diagonal
    if((board[0][2]== board[1][1])&&( board[1][1]== board[2][0]) &&(board[0][2]!=null)){
        let tile=document.getElementById("0-2")
        tile.classList.add('winner');
        tile=document.getElementById("1-1")
        tile.classList.add('winner');
        tile=document.getElementById("2-0")
        tile.classList.add('winner');
        gameOver=true;
        return;
    }
    checkForDraw();
}
const text=document.querySelector('#text');
function checkForDraw(){
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            if(board[r][c]==null) return;
        }
    }
    text.innerText="DRAW!";
}