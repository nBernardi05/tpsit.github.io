function txOut (id, risposta) {
    return document.getElementById(id).innerHTML = risposta
}

function pEh() {
    let sesso = document.querySelector('input[name="ses"]:checked').value
    let pes = document.getElementById('peso').valueAsNumber
    let altezz = document.getElementById('hh').valueAsNumber
    risultato(imc(pes, altezz), sesso)
}

function imc(pes, altezz){
    altezz=altezz/100
    let indice = pes / (altezz*altezz)
    return indice
}

function risultato(indice, sesso){
    let risposta
    if(sesso=="male"){
        if(indice<18.5){
            risposta = 'sei sottopeso'
        }else if(indice<35){
            risposta = 'sei normopeso'
        }else{
            risposta = 'sei obeso'
        }
    }else{
        if(indice<18.5){
            risposta = 'sei sottopeso'
        }else if(indice<29){
            risposta = 'sei normopeso'
        }else{
            risposta = 'sei obesa'
        }
    }
    txOut('ris', risposta)
}