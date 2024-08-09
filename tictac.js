const cells = document.querySelectorAll('.cell')
let player = true
let game = false //parar el juego

const contadorX = document.getElementById('contadorX')
const contadorO = document.getElementById('contadorO')
let xCount = parseInt(localStorage.getItem('victoriasX'))||0
let oCount = parseInt(localStorage.getItem('victoriasO'))||0
contadorX.innerHTML=xCount
contadorO.innerHTML=oCount


for (let index = 0; index < cells.length; index++) {
    cells[index].addEventListener("click", userMove)
}


function userMove(e) {
    if(game) return
    let cell = e.target
    let cellValue = cell.innerHTML

    if (!cellValue.length && player) {
        cell.innerHTML = "X"
        player = !player
        //poner ganar y empate en las 2 turnos
        gana()
        if (!game) {
            empate()
            setTimeout(turnoBot,500)
        }
    
    }
}
function turnoBot() {
    if(game) return
    let cellsVacia = []
    cells.forEach((cell, index) => {
        if (!cell.innerHTML.length) {
            cellsVacia.push(index)
        }
    })

    if (cellsVacia.length > 0) {
        let random = Math.floor(Math.random() * cellsVacia.length)
        cells[cellsVacia[random]].innerHTML = "O"
        player = !player
        gana()
        if (!game) {
            empate()
        }
        
    }
}

function gana() {
    checkLine(0, 1, 2)
    checkLine(3, 4, 5)
    checkLine(6, 7, 8)
    checkLine(0, 3, 6)
    checkLine(1, 4, 7)
    checkLine(2, 5, 8)
    checkLine(0, 4, 8)
    checkLine(6, 4, 2)
}

function checkLine(c1, c2, c3) {
    if (
        cells[c1].innerHTML.length &&
        cells[c1].innerHTML === cells[c2].innerHTML &&
        cells[c2].innerHTML === cells[c3].innerHTML
    ) {
        ganador(cells[c1].innerHTML)
        game=true
    }
}




function ganador(gano) {
    document.querySelector('.win').innerHTML = 'Ganó jugador ' + gano
    if (gano === 'X') {
        xCount++
        contadorX.innerHTML = xCount
        localStorage.setItem('victoriasX',xCount)
    } else if (gano === 'O') {
        oCount++
        contadorO.innerHTML = oCount
        localStorage.setItem('victoriasO',oCount)
    }

}

function empate() {
    if(game) return
    let lleno = true
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML.length === 0) {
            lleno = false
        }
    } if (lleno && !document.querySelector('.win').innerHTML) {
        document.querySelector('.win').innerHTML = 'Empate'
    }
    return lleno
}
//reset
const reset = document.getElementById('reset')

reset.addEventListener('click', function () {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    document.querySelector('.win').innerHTML = ''
    player =true
    game=false
})

const reboot=document.getElementById('reboot')
reboot.addEventListener('click', function () {
    localStorage.removeItem('victoriasX')
    localStorage.removeItem('victoriasO')
    document.getElementById('contadorX').innerHTML='0'
    document.getElementById('contadorO').innerHTML='0'

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''
    }
    document.querySelector('.win').innerHTML = ''
    player =true
    game=false
    location.reload()
})


