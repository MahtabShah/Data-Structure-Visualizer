// Increase size
let j = 0;
let stackSize = document.getElementById('ss');
let sizeInp = document.getElementById('sizeInp');
let push = document.getElementById('push');
let poh = document.getElementById('pop');
let size = document.getElementById('size+');
let Dd = document.querySelector('#dcon h2');
let key = document.getElementById('key');
let keybtn = document.getElementById('keybtn');
let randompush = document.getElementById('random');


let s = 0;
let cnt = 0;

function createStack( s ){

    while (document.querySelectorAll('#ss div').length > Number(sizeInp.value)) {
        document.querySelector('#ss div').remove();
        cnt--;

    }



    // s = Number(sizeInp.value);

    if (s > -1 && s < 21) {
        stackSize.style.height = `${s * 26.8}px`;
        Dd.innerHTML = `Size os the stack is ${s}`;


    } else {
        Dd.innerHTML = `Size should be less than or equal to 20`;

    }


}

function createElementPush( s ){

    if (cnt < s) {
        cnt++;
        // push.innerHTML = `${cnt}`;
        Dd.innerHTML = `You are inserting element ${cnt}`;


        let newdiv = document.createElement('div');
        newdiv.innerHTML = `${Math.floor(Math.random() * 100)}`

        stackSize.appendChild(newdiv);

        // newdiv.style.height = `${Math.floor(310 / Number(sizeInp.value))}px`;

        // let n = Number(sizeInp.value);
        // if (n > -1 && n < 21) {
        newdiv.style.height = `26px`;

        // }


    } else {
        console.warn("Overflow....");
        Dd.innerHTML = ` Overflow....Cant be Push out, stack is full or stack size is 0.`;

    }


}

function popout(){
    let i = 0;

    if (cnt > 0) {

        cnt--;

        Dd.innerHTML = `You deleted element ${cnt + 1}`;
        // push.innerHTML = `${cnt}`;

        let newdiv = document.querySelectorAll('#ss div')
        newdiv[cnt].remove();

    } else {
        Dd.innerHTML = `Underflow....Cant be Pop out, stack is empty or stack size is 0.`;
    }

}


sizeInp.addEventListener('input', ()=>{
    s = Number(sizeInp.value);
    createStack(s);
});


let count = 0;
randompush.addEventListener('click', () => {

    let m = 5 + Math.floor( Math.random() * 15);


    while (document.querySelectorAll('#ss div').length > 0 ) {
        document.querySelector('#ss div').remove();
        cnt--;
        s--

    }

    createStack(m);
    let loop = m;
    s = m;

    while(loop--){
        createElementPush(m);
    }
});


push.addEventListener('click', () => { createElementPush(s); })


pop.addEventListener('click', popout);


keybtn.addEventListener('click', () => {


    for (let i = 0; i < cnt; i++) {

        if (key.value == document.querySelectorAll('#ss div')[i].innerHTML.valueOf()) {

            Dd.innerHTML = `There is an element at index ${i}`;
            document.querySelectorAll('#ss div')[i].style.background = `#ff0`;

            return;

        }

    }

    Dd.innerHTML = `!No such value exist, Try diifrent value`;

})


