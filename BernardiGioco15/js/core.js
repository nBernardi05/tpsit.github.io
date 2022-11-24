/**
 * CODICE JS DEL GIOCO DEL 15.
 * AUTORE: ©BERNARDI NICOLA TUTTI I DIRITTI RISERVATI
 */
let arr = [], dimm, html = '', s = 0, m=0, h=0, pausa = false, pts = 0, mesc = 95
/**
 * Ad ogni cambiamento dell'array cambia anche la tabella
 */
function generaTab(){
    let x = 0
    html = ''
    for(let i=1; i<=Math.sqrt(arr.length); i++){
        html += '<tr>'
        for(let j=1; j<=Math.sqrt(arr.length); j++){
            x++
            if(arr[x-1]==0){
                html += '<td id="0"> </td>'
            }else{
                html += '<td onclick="move(' + (x-1) + ')" id="' + arr[x-1] + '">' + arr[x-1] + '</td>'
            }
        }
        html += '</tr>'
        
    }
    if(nm>0)
    punteggio()
    setHtml('campo', html)
    return
}
let timer = false

/**
 * Genera l'array
 */
function generaArray(){
    arr = []
    let dimm = Number(getValue('dim'))
    for(let c = 1; c<(dimm*dimm); c++){
        arr[(c-1)] = c
    }
    arr[dimm*dimm-1] = 0
    generaTab()
    document.getElementById('pau').disabled = false
    document.getElementById('sav').disabled = false
    s = 0; m = 0; h = 0; pts = 0
    if(!timer){
        tempo()
        timer = true
    }
    nm = -1
    setText('pti', 0)
    mesc = Number(getValue('rang'))
    nMosse()
    mescola()
    highScore('COM', false)
}
/**
 * Carica la partita chiedendo prima conferma
 */
function caricaP(){
    let ob = JSON.parse(localStorage.getItem('_saved'))
    ob = JSON.parse(ob)
    if(confirm("Vuoi davvero caricare la partita " + ob.nome + '(' + ob.punti + ' punti per ' + ob.mosse + ' mosse in ' + ob.ho + 'h, ' + ob.mi + "', " + ob.se + "''" + '?) La partita attuale verrà persa.')){
        arr = ob.disp
        for(let i=0; i<arr.length; i++){
            arr[i] = Number(arr[i])
        }
        nm = Number(ob.mosse)-1
        nMosse()
        s = Number(ob.se)
        m = Number(ob.mi)
        h = Number(ob.ho)
        generaTab()
    }
}


function move(n){
    const dimm = Math.sqrt(arr.length)
    if(!pausa){
        if(n < (arr.length-1) && arr[n+1]==0 && isCambio(1, n+1)){
            arr[n+1] = arr[n]
            arr[n] = 0
            nMosse()
        }else if(arr[n-1]==0 && isCambio(2, n+1)){
            arr[n-1] = arr[n]
            arr[n] = 0
            nMosse()
        }else if((n-dimm)>=0 && arr[n-dimm]==0){
            arr[n-dimm] = arr[n]
            arr[n] = 0
            nMosse()
        }else if((n+dimm)<=(dimm*dimm) && arr[n+dimm]==0){
            arr[n+dimm] = arr[n]
            arr[n] = 0
            nMosse()
        }
        console.log(n)
        generaTab()
        controllo()
    }
}

/**
 * Ennesima funzione cui il nome dice tutto
 * Converte in stringa il tempo, chiama la funzione aggiungi() ogni secondo
 * e Applica la stringa col tempo
 */
function tempo(){
    let str = h + ':' + m + ':' + s
    setText('time', str)
    setTimeout(aggiungi, 1000)
}

/**
 * Questa è la seconda funzione di tempo()
 * Aggiunge un secondo e converte in minuti e ore
 */
