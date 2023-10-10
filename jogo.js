const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let winner = null;
const spaces = Array(9).fill(null);

function checkWin() 
{
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6] // Diagonais
    ];

    for (const combo of winningCombos) 
    {
        const [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) 
        {
            winner = spaces[a];
            return true;
        }
    }

    if (spaces.every((space) => space !== null)) 
    {
        winner = 'Empate';
        return true;
    }

    return false;
}

function render() 
{
    spaces.forEach((space, index) => 
    {
        const spaceElement = document.createElement('div');
        spaceElement.classList.add('space');
        spaceElement.textContent = space;
        spaceElement.addEventListener('click', () => 
        {
            if (!space && !winner) 
            {
                spaces[index] = currentPlayer;
                spaceElement.textContent = currentPlayer;
                spaceElement.classList.add(currentPlayer);
                if (checkWin()) 
                {
                    status.textContent = winner === 'Empate' ? 'Empate!' : `Jogador ${winner} venceu!`;
                } 
                else 
                {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    status.textContent = `É a vez do jogador ${currentPlayer}`;
                    spaceElement.style.pointerEvents = 'none'; 
                }
            }
        });
        board.appendChild(spaceElement);
    });
}

resetButton.addEventListener('click', () => 
{
    spaces.fill(null);
    board.innerHTML = '';
    winner = null;
    currentPlayer = 'X';
    status.textContent = 'É a vez do jogador X';
    render();
});

render();
