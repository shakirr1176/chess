class Chess {
    constructor() {
        (this.pawnMove = [-8, -16, -7, -9]),
            (this.knightMove = [15, -17, 6, -10, -15, 17, -6, 10]),
            (this.kingMove = [8, 7, -1, -9, -8, -7, 1, 9]),
            (this.isPros = !0),
            (this.side = ["white", "black"]),
            (this.currentSelectedElement = ""),
            (this.gettingbox = ""),
            this.prevousItem = undefined,
            this.prevActiveBox = []
            this.prevStep = []
            this.declare(),
            this.draw();
    }

    declare() {
            this.chessBox = document.querySelector(".chess-box")
            this.choose = document.querySelectorAll(".choose");
            this.movementSound = document.querySelector('.piece-movement-sound')
    }

    draw() {
        this.stage()
        this.pawnMoveFunc()
        this.knightMoveFunc()
        this.rookMoveFunc()
        this.bishopMoveFunc() 
        this.kingMoveFunc()
        this.queenMoveFunc()
        this.appendFunc()
        this.grabeFunc();
    }

    stage() {
        for (let a, b = 0; 64 > b; b++) (a = document.createElement("div")), (a.className = "box"), this.chessBox.append(a);
        let a = this.chessBox.querySelectorAll(".box");
        for (let b = 0; 8 > b; b++) {
            let c = 0,
                d = -2;
            for (let e = 8 * b; e < 8 * b + 8; e++)
                0 == b % 2 ? (0 == e % 2 ? a[e].classList.add("black") : a[e].classList.add("white")) : 0 == e % 2 ? a[e].classList.add("white") : a[e].classList.add("black"),
                    (a[e].dataset.column = c + 1),
                    (a[e].dataset.row = b + 1),
                    (a[e].dataset.clockwise = c + b + 2),
                    (a[e].dataset.anticlockwise = 11 - c - b + d),
                    c++,
                    (d += 2),
                    this.chooseElemnt(b, e);
        }
    }

    chooseElemnt(a, b) {
        let c = this.chessBox.querySelectorAll(".box");
        a == 6 && (c[b].innerHTML = `<div data-color="white" class="element pawn white-element"><img src="white/pawn-white.png" alt=""></div>`),
            a == 7 &&
                ((c[8 * a + 0].innerHTML = `<div data-color="white" class="element white-element rook"><img src="white/rook-white.png" alt=""></div>`),
                (c[8 * a + 1].innerHTML = `<div data-color="white" class="element white-element knight"><img src="white/knight-white.png" alt=""></div>`),
                (c[8 * a + 2].innerHTML = `<div data-color="white" class="element white-element bishop"><img src="white/bishop-white.png" alt=""></div>`),
                (c[8 * a + 3].innerHTML = `<div data-color="white" class="element white-element queen"><img src="white/queen-white.png" alt=""></div>`),
                (c[8 * a + 4].innerHTML = `<div data-color="white" class="element white-element king"><img src="white/king-white.png" alt=""></div>`),
                (c[8 * a + 5].innerHTML = `<div data-color="white" class="element white-element bishop"><img src="white/bishop-white.png" alt=""></div>`),
                (c[8 * a + 6].innerHTML = `<div data-color="white" class="element white-element knight"><img src="white/knight-white.png" alt=""></div>`),
                (c[8 * a + 7].innerHTML = `<div data-color="white" class="element white-element rook"><img src="white/rook-white.png" alt=""></div>`)),
            a == 1 && (c[b].innerHTML = `<div data-color="black" class="element pawn black-element"><img src="black/pawn-black.png" alt=""></div>`),
            a == 0 &&
                ((c[8 * a + 0].innerHTML = `<div data-color="black" class="element black-element rook"><img src="black/rook-black.png" alt=""></div>`),
                (c[8 * a + 1].innerHTML = `<div data-color="black" class="element black-element knight"><img src="black/knight-black.png" alt=""></div>`),
                (c[8 * a + 2].innerHTML = `<div data-color="black" class="element black-element bishop"><img src="black/bishop-black.png" alt=""></div>`),
                (c[8 * a + 3].innerHTML = `<div data-color="black" class="element black-element queen"><img src="black/queen-black.png" alt=""></div>`),
                (c[8 * a + 4].innerHTML = `<div data-color="black" class="element black-element king"><img src="black/king-black.png" alt=""></div>`),
                (c[8 * a + 5].innerHTML = `<div data-color="black" class="element black-element bishop"><img src="black/bishop-black.png" alt=""></div>`),
                (c[8 * a + 6].innerHTML = `<div data-color="black" class="element black-element knight"><img src="black/knight-black.png" alt=""></div>`),
                (c[8 * a + 7].innerHTML = `<div data-color="black" class="element black-element rook"><img src="black/rook-black.png" alt=""></div>`)),
            document.querySelectorAll(".black-element").forEach((a) => {
                a.parentElement.classList.add("no-event");
            }),
            (document.querySelector(`.${this.side[1]}-active`).style.display = "none"),
            (document.querySelector(`.${this.side[0]}-active`).style.display = "block");
    }

    pawnMoveFunc() {

        let pawn = document.querySelectorAll(".pawn"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this
        
        pawn.forEach((a) => {
            a.addEventListener("click", () => {
                if (a.classList.contains("pawn")) {
                    c.currentSelectedElement = a;
                    let d = [...b].indexOf(a.parentElement),
                        e = [];
                    c.pawnMove.forEach((b) => {
                        a.classList.contains(`${c.side[1]}-element`) && (b = -b), e.push(d + b);
                    })
                    
                    if(c.prevousItem != undefined){
                        c.prevousItem.classList.remove("active")
                    }

                    a.classList.add("active")

                    c.prevActiveBox.forEach(el=>{
                        if(b[el]){
                            if(c.prevousItem != a && b[el].classList.contains("active-box")){
                                b[el].classList.add('no-event')
                                b[el].classList.remove("active-box"), (c.isPros = !0);
                            }
                        }
                    })

                    e.forEach((f) => {
                        if (b[f]){
                            if(c.prevousItem != a && a.classList.contains("active")){

                                b[f].classList.add("active-box")
                                b[f].classList.remove("no-event")

                                if(b[f].children[0] && b[f].classList.contains("active-box") && b[f].children[0].dataset.color == a.dataset.color){
                                    b[f].classList.remove("active-box")
                                    b[f].classList.add("no-event")
                                }

                                if(b[e[2]] && b[e[0]].dataset.row != b[e[2]].dataset.row){
                                    b[e[2]].classList.remove("active-box")
                                    b[e[2]].classList.add("no-event")
                                }

                                if(b[e[3]] && b[e[0]].dataset.row != b[e[3]].dataset.row){
                                    b[e[3]].classList.remove("active-box")
                                    b[e[3]].classList.add("no-event")
                                }

                                if(b[e[0]] && b[e[0]].children[0]){
                                    b[e[0]].classList.remove("active-box")
                                    b[e[0]].classList.add("no-event")
                                    if(b[e[1]] && b[e[1]].children[0]){
                                        b[e[1]].classList.remove("active-box")
                                        b[e[1]].classList.add("no-event")
                                    }
                                }

                                if(b[e[1]] && b[e[1]].children[0]){
                                    b[e[1]].classList.remove("active-box")
                                    b[e[1]].classList.add("no-event")
                                }

                                if(b[e[2]] && !b[e[2]].children[0]){
                                    b[e[2]].classList.remove("active-box")
                                    b[e[2]].classList.add("no-event")
                                }

                                if(b[e[3]] && !b[e[3]].children[0]){
                                    b[e[3]].classList.remove("active-box")
                                    b[e[3]].classList.add("no-event")
                                }

                                if(15 < d && `${c.side[1]}` == a.dataset.color || 48 > d && `${c.side[0]}` == a.dataset.color){
                                   if(b[e[1]]){
                                    b[e[1]].classList.remove("active-box")
                                    b[e[1]].classList.add("no-event")
                                   }
                                }
                            }
                        }
                    });

                    c.prevousItem = a;

                    c.prevActiveBox = e

                }
            });
        });
    }

    knightMoveClickFunc(a, b, c) {
        if (a.classList.contains("knight")) {
            c.currentSelectedElement = a;
            console.log(b);
            let d = [...b].indexOf(a.parentElement),
            e = [];
            c.knightMove.forEach((x) => {
                a.classList.contains(`${c.side[1]}-element`) && (x = -x), e.push(d + x);
            })
            
            if(c.prevousItem != undefined){
                c.prevousItem.classList.remove("active")
            }

            a.classList.add("active")

            c.prevActiveBox.forEach(el=>{
                if(b[el]){
                    if(c.prevousItem != a && b[el].classList.contains("active-box")){
                        b[el].classList.add('no-event')
                        b[el].classList.remove("active-box"), (c.isPros = !0);
                    }
                }
            })

            e.forEach((f) => {
                if (b[f])
                    if (c.prevousItem != a && a.classList.contains("active")) {
                        (b[f].children[0] &&
                        b[f].children[0].dataset.color == a.dataset.color) ||
                        (b[f].classList.add("active-box"), b[f].classList.contains("no-event") && b[f].classList.remove("no-event"));
                        let g = 0;
                        a.dataset.color == c.side[1] && (g = 4),
                            8 == b[d].dataset.column &&
                                (b[e[4 - g]] && b[e[4 - g]].classList.remove("active-box"),
                                b[e[4 - g]] && b[e[4 - g]].classList.add("no-event"),
                                b[e[5 - g]] && b[e[5 - g]].classList.remove("active-box"),
                                b[e[5 - g]] && b[e[5 - g]].classList.add("no-event"),
                                b[e[6 - g]] && b[e[6 - g]].classList.remove("active-box"),
                                b[e[6 - g]] && b[e[6 - g]].classList.add("no-event"),
                                b[e[7 - g]] && b[e[7 - g]].classList.remove("active-box"),
                                b[e[7 - g]] && b[e[7 - g]].classList.add("no-event")
                                ),
                            7 == b[d].dataset.column && (b[e[6 - g]] && b[e[6 - g]].classList.remove("active-box"), b[e[6 - g]] && b[e[6 - g]].classList.add("no-event"), b[e[7 - g]] && b[e[7 - g]].classList.remove("active-box"),b[e[7 - g]] && b[e[7 - g]].classList.add("no-event")),
                            1 == b[d].dataset.column &&
                                (
                                b[e[0 + g]] && b[e[0 + g]].classList.remove("active-box"),
                                b[e[0 + g]].classList.add("no-event"),
                                b[e[1 + g]] && b[e[1 + g]].classList.remove("active-box"),
                                b[e[1 + g]].classList.add("no-event"),
                                b[e[2 + g]] && b[e[2 + g]].classList.remove("active-box"),
                                b[e[2 + g]].classList.add("no-event"),
                                b[e[3 + g]] && b[e[3 + g]].classList.remove("active-box"),
                                b[e[3 + g]].classList.add("no-event")
                                ),
                            2 == b[d].dataset.column && (b[e[2 + g]] && b[e[2 + g]].classList.remove("active-box"),b[e[2 + g]] && b[e[2 + g]].classList.add("no-event"), b[e[3 + g]] && b[e[3 + g]].classList.remove("active-box"),b[e[3 + g]] && b[e[3 + g]].classList.add("no-event"))
                    }
            });

            c.prevousItem = a;

            c.prevActiveBox = e
        }
    }

    knightMoveFunc() {
        let a = document.querySelectorAll(".knight"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this
        a.forEach((a) => {
            a.addEventListener("click", () => {
                c.knightMoveClickFunc(a, b,c);
            });
        });
    }

    rookMoveClickFunc(a, b, c) {
        if(a.classList.contains("rook")){
            b.currentSelectedElement = a
            
            if(b.prevousItem != undefined){
                b.prevousItem.classList.remove("active")
            }

            a.classList.add("active")

            b.prevActiveBox.forEach(el=>{
                if(c[el]){
                    if(b.prevousItem != a && c[el].classList.contains("active-box")){
                        c[el].classList.add('no-event')
                        c[el].classList.remove("active-box"), (b.isPros = !0);
                    }
                }
            })

            c.forEach((c) => {
                if (b.prevousItem != a && a.classList.contains("active"))
                    (c.dataset.row != a.parentElement.dataset.row && c.dataset.column != a.parentElement.dataset.column) ||
                    (c.children[0] && c.children[0].dataset.color == a.dataset.color) ||
                    (c.classList.add("active-box"));
            })

            c.forEach((b) => {
                b.children[0] &&
                    b.dataset.row == a.parentElement.dataset.row &&
                    !b.children[0].classList.contains("active") &&
                    c.forEach((c) => {
                        b.dataset.row == c.dataset.row && a.parentElement.dataset.column < b.dataset.column && c.dataset.column > b.dataset.column
                            ? c.classList.contains("active-box") && c.classList.remove("active-box")
                            : b.dataset.row == c.dataset.row && a.parentElement.dataset.column > b.dataset.column && c.dataset.column < b.dataset.column && c.classList.contains("active-box") && c.classList.remove("active-box");
                    }),
                    b.children[0] &&
                        b.dataset.column == a.parentElement.dataset.column &&
                        !b.children[0].classList.contains("active") &&
                        c.forEach((c) => {
                            b.dataset.column == c.dataset.column && a.parentElement.dataset.row < b.dataset.row && c.dataset.row > b.dataset.row
                                ? c.classList.contains("active-box") && c.classList.remove("active-box")
                                : b.dataset.column == c.dataset.column && a.parentElement.dataset.row > b.dataset.row && c.dataset.row < b.dataset.row && c.classList.contains("active-box") && c.classList.remove("active-box");
                        });
            })

            b.prevActiveBox = [];

            c.forEach((x,i)=>{
                if(b.prevousItem != a && x.classList.contains("active-box")){
                    x.classList.remove('no-event')
                    b.prevActiveBox.push(i)
                }
            })
            
            b.prevousItem = a

        }
    }

    rookMoveFunc() {
        let a = document.querySelectorAll(".rook"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this;
        a.forEach((a) => {
            a.addEventListener("click", () => {
                c.rookMoveClickFunc(a, c, b);
            });
        });
    }

    bishopMoveClickFunc(a, b, c) {
        if(a.classList.contains("bishop")){
            b.currentSelectedElement = a

            if(b.prevousItem != undefined){
                b.prevousItem.classList.remove("active")
            }

            a.classList.add("active")

            b.prevActiveBox.forEach(el=>{
                if(c[el]){
                    if(b.prevousItem != a && c[el].classList.contains("active-box")){
                        c[el].classList.add('no-event')
                        c[el].classList.remove("active-box"), (b.isPros = !0);
                    }
                }
            })


            c.forEach((c) => {
                if (a.classList.contains("active"))
                    (c.dataset.clockwise != a.parentElement.dataset.clockwise && c.dataset.anticlockwise != a.parentElement.dataset.anticlockwise) ||
                        (c.children[0] && c.children[0].dataset.color == a.dataset.color) ||
                        (c.classList.add("active-box"));
                else {

                    if(c.classList.contains("active-box")){
                        c.classList.add('no-event')
                    }

                    c.classList.remove("active-box"), (b.isPros = !0);
                }
            }),
            c.forEach((b) => {
                b.children[0] &&
                    b.dataset.clockwise == a.parentElement.dataset.clockwise &&
                    !b.children[0].classList.contains("active") &&
                    c.forEach((c) => {
                        b.dataset.clockwise == c.dataset.clockwise && a.parentElement.dataset.column < b.dataset.column && c.dataset.column > b.dataset.column
                            ? c.classList.contains("active-box") && c.classList.remove("active-box")
                            : b.dataset.clockwise == c.dataset.clockwise && a.parentElement.dataset.column > b.dataset.column && c.dataset.column < b.dataset.column && c.classList.contains("active-box") && c.classList.remove("active-box");
                    }),
                    b.children[0] &&
                        b.dataset.anticlockwise == a.parentElement.dataset.anticlockwise &&
                        !b.children[0].classList.contains("active") &&
                        c.forEach((c) => {
                            b.dataset.anticlockwise == c.dataset.anticlockwise && a.parentElement.dataset.row < b.dataset.row && c.dataset.row > b.dataset.row
                                ? c.classList.contains("active-box") && c.classList.remove("active-box")
                                : b.dataset.anticlockwise == c.dataset.anticlockwise && a.parentElement.dataset.row > b.dataset.row && c.dataset.row < b.dataset.row && c.classList.contains("active-box") && c.classList.remove("active-box");
                        });
            })
        }
        
        b.prevActiveBox = [];

        c.forEach((x,i)=>{
            if(b.prevousItem != a && x.classList.contains("active-box")){
                x.classList.remove('no-event')
                b.prevActiveBox.push(i)
            }
        })
        
        b.prevousItem = a

    }

    bishopMoveFunc() {
        let a = document.querySelectorAll(".bishop"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this;
        a.forEach((a) => {
            a.addEventListener("click", () => {
                c.bishopMoveClickFunc(a, c, b);
            });
        });
    }

    queenMoveClickFunc(a, b, c) {
        if(a.classList.contains('queen')){
            b.currentSelectedElement = a
            if(b.prevousItem != undefined){
                b.prevousItem.classList.remove("active")
            }

            a.classList.add("active")

            b.prevActiveBox.forEach(el=>{
                if(c[el]){
                    if(b.prevousItem != a && c[el].classList.contains("active-box")){
                        c[el].classList.add('no-event')
                        c[el].classList.remove("active-box"), (b.isPros = !0);
                    }
                }
            })
            c.forEach((c) => {
                if (b.prevousItem != a && a.classList.contains("active"))
                    (c.dataset.row != a.parentElement.dataset.row &&
                        c.dataset.column != a.parentElement.dataset.column &&
                        c.dataset.clockwise != a.parentElement.dataset.clockwise &&
                        c.dataset.anticlockwise != a.parentElement.dataset.anticlockwise) ||
                        (c.children[0] && c.children[0].dataset.color == a.dataset.color) ||
                        (c.classList.add("active-box"));
            })
            c.forEach((b) => {
                b.children[0] &&
                    !b.children[0].classList.contains("active") &&
                    b.dataset.row == a.parentElement.dataset.row &&
                    c.forEach((c) => {
                        b.dataset.row == c.dataset.row && a.parentElement.dataset.column < b.dataset.column && c.dataset.column > b.dataset.column
                            ? c.classList.contains("active-box") && c.classList.remove("active-box")
                            : b.dataset.row == c.dataset.row && a.parentElement.dataset.column > b.dataset.column && c.dataset.column < b.dataset.column && c.classList.contains("active-box") && c.classList.remove("active-box");
                    }),
                    b.children[0] &&
                        !b.children[0].classList.contains("active") &&
                        b.dataset.column == a.parentElement.dataset.column &&
                        c.forEach((c) => {
                            b.dataset.column == c.dataset.column && a.parentElement.dataset.row < b.dataset.row && c.dataset.row > b.dataset.row
                                ? c.classList.contains("active-box") && c.classList.remove("active-box")
                                : b.dataset.column == c.dataset.column && a.parentElement.dataset.row > b.dataset.row && c.dataset.row < b.dataset.row && c.classList.contains("active-box") && c.classList.remove("active-box");
                        }),
                    b.children[0] &&
                        !b.children[0].classList.contains("active") &&
                        b.dataset.clockwise == a.parentElement.dataset.clockwise &&
                        c.forEach((c) => {
                            b.dataset.clockwise == c.dataset.clockwise && a.parentElement.dataset.column < b.dataset.column && c.dataset.column > b.dataset.column
                                ? c.classList.contains("active-box") && c.classList.remove("active-box")
                                : b.dataset.clockwise == c.dataset.clockwise &&
                                  a.parentElement.dataset.column > b.dataset.column &&
                                  c.dataset.column < b.dataset.column &&
                                  c.classList.contains("active-box") &&
                                  c.classList.remove("active-box");
                        }),
                    b.children[0] &&
                        !b.children[0].classList.contains("active") &&
                        b.dataset.anticlockwise == a.parentElement.dataset.anticlockwise &&
                        c.forEach((c) => {
                            b.dataset.anticlockwise == c.dataset.anticlockwise && a.parentElement.dataset.row < b.dataset.row && c.dataset.row > b.dataset.row
                                ? c.classList.contains("active-box") && c.classList.remove("active-box")
                                : b.dataset.anticlockwise == c.dataset.anticlockwise && a.parentElement.dataset.row > b.dataset.row && c.dataset.row < b.dataset.row && c.classList.contains("active-box") && c.classList.remove("active-box");
                        });
                    })

                    b.prevActiveBox = [];

                    c.forEach((x,i)=>{
                        if(b.prevousItem != a && x.classList.contains("active-box")){
                            x.classList.remove('no-event')
                            b.prevActiveBox.push(i)
                        }
                    })
                    
                    b.prevousItem = a
        }
                    
    }

    queenMoveFunc() {
        let a = document.querySelectorAll(".queen"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this;
        a.forEach((a) => {
            a.addEventListener("click", () => {
                c.queenMoveClickFunc(a, c, b);
            });
        });
    }

    kingMoveFunc() {
        let a = document.querySelectorAll(".king"),
            b = this.chessBox.querySelectorAll(".box"),
            c = this;
        a.forEach((a) => {
            a.addEventListener("click", () => {
                if ( a.classList.contains("king")) {
                    c.currentSelectedElement = a;
                    let d = [...b].indexOf(a.parentElement),
                        e = [];
                    c.kingMove.forEach((b) => {
                        a.classList.contains(`${c.side[1]}-element`) && (b = -b), e.push(d + b);
                    })

                    if(c.prevousItem != undefined){
                        c.prevousItem.classList.remove("active")
                    }

                    a.classList.add("active")

                    c.prevActiveBox.forEach(el=>{
                        if(b[el]){
                            if(c.prevousItem != a && b[el].classList.contains("active-box")){
                                b[el].classList.add('no-event')
                                b[el].classList.remove("active-box"), (c.isPros = !0);
                            }
                        }
                    })

                    e.forEach((f) => {
                        if (b[f])
                            if (c.prevousItem != a && a.classList.contains("active")) {
                                (b[f].children[0] && b[f].children[0].dataset.color == a.dataset.color) || (b[f].classList.add("active-box"), b[f].classList.contains("no-event") && b[f].classList.remove("no-event"));
                                let g = 0;
                                a.dataset.color == c.side[1] && (g = 5),
                                    8 == b[d].dataset.column &&
                                        (
                                        b[e[5 - g]] && b[e[5 - g]].classList.remove("active-box"),
                                        b[e[5 - g]] && b[e[5 - g]].classList.add("no-event"),
                                        b[e[6 - g]] && b[e[6 - g]].classList.remove("active-box"),
                                        b[e[6 - g]] && b[e[6 - g]].classList.add("no-event"),
                                        b[e[7 - g]] && b[e[7 - g]].classList.remove("active-box"),
                                        b[e[7 - g]] && b[e[7 - g]].classList.add("no-event")
                                        ),
                                    1 == b[d].dataset.column &&
                                        (
                                        b[e[0 + g]] && b[e[0 + g]].classList.remove("active-box"),
                                        b[e[0 + g]] && b[e[0 + g]].classList.add("no-event"),
                                        (
                                            b[e[1 + g]] && b[e[1 + g]].classList.remove("active-box"),
                                            b[e[1 + g]] && b[e[1 + g]].classList.add("no-event"),
                                            b[e[2 + g]] && b[e[2 + g]].classList.remove("active-box"),
                                            b[e[2 + g]] && b[e[2 + g]].classList.add("no-event")
                                        )
                                        )
                            }
                    });

                    c.prevousItem = a;

                    c.prevActiveBox = e
                }
            });
        });
    }

    appendFunc() {
        let a = this.chessBox.querySelectorAll(".box");
        a.forEach((b) => {
            let c = this;
            b.addEventListener("click", () => {
                if (b.classList.contains("active-box")) {
                    (c.gettingbox = b), (c.isPros = !0);
                    let d = document.querySelectorAll(".element");
                    if ((c.currentSelectedElement.classList.contains("active"))) {
                        if (b.children[0] && b.children[0].dataset.color != c.currentSelectedElement.dataset.color) {
                            let a = document.createElement("div");
                            a.append(b.children[0].children[0]),
                                b.children[0].classList.contains("pawn") || a.classList.add("grabe-element"),
                                document.querySelector(`.${b.children[0].dataset.color}-place`).append(a),
                                b.children[0].remove();
                        }

                        c.moveAnimation(b,c.currentSelectedElement)

                        b.append(c.currentSelectedElement)

                            1 == b.dataset.row && c.currentSelectedElement.classList.contains("pawn", `${c.side[0]}-element`) && document.querySelector(`.${c.side[0]}-reserve-element`).classList.remove("hidden"),
                            8 == b.dataset.row && c.currentSelectedElement.classList.contains("pawn", `${c.side[1]}-element`) && document.querySelector(`.${c.side[1]}-reserve-element`).classList.remove("hidden"),
                            document.querySelector(`.${c.side[1]}-reserve-element`).classList.contains("hidden") &&
                                document.querySelector(`.${c.side[0]}-reserve-element`).classList.contains("hidden") &&
                                ("white" == c.currentSelectedElement.dataset.color
                                    ? (document.querySelectorAll(".black-element").forEach((a) => {
                                          a.parentElement.classList.remove("no-event");
                                      }),
                                      document.querySelectorAll(".white-element").forEach((a) => {
                                          a.parentElement.classList.add("no-event");
                                      }),
                                      (document.querySelector(`.${c.side[1]}-active`).style.display = "block"),
                                      (document.querySelector(`.${c.side[0]}-active`).style.display = "none"))
                                    : (document.querySelectorAll(".black-element").forEach((a) => {
                                          a.parentElement.classList.add("no-event");
                                      }),
                                      document.querySelectorAll(".white-element").forEach((a) => {
                                          a.parentElement.classList.remove("no-event");
                                      }),
                                      (document.querySelector(`.${c.side[1]}-active`).style.display = "none"),
                                      (document.querySelector(`.${c.side[0]}-active`).style.display = "block")));
                    }
                    c.currentSelectedElement.classList.remove("active"),
                    a.forEach((a) => {
                        a.classList.remove("active-box");
                    });
                }
            });
        });
    }

    moveAnimation(target,elmnt){
        this.movementSound.play()

        if(this.prevStep[0] && this.prevStep[1]){
            this.prevStep[0].classList.remove('previous-step')
            this.prevStep[1].classList.remove('previous-step')
        }
        
        target.classList.add('previous-step')
        elmnt.parentElement.classList.add('previous-step')

        this.prevStep = [target, elmnt.parentElement]

        let xAxis = (+elmnt.parentElement.dataset['column']-1)*60
        let yAxis = (+elmnt.parentElement.dataset['row'] - 1)*60

        let targetxAxis = (+target.dataset['column'] - 1)*60
        let targetyAxis = (+target.dataset['row'] - 1)*60

        let distanceTime = Math.sqrt(Math.pow((xAxis-targetxAxis),2) + Math.pow((yAxis-targetyAxis),2))

        elmnt.style.left = xAxis + 'px'
        elmnt.style.top = yAxis + 'px'
        elmnt.style.transition = null
        elmnt.style.position = null

        requestAnimationFrame(()=>{
            elmnt.style.position = 'absolute'
            elmnt.style.transition = `all ${distanceTime}ms linear`
            elmnt.style.left = targetxAxis + 'px'
            elmnt.style.top = targetyAxis + 'px'
        })

        setTimeout(()=>{
            elmnt.style.left = null
            elmnt.style.top = null
            elmnt.style.transition = null
            elmnt.style.position = null
            this.movementSound.pause();
            this.movementSound.currentTime = 0;
        },distanceTime)



    }

    grabClickFunc(a, b, c, d) {
        (a.gettingbox.children[0].className = `element ${b.dataset.cat} ${c}-element`),
            (a.gettingbox.children[0].dataset.color = `${c}`),
            (a.gettingbox.children[0].innerHTML = b.innerHTML),
            document.querySelector(`.${c}-reserve-element`).classList.add("hidden"),
            document.querySelectorAll(`.${d}-element`).forEach((a) => {
                a.parentElement.classList.remove("no-event");
            }),
            document.querySelectorAll(`.${c}-element`).forEach((a) => {
                a.parentElement.classList.add("no-event");
            }),
            (document.querySelector(`.${d}-active`).style.display = "block"),
            (document.querySelector(`.${c}-active`).style.display = "none");
        let e = a.gettingbox.children[0],
            f = this.chessBox.querySelectorAll(".box");
            "queen" == b.dataset.cat &&
            e.addEventListener("click", () => {
                a.queenMoveClickFunc(e, a, f);
            }),
            "knight" == b.dataset.cat &&
                e.addEventListener("click", () => {
                    a.knightMoveClickFunc(e, f,a);
                }),
            "rook" == b.dataset.cat &&
                e.addEventListener("click", () => {
                    a.rookMoveClickFunc(e, a, f);
                }),
            "bishop" == b.dataset.cat &&
                e.addEventListener("click", () => {
                    a.bishopMoveClickFunc(e, a, f);
                });
    }

    grabeFunc() {
        let a = document.querySelector(`.${this.side[0]}-reserve-element`).querySelectorAll(".reserve-elmmt"),
            b = document.querySelector(`.${this.side[1]}-reserve-element`).querySelectorAll(".reserve-elmmt"),
            c = this;
        a.forEach((a) => {
            a.addEventListener("click", () => {
                c.grabClickFunc(c, a, c.side[0], c.side[1]);
            });
        }),
            b.forEach((a) => {
                a.addEventListener("click", () => {
                    c.grabClickFunc(c, a, c.side[1], c.side[0]);
                });
            });
    }
    removeEvents(a) {
        "white" == a.dataset.color
            ? document.querySelectorAll(".black-element").forEach((a) => {
                  a.classList.contains("no-event") || (console.log(a), a.classList.add("no-event"));
              })
            : document.querySelectorAll(".white-element").forEach((a) => {
                  a.classList.contains("no-event") || a.classList.add("no-event");
              });
    }
}

let chess = new Chess();