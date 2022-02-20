let toDo = document.querySelector('.panel'),
input = document.querySelector('input'),
someForm = document.querySelector('form'),
main = document.querySelector('.main'),
forDel = document.querySelector('.forDel'),
p, box, div, delBtn, gg, allBtn;

let items = Object.values(localStorage)
let itemsLen = items.length
localStorage.clear();

(too = () => {
    if (itemsLen == 0) {return false}
    for (let i = 0; i < itemsLen; i++) localStorage.setItem(i, items[i])
})();

let toLocal = val => localStorage.setItem( ++itemsLen, val);

createSomeElement = () => {
    div = document.createElement('div')
    div.classList.add('float_div')

    p = document.createElement('p')
    p.classList.add('doIt')

    box = document.createElement('input')
    box.type = 'checkbox'
    box.classList.add('checkIt')
};

createSomeBtn = () => {
    toDo.appendChild(div)
    div.appendChild(box)
    div.appendChild(p)

    if (!delBtn) {
        delBtn = document.createElement('input')
        delBtn.type = 'button'
        delBtn.value = 'Delete'
        delBtn.classList.add('del')
        forDel.appendChild(delBtn)
    }

    if (!allBtn) {
        allBtn = document.createElement('input')
        allBtn.type = 'button'
        allBtn.value = 'All'
        allBtn.classList.add('all')
        forDel.appendChild(allBtn)
    }

    allBtn.addEventListener('click', () => {
        let allP = document.querySelectorAll('.doIt')
        let counter = 0

        for (let p of allP) if (p.className == "doIt cherk") counter++
            
        if (counter != allP.length) {
            for (let i = 0; i < allP.length; i++) allP[i].classList.add('cherk')
            let allBox = document.querySelectorAll('.checkIt')
            for (let i = 0; i < allBox.length; i++) allBox[i].checked = true
        }
        else {
            for (let i = 0; i < allP.length; i++) allP[i].classList.remove('cherk')
            let allBox = document.querySelectorAll('.checkIt')
            for (let i = 0; i < allBox.length; i++) allBox[i].checked = false
        }
    });

    delBtn.addEventListener('click', () => {
        let allBox = document.querySelectorAll('.checkIt')
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].checked) {
                allBox[i].parentElement.remove()
                items[i] = 0
                localStorage.clear();
                for (let j = 0; j < i; j++) {
                    if (items[j] !== 0) {
                        toLocal(items[j])
                    }
                }
            }
            if (items[i] !== 0) {
                toLocal(items[i])
            } 
        }
        allBox = document.querySelectorAll('input')
        if (allBox.length < 4) {
            delBtn.remove()
            delBtn = 0
            allBtn.remove()
            allBtn = 0
        }
    });

    gg = document.querySelectorAll('.checkIt');
    for (let gg1 of gg) gg1.addEventListener('click', () => check(gg)); 
}

(fromLocal = () => {
    if (itemsLen == 0) {return false} 
    else for (let  i = 0; i < itemsLen; i++ ) {
    
        createSomeElement();

        p.textContent = items[i];

        createSomeBtn();
    }
})();

someForm.onsubmit = () => {

    createSomeElement();

    p.textContent = input.value
    
    toLocal(input.value)
    items.push(input.value)

    createSomeBtn();
    
    someForm.reset()
    return false;
};

let check = gg1 => {
    for (let i = 0; i < gg1.length; i++) gg1[i].checked ? gg1[i].parentElement.classList.add('cherk') : gg1[i].parentElement.classList.remove('cherk');
}