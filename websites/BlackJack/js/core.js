/**
 * ♠♣♦♥ BLACKJACK ♠♣♦♥
 * 
 * Lavoro di gruppo: Bernardi Nicola, Cao Ricardo, Dumitrasc Edoardo, Zorzetto Mattia
 *
 * Alla realizzazione di questo lavoro di gruppo hanno
 * lavorato SOLO Bernardi Nicola e Dumitrasc Edoardo
 */

document.addEventListener('DOMContentLoaded', main)

let fondi = 500, cont = 0, puntata = 0, carte = [], seme = ['♠', '♣', '♦', '♥'], yourCards = [], bancoCarte = [], somma = 0, miomazzo = [], bancone = [], sommabancone = 0, sballato = false, vittoriagiocatore = false, molt = 1
/**
 * Funzione principale
 * @returns 
 */
function main() {
    cont++
    if (cont > 1) {
        restartGame()
    } else {
        const allElements = document.querySelectorAll('*')
        allElements.forEach((element) => {
            element.classList.remove('disabled');
        });

    }
    if (!controllaFondi()) {
        return
    }

    puntata = 5 * molt;
    fondi -= 5
    setText('fond', fondi)
    setText('att', puntata)
    for (let i = 0; i < 2; i++) {
        for (let j = 1; j <= 13; j++) {
            for (let t = 0; t < 4; t++) {
                if (j == 11) {
                    carte.push('J' + seme[t])
                }
                else if (j == 12) {
                    carte.push('Q' + seme[t])
                }
                else if (j == 13) {
                    carte.push('K' + seme[t])
                }
                else if (j == 1) {
                    carte.push('A' + seme[t])
                }
                else if (j == 10) {
                    carte.push('X' + seme[t])
                }
                else {
                    carte.push(j + seme[t])
                }
            }
        }
    }
    campo()
}
/**
 * per rimediare se il valore dei soldi va a NaN (se metti troppi soldi dal mod menu)
 */
function inceppato() {
    fondi = 500
    setText('fond', fondi)
}
/**
 * Solo per veri giocatori:
 * tagli di puntata alzati x1000 ogni volta che viene richiamata
 */
function tagliAlti(m = 1000) {
    if (m <= 0) {
        alert('è stato immesso un valore non valido')
        return
    }
    molt = m
    alert("tutte le puntate sono ora moltiplicate x" + molt)
}

/**
 * È un "cheats menu" (menu dei trucchi). Chiamando la funzione dalla console fa venire fuori
 * un menu da sviluppatore che consente di aggiungersi fondi a proprio piacimento, 
 * usare un moltiplicatore di puntate per giocare da "vero professionista" / spendaccione
 */
function developerKit() {
    const CONT = document.getElementById('developer')
    let html = '<label for="adM">Inserisci importo: <input type="number" id="adM" value="0"></label>'
    html += '<button type="button" class="btn btn-warning" onclick="addMoney()" id="v">Aggiungi Fondi</button>'
    html += '<button type="button" class="btn btn-warning" onclick="moltPunt()" id="">Moltiplicatore puntate</button>'
    html += '<button type="button" class="btn btn-warning" onclick="inceppato()" id="">Ripristina fondi (usa se i fondi sono NaN)</button>'
    setHTML('developer', html)
}
/**
 * moltiplica la puntata
 */
function moltPunt() {
    let m = Number(prompt("Inserisci il moltiplicatore delle puntate che vuoi", 1))
    if (!isNaN(m)) {
        tagliAlti(m)
    } else {
        alert("Il valore inserito non è valido")
    }
}

/**
 * Aggiunge soldi (usata nel cheats menu)
 */
function addMoney() {
    const MONEY = document.getElementById('adM').valueAsNumber
    fondi += MONEY
    setText('fond', fondi)
}

/**
 * Chiamata quando si preme su una chip.
 * se @param value è NaN allora fa l'ALL IN
 * @param {*} value valore da aggiungere
 * @returns se i fondi sono insufficienti
 */
