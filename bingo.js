let avaible = [1, 2, 3, 4, 5, 6, 7, 8];
let current = 0
let o = []
let x = []
let tie = false
let alternate = false
let gameover = false

function Alt() {
    if (current == 0) {
        alternate = true
        document.getElementById("center").innerHTML = "<b>O</b>";
        o[current] = 9
        current = 1
        Calculate()
    }
}

function Turn(button) {
    if (gameover == false) {
        if (avaible.includes(button)) {
            document.getElementById(String(button)).innerHTML = "<b>O</b>";
            let index = avaible.indexOf(button);
            if (index > -1) {
                avaible.splice(index, 1);
            }
            o[current] = button
            current += 1;
            Calculate()
        }
    }
}





function Calculate() {

    function Remove(button) {
        if (button > 8) {
            button = button - 8
        }
        document.getElementById(String(button)).innerHTML = "<b>X</b>";
        let index = avaible.indexOf(button);
        if (index > -1) {
            avaible.splice(index, 1);
        }
    }

    function Find(value) {
        return value > 8
    }

    for (; x.findIndex(Find) != -1;) {
        x[x.findIndex(Find)] = 1
    }

    if (alternate == false) {
        document.getElementById("center").innerHTML = "<b>X</b>"
        function Bingo(win) {
            if ((win + 4) > 8) {
                move = win - 4
            } else {
                move = win + 4
            }
            return move
        }
        if (current == 1) {
            if (o[0] % 2 == 0) {
                if (o[0] == 8) {
                    x[0] = 1
                } else {
                    x[0] = o[0] + 1
                }
            } else {
                if (o[0] == 7) {
                    x[0] = 1
                } else {
                    x[0] = o[0] + 2
                }
            }
            Remove(x[0])
        } else if (current == 2) {
            if (o[1] == Bingo(x[0])) {
                if (o[0] - o[1] == 2) {
                    x[1] = o[0] - 1
                    tie = true
                } else if (o[0] == 1 && o[1] == 7) {
                    x[1] = 8
                    tie = true
                } else if (x[0] == 8) {
                    x[1] = 1
                } else {
                    x[1] = x[0] + 1
                }
            } else {
                x[1] = Bingo(x[0])
                document.getElementById("winner").innerHTML = "You Lose!"
                gameover = true
            }
            Remove(x[1])
        } else if (current == 3) {
            if (tie == false) {
                if (o[2] == Bingo(x[1])) {
                    x[2] = x[0] + 2
                } else {
                    x[2] = Bingo(x[1])
                }
                document.getElementById("winner").innerHTML = "You Lose!"
                gameover = true
            } else {
                if (o[2] == Bingo(x[1])) {
                    if ((x[0] + 3) > 8) {
                        x[2] = (x[0] + 3) - 8
                    } else {
                        x[2] = x[0] + 3
                    }
                } else {
                    x[2] = Bingo(x[1])
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }

            Remove(x[2])
        } else if (current == 4) {
            if (tie == true) {
                if (o[3] == Bingo(x[2])) {
                    let index = avaible.indexOf(Bingo(x[2]));
                    if (index > -1) {
                        avaible.splice(index, 1);
                    }
                    x[3] = avaible[0]
                    document.getElementById("winner").innerHTML = "Draw!"
                    gameover = true
                } else {
                    x[3] = Bingo(x[2])
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }

            }
            Remove(x[3])
        }
    } else if (alternate == true) {
        function Fill(spot) {
            if (o[spot] > 4) {
                x[spot] = o[spot] - 4
                if (avaible.includes(x[spot]) == false) {
                    x[spot] = -1
                }
            } else {
                x[spot] = o[spot] + 4
                if (avaible.includes(x[spot]) == false) {
                    x[spot] = -1
                }
            }
        }
        if (current == 1) {
            x[0] = 3;
            Remove(x[0])
        } else if (current == 2) {
            if (o[1] == 7) {
                x[1] = 1
            } else {
                Fill(1)
            }
            Remove(x[1])
        } else if (current == 3) {
            if (avaible.includes(o[2] + 4)) {
                x[2] = o[2] + 4
            } else if (avaible.includes(o[2] - 4)) {
                x[2] = o[2] - 4
            } else if (avaible.includes(o[2] + 2)) {
                x[2] = o[2] - 2
            } else if (avaible.includes(o[2] - 2)) {
                x[2] = o[2] + 2
            } else {
                x[2] = avaible[0]
            }
            if (x[1] == 2) {
                if (avaible.includes(1)) {
                    x[2] = 1
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }
            if (x[1] == 4) {
                if (avaible.includes(5)) {
                    x[2] = 5
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }
            if (x[1] == 5) {
                if (o[2] != 4) {
                    x[2] = 4
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }
            if (x[1] == 1) {
                if (o[2] != 2) {
                    x[2] = 2
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }
            Remove(x[2])
        } else if (current == 4) {
            if (avaible.includes(o[3] + 4)) {
                x[3] = o[3] + 4
            } else if (avaible.includes(o[3] - 4)) {
                x[3] = o[3] - 4
            } else {
                x[3] = avaible[0]
            }

            Remove(x[3])
            if (x.includes(1)) {
                if (x.includes(2)) {
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }

            if (x.includes(4)) {
                if (x.includes(5)) {
                    document.getElementById("winner").innerHTML = "You Lose!"
                    gameover = true
                }
            }
        } else if (current == 5) {
            document.getElementById("winner").innerHTML = "Draw!"
            gameover = true
        }
    }
}