function aggiungi(){
    if(!pausa){
        s = s+1
        if(s%60==0){
            m = m+1
            s = s - 60
            if(m%60==0){
                h = h+1
                m = m - 60
            }
        }
        tempo()
    }
}
/**
 * Altra funzione che non serve dire cosa faccia :)
 */
function pausaa(){
    if(pausa){
        pausa = false
        setHtml('stil', '')
        tempo()
        document.querySelector('#pau').innerText = 'Pausa'
    }else{
        pausa = true
        let bb = 'td{cursor:not-allowed;}'
        setHtml('stil', bb)
        document.querySelector('#pau').innerText = 'Riprendi'
    }
}

/**
 * Serve davvero dire cosa fa la seguente funzione?
 * Salva in localstorage in uno spazio chiamato '_saved' un oggetto
 */
function salva(){
    let nam = prompt('Dai un nome alla partita: ')
    let objj = createOb(arr, nm, h, m, s, nam, pts)
    let sa = JSON.stringify(objj)
    localStorage.setItem('_saved', sa);
    alert('Partita salvata in localstorage');
}
let nm = -1

/**
 * Ad ogni mossa cambia il numero delle mosse
 */
function nMosse(){
    nm++
    setText('moss', nm)
}

/**
 * MESCOLA LE TESSERE
 * di default 56 volte
 */
function mescola(){
    console.log('-1', arr)
    const dimm = Math.sqrt(arr.length)
    console.log(dimm)
    let nn = arr.length-1
    let volt = Number(getValue('rang'))
    for(let i=0; i<volt; i++){
        let cas = Math.floor(Math.random() * 4)
        console.log(i, arr)
        switch (cas){
            case 0:
                if(nn-1 > -1 && isCambio(1, nn)){
                    arr[nn] = arr[nn-1]
                    arr[nn-1] = 0
                    nn--
                }
                break
                case 1:
                    if(nn+1 < dimm*dimm && isCambio(2, nn)){
                        arr[nn] = arr[nn+1]
                        arr[nn+1] = 0
                        nn++
                    }
                    break
                    case 2:
                        if(nn+dimm < dimm*dimm){
                            arr[nn] = arr[nn+dimm]
                            arr[nn+dimm] = 0
                            nn += dimm
                        }
                        break
                        case 3:
                            if(nn-dimm > -1){
                                arr[nn] = arr[nn-dimm]
                                arr[nn-dimm] = 0
                                nn -= dimm
                            }
                            break
                        }
                        generaTab()
                    }
                }
                
/**
 * Check if the game is finish
 * @returns if isn't complete
 */
function controllo(){
    for(let i=0; i<arr.length-1; i++){
        if(arr[i]!=(i+1))
        return
    }
    if(arr[arr.length-1]!=0)
    return
    let nam = prompt('Inserisci un nome alla tua partita')
    highScore(nam, true)
}

/**
 * VERIFICA SE IL CAMBIO SI PUÒ FARE
 * @param {*} nu opzione da fare (1: sottrazione di 1; 2: addizione di 1)
 * @param {*} nn il numero dello spazio vuoto
 * @returns true se il cambio si può fare, false se non si può fare
 */
function isCambio(nu, nn){
    const dimm = Math.sqrt(arr.length)
    switch (nu){
        case 1:
            for(let i=1; i<dimm; i++){
                if(arr[nn]==arr[dimm*i])
                return false   
            }
            return true
        case 2:
            for (let index = 1; index < dimm; index++) {
                if(arr[nn]==arr[dimm*index+1])
                return false
            }
            return true
    }
}

function viewRange(){
    setText('ra', getValue('rang'))
}

function punteggio(){
    pts = 5000 * mesc / nm * (Math.sqrt(arr.length) * 10)
    setText('pti', Math.floor(pts))
}