function punta(value) {
    if (isNaN(value)) {
        value = fondi
    } else if (fondi - value * molt < 0) {
        return
    } else {
        value *= molt // serve per l'opzione grosse puntate richiamabile dalla console cpn "tagliAlti()"
    }
    fondi -= value
    puntata = puntata + value
    setText('att', puntata)
    setText('fond', fondi)
}

/**
 * InnerHTML function
 * @param {*} id id 
 * @param {*} value messaggio da settare
 */
function setHTML(id, value) {
    document.getElementById(id).innerHTML = value
}
/**
 * InnerText function
 * @param {*} id id
 * @param {*} value messaggio da settare
 */
function setText(id, value) {
    document.getElementById(id).innerText = value
}

/**
 * Pesca casualmente una carta
 * @returns La carta pescata
 */
function pesca() {
    let pescacarta = null, posizioneprimacarta
    while (pescacarta == null) {
        posizioneprimacarta = Math.floor(Math.random() * carte.length - 1)
        pescacarta = carte[posizioneprimacarta]
    }
    carte.splice(posizioneprimacarta, 1, null)
    return pescacarta
}
/**
 * Chiede una carta e fa i controlli
 */
function chiamacarta() {
    let cartapescata = pesca()
    miomazzo.push(cartapescata)
    somma = sommacarte(miomazzo, somma)
    stampacarte(cartapescata, "player")
    if (somma > 21) {
        alert("HAI SBALLATO")
        sballato = true
        setTimeout(controllovittoria, 1000)
    }
}

/**
 * Fa i controlli.
 * Chiamata dal bottone "stai"
 */
function stai() {
    setHTML('cartacomputer2', bancone[1])
    sommabancone = sommacarte(bancone, sommabancone)
    somma = sommacarte(miomazzo, somma)
    let cartapescata;
    let intervalId = setInterval(function () {
        if (sommabancone < 17 && !sballato) {
            cartapescata = pesca()
            bancone.push(cartapescata)
            sommabancone = sommacarte(bancone, sommabancone)
            stampacarte(cartapescata, "banco")
        }
        else {
            clearInterval(intervalId);
            setTimeout(controllovittoria, 1000)
        }

    }, 1000);

}

/**
 * Non dovrebbe servire un commento a spiegare cosa fa questa funzione
 * ma lo metto perché sono pignolo e sennò mi darebbe fastidio se una
 * funzione non venisse commentata e le altre si.
 */
function controllovittoria() {
    if (sommabancone > somma && !(sommabancone > 21) || sballato) {
        alert("HA VINTO IL DEALER")
        puntata = 0
        setText('att', puntata)
        main()
    } else if (somma > sommabancone && !sballato || sommabancone > 21) {
        alert("HAI VINTO")
        vittoriagiocatore = true
        fondi = fondi + puntata * 2
        setHTML('fond', fondi)
        puntata = 0
        setText('att', puntata)
        main()
    }
    else if (somma == sommabancone) {
        alert("PAREGGIO!")
        fondi = fondi + puntata
        setHTML('fond', fondi)
        puntata = 0
        setText('att', puntata)
        main()
    }

}
/**
 * Questa funzione l'ha fatta Edoardo e non so per quale motivo non abbia fatto una funzione
 * dove era passata la carta, ne calcolava il valore e la aggiungeva alla somma (sarebbe stato logico),
 * invece questa funzione scorre il mazzo, resetta la seconda variabile passata e la usa per calcolare
 * la somma. Alla fine la restituisce
 * @param {*} mazzo le carte del giocatore o del banco
 * @param {*} sommacarte variabile a caso che poteva benissimo essere una variabile locale
 * @returns la somma delle carte
 */
function sommacarte(mazzo, sommacarte) {
    sommacarte = 0
    for (i = 0; i < mazzo.length; i++) {
        let elementodasommare = mazzo[i]
        if (elementodasommare.charAt(0) == 'J' || elementodasommare.charAt(0) == 'Q' || elementodasommare.charAt(0) == 'X' || elementodasommare.charAt(0) == 'K') {
            sommacarte += 10
        } else if (elementodasommare.charAt(0) == 'A') {
            if ((sommacarte + 11) <= 21) {
                sommacarte += 11
            }
            else {
                sommacarte += 1
            }
        }
        else {
            sommacarte += Number(elementodasommare.charAt(0))
        }
    }
    return sommacarte
}

/**
 * Viene chiamata dalla funzione @function main()
 */
function campo() {
    let cartag1, cartag2, com1, com2
    cartag1 = pesca()
    miomazzo.push(cartag1)
    controllocarte(cartag1, "cartagiocatore1", "player")
    setHTML('cartagiocatore1', cartag1)
    cartag2 = pesca()
    miomazzo.push(cartag2)
    controllocarte(cartag2, "cartagiocatore2", "player")
    setHTML('cartagiocatore2', cartag2)
    com1 = pesca()
    // com1 = "2♠"
    bancone.push(com1)
    controllocarte(com1, "cartacomputer1", "banco")
    setHTML('cartacomputer1', com1)
    com2 = pesca()
    // com2 = "2♠"
    bancone.push(com2)
    controllocarte(com2, "cartacomputer2", "banco")
    setHTML('cartacomputer2', "<img src='img/cartacoperta3.jpg' id='cartacomputer2'></img>")


}
/**
 * Stampa la carta passata
 * @param {*} cartapescata carta da stampare
 * @param {*} giocatori giocatore
 */
function stampacarte(cartapescata, giocatori) {
    let newDiv = document.createElement('div')
    if (cartapescata.charAt(1) == '♠' || cartapescata.charAt(1) == '♣') {
        newDiv.setAttribute('class', "carta")
    }
    else {
        newDiv.setAttribute('class', "carta cartar")
    }
    newDiv.setAttribute("id", "aggiungicarta")
    let contenuto = document.createElement('p')
    contenuto.innerHTML = cartapescata
    newDiv.appendChild(contenuto)
    let giocatore = document.getElementById(giocatori)
    giocatore.appendChild(newDiv)
}

/**
 * Altra funzione fatta interamente da Edoardo.
 * Non mi chieda perché ci sono 4 @invocazioni della
 * funzione @function removeDiv()
 */
function restartGame() {
    carte.length = 0;
    sommabancone = 0
    vittoriagiocatore = false
    sballato = false
    //somma = 0
    miomazzo.length = 0;
    bancone.length = 0;
    let elements = document.querySelectorAll("[id='aggiungicarta']");
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
    }
    removeDiv()
    removeDiv()
    removeDiv()
    removeDiv()
}
/**
 * controlla le carte per dargli il giusto colore
 * @param {*} carta 
 * @param {*} id 
 * @param {*} cartagiocatore 
 */
function controllocarte(carta, id, cartagiocatore) {
    let giocatore = document.getElementById(cartagiocatore)
    let newDiv = document.createElement("div")
    giocatore.appendChild(newDiv)

    if (carta.charAt(1) == '♠' || carta.charAt(1) == '♣') {
        newDiv.setAttribute('class', "carta")
    }
    else {
        newDiv.setAttribute('class', "carta cartar")
    }
    let p = document.createElement("p")
    p.setAttribute("id", id)
    newDiv.appendChild(p)
}

/**
 * a quanto pare elimina le carte
 * Funzione fatta da Edoardo
 */
function removeDiv() {
    let elements = document.querySelectorAll('.carta');
    elements.forEach(function (element) {
        element.remove();
    });
    let elements2 = document.querySelectorAll('.carta cartar');
    elements2.forEach(function (element2) {
        element2.remove();
    });
}

/**
 * Controlla se si ha abbastanza soldi per la puntata minima
 * @returns true se ci sono abbastanza fondi per la puntata minima, in caso contrario
 * false
 */
function controllaFondi() {
    if (fondi - 5 <= 0) {
        alert("Sei andato in bancarotta. Non hai soldi per la puntata minima")
        return false
    }
    return true
}

