$(document).ready(function() {
  alert('Select 1 or 2 players to begin playing!');
  var turnCount = 0;
  var player = 1;
  var board = ['', '', '', '', '', '', '', '', ''];

  function reset() {
    $('.square').empty();
    $('.square').removeClass('ex');
    $('.square').removeClass('oh');
    turnCount = 0;
    player = 1;
    board = ['', '', '', '', '', '', '', '', ''];
  }

  $('#reset').on('click', function(event) {
    reset();
  });

  function checkWin(symbol) {
    if (
      (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
      (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
      (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
      (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
      (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
      (board[2] === symbol && board[4] === symbol && board[6] === symbol)
    ) {
      return true;
    } else {
      return false;
    }
  }

  $('#onePlayer').on('click', function(event) {
    player = 1;

    $('.square').off('click').on('click', function(event) {
      var squareSelected = $(this);

      if (squareSelected.hasClass('ex') || squareSelected.hasClass('oh')) {
        return;
      }

      var index = parseInt(squareSelected.attr('id'));
      squareSelected.addClass('ex').text('X');
      board[index] = 'X';
      turnCount++;

      if (checkWin('X')) {
        alert('Congrats! You have won!');
        reset();
      } else if (turnCount === 9) {
        alert("It's a tie!");
        reset();
      } else {
        // Computer's turn
        var computerMove = getComputerMove();
        var computerSquare = $('#' + computerMove);
        computerSquare.addClass('oh').text('O');
        board[computerMove] = 'O';
        turnCount++;

        if (checkWin('O')) {
          alert('Sorry, you lost. The computer has won!');
          reset();
        } else if (turnCount === 9) {
          alert("It's a tie!");
          reset();
        }
      }
    });
  });
  
  // two player game code
  $('#twoPlayer').on('click', function(event) {

    player = 1;

    $('.square').on('click', function(event) {
      //defines the square selected by the user
      var squareSelected = $(this);
      // if square has previously been selected, don't allow the user to select
      // else determine which player, add class of player, check for win, reset if win, else player = other player
      if (squareSelected.hasClass('ex') || squareSelected.hasClass('oh')) {
        null;
      } else {
        if (player === 1) {
          turnCount = turnCount + 1;
          squareSelected.addClass('ex').text('X');
          if (checkWin('ex')) {
            alert('Congrats! Player ' + player + ' has won!');
            reset();
          } else if (turnCount === 9) {
            alert("It's a tie!");
            reset();
          } else {
            player = 2;
          }
        } else {
          turnCount = turnCount + 1;
          squareSelected.addClass('oh').text('O');
          if (checkWin('oh')) {
            alert('Congrats! Player ' + player + ' has won!');
            reset();
          } else if (turnCount === 9) {
            alert("It's a tie!");
            reset();

          } else {
            player = 1;
          }
        }
      }
    });
  });

  function getComputerMove() {
    // Check for winning move
    for (var i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        if (checkWin('O')) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // Check for player's winning move and block it
    for (var i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] =
        board[i] = 'X';
        if (checkWin('X')) {
          board[i] = '';
          return i;
        }
        board[i] = '';
      }
    }

    // If no winning moves, make a random move
    var availableMoves = [];
    for (var i = 0; i < 9; i++) {
      if (board[i] === '') {
        availableMoves.push(i);
      }
    }

    if (availableMoves.length > 0) {
      var randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }

    return -1; // No moves available (shouldn't happen in a valid game)
  }
});