function highScore(nam = 'COM', ns){
    let pti = 0
    let posi = []
    if(ns)
        pti = pts
    let html = ''
    let thispart = createOb(arr, nm, h, m, s, nam, pti)
    let pos = 0
    if(localStorage.getItem('_1')!=null){
        let ob = JSON.parse(localStorage.getItem('_1'))
        if(pti > ob.punti){
            localStorage.setItem('_1', thispart)
            html += '<tr><td>' + '1' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
            setHtml('cla', html)
            return
        }
        html += '<tr><td>' + '1' + '</td><td>' + ob.nome + '</td><td>' + ob.punti + '</td></tr>'
        setHtml('cla', html)
    }else {
        localStorage.setItem('_1', thispart)
        html += '<tr><td>' + '1' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
        setHtml('cla', html)
        return
    }
    if(localStorage.getItem('_2')!= null){
        let ob = JSON.parse(localStorage.getItem('_2'))
        if(pti > ob.punti){
            localStorage.setItem('_2', thispart)
            html += '<tr><td>' + '2' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
            setHtml('cla', html)
            return
        }
        html += '<tr><td>' + '2' + '</td><td>' + ob.nome + '</td><td>' + ob.punti + '</td></tr>'
        setHtml('cla', html)
    }else{
        localStorage.setItem('_2', thispart)
        html += '<tr><td>' + '2' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
        setHtml('cla', html)
        return
    }
    if(localStorage.getItem('_3')!= null){
        let ob = JSON.parse(localStorage.getItem('_3'))
        if(pti > ob.punti){
            localStorage.setItem('_3', thispart)
            html += '<tr><td>' + '3' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
            setHtml('cla', html)
            return
        }
        html += '<tr><td>' + '3' + '</td><td>' + ob.nome + '</td><td>' + ob.punti + '</td></tr>'
        setHtml('cla', html)
    }else{
        localStorage.setItem('_3', thispart)
        html += '<tr><td>' + '3' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
        setHtml('cla', html)
        return
    }
    if(localStorage.getItem('_4')!= null){
        let ob = JSON.parse(localStorage.getItem('_4'))
        if(pti > ob.punti){
            localStorage.setItem('_4', thispart)
            html += '<tr><td>' + '4' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
            setHtml('cla', html)
            return
        }
        html += '<tr><td>' + '4' + '</td><td>' + ob.nome + '</td><td>' + ob.punti + '</td></tr>'
        setHtml('cla', html)
    }else{
        localStorage.setItem('_4', thispart)
        html += '<tr><td>' + '4' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
        setHtml('cla', html)
        return
    }
    if(localStorage.getItem('_5')!= null){
        let ob = JSON.parse(localStorage.getItem('_5'))
        if(pti > ob.punti){
            localStorage.setItem('_5', thispart)
            html += '<tr><td>' + '5' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
            setHtml('cla', html)
            return
        }
        html += '<tr><td>' + '5' + '</td><td>' + ob.nome + '</td><td>' + ob.punti + '</td></tr>'
        setHtml('cla', html)
    }else{
        localStorage.setItem('_5', thispart)
        html += '<tr><td>' + '5' + '</td><td>' + nam + '</td><td>' + pti + '</td></tr>'
        setHtml('cla', html)
        return
    }
}


// Technical functions:

/**
 * 
 * @param {*} id Get value with ID
 * @returns 
 */
function getValue(id){
    return document.getElementById(id).value
}

/**
 * SetHtm() Is a .innerHTML function
 * @param {*} id Id of the element you'll get
 * @param {*} msg What you replace with
 */
function setHtml(id, msg){
    document.getElementById(id).innerHTML = msg
}
/**
 * setText() is a .innerText function
 * @param {*} id Id of the element you'll get
 * @param {*} msg What you replace with
 */
function setText(id, msg){
    document.getElementById(id).innerText = msg
}

function createOb(arr, nm, h, m, s, nome, pti){
    return JSON.stringify({disp: arr, mosse: nm, ho: h, mi: m, se: s, nome: nome, punti: pti})
}
