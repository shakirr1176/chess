
    // grabClickFunc($this,reserveElm,color2,color1){
    //     $this.gettingbox.children[0].className = `element ${reserveElm.dataset['cat']} ${color2}-element`
    //     $this.gettingbox.children[0].dataset['color'] = `${color2}`
    //     $this.gettingbox.children[0].innerHTML = reserveElm.innerHTML
        
    //     document.querySelector(`.${color2}-reserve-element`).classList.add('hidden')

    //     document.querySelectorAll(`.${color1}-element`).forEach(k=>{
    //         k.parentElement.classList.remove('no-event')
    //     })
        
    //     document.querySelectorAll(`.${color2}-element`).forEach(k=>{
    //         k.parentElement.classList.add('no-event')
    //     })

    //     document.querySelector(`.${color1}-active`).style.display = 'block'
    //     document.querySelector(`.${color2}-active`).style.display = 'none'

    //     let el = $this.gettingbox.children[0]
    //     let box = this.chessBox.querySelectorAll('.box')

    //     if(reserveElm.dataset['cat'] == 'queen'){
    //         el.addEventListener('click',()=>{
    //             $this.queenMoveClickFunc(el,$this,box)
    //         })
    //     }

    //     if(reserveElm.dataset['cat'] == 'knight'){
    //         el.addEventListener('click',()=>{
    //             $this.knightMoveClickFunc(el,$this,box)
    //         })
    //     }

    //     if(reserveElm.dataset['cat'] == 'rook'){
    //         el.addEventListener('click',()=>{
    //             $this.rookMoveClickFunc(el,$this,box)
    //         })
    //     }

    //     if(reserveElm.dataset['cat'] == 'bishop'){
    //         el.addEventListener('click',()=>{
    //             $this.bishopMoveClickFunc(el,$this,box)
    //         })
    //     }
    // }

    // grabeFunc(){
    //     let reserveElmmtsWhite = document.querySelector(`.${this.side[0]}-reserve-element`).querySelectorAll('.reserve-elmmt')
    //     let reserveElmmtsBlack = document.querySelector(`.${this.side[1]}-reserve-element`).querySelectorAll('.reserve-elmmt')
    //     let $this = this

    //     reserveElmmtsWhite.forEach(reserveElmmt=>{
    //         reserveElmmt.addEventListener('click',()=>{
    //             $this.grabClickFunc($this,reserveElmmt,$this.side[0],$this.side[1])
    //         })
    //     })

    //     reserveElmmtsBlack.forEach(reserveElmmt=>{
    //         reserveElmmt.addEventListener('click',()=>{
    //             $this.grabClickFunc($this,reserveElmmt,$this.side[1],$this.side[0])
    //         })
    //     })
    // }