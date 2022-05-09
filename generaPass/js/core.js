function aggiornaNcar(){        // Ogni volta che si cambia un valore di input, la variabile aggiorna il valore
    let car = 0
    car = leggiInput(car, 0)    // Memorizzo nella variabile la somma di tutti i valori in input
    returna(car, 'nChar')
}

function generatePass(){
    let minuscole = ['a','b','c','d','e','f', 'g', 'h', 'i', 'j', 'k','l', 'm','n','o','p', 'q', 'r', 's', 't', 'u','v','w','x','y','z']
    let maiuscole = ['A','B','C','D','E','F', 'G', 'H', 'I', 'J', 'K','L', 'M','N','O','P', 'Q', 'R', 'S', 'T', 'U','V','W','X','Y','Z']
    let carspec = ['!', '#', '?', '&', '%', ".", ",", "$", "€", "@", '*', '+']
    let password = genera(minuscole, maiuscole, carspec)
    returna(password, 'generated')  // Classica funzione per returnare il risultato
}   

function leggiInput(tot, opz){
    switch (opz){   //la variabile opz serve per sapere cosa si vuole memorizzare
        case 0:     // 0: si memorizzerà tutto sulla variabile passata
            tot += document.getElementById('lettereMin').valueAsNumber
            tot += document.getElementById('lettereMai').valueAsNumber
            tot += document.getElementById('numer').valueAsNumber
            tot += document.getElementById('symb').valueAsNumber
            break
        case 1:     // 1: solo le minuscole
            tot += document.getElementById('lettereMin').valueAsNumber
            break
        case 2:     // 2: solo le maiuscole
            tot += document.getElementById('lettereMai').valueAsNumber
            break
        case 3:     // 3: solo i numeri
            tot += document.getElementById('numer').valueAsNumber
            break
        case 4:     // 4: solo i simboli
            tot += document.getElementById('symb').valueAsNumber
            break
    }
    return tot
}

function genera(min, mai, sym){
    let password = ''
    let nMin = 0 
    nMin = leggiInput(nMin, 1)
    let nMai = 0
    nMai = leggiInput(nMai, 2)
    let nNum = 0
    nNum = leggiInput(nNum, 3)
    let nSym = 0
    nSym = leggiInput(nSym, 4)
    if(isNaN(nMin)||isNaN(nMai)||isNaN(nNum)||isNaN(nSym)){
        return 'Errore: nei campi numerici non sono stati inseriti numeri'
    }
    if(nMin+nMai+nNum+nSym<8){
        return 'Una password deve avere almeno 8 caratteri' // se la password ha meno di 8 caratteri, returna un messaggio
    }
    for(let i=0; i<nMin; i++){
        let cas = Math.floor(Math.random()*(min.length-1))
        console.log('cas = ', cas)
        password += min[cas]
    }
    for(let j=0; j<nMai; j++){
        let cas = Math.floor(Math.random()*(mai.length-1))
        password += mai[cas]
        console.log(cas)
    }
    for(let k=0; k<nNum; k++){
        password += Math.floor(Math.random()*10)
    }
    for(let l=0; l<nSym; l++){
        let cas = Math.floor(Math.random()*(sym.length-1))
        password += sym[cas]
    }
    console.log(password)
    return password
}

function returna(cosa, dove){
    document.getElementById(dove).innerText = cosa
}