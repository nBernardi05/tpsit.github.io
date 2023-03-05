function aggiorna(){        // Ogni volta che si cambia un valore di input, la variabile aggiorna il valore
    let car = 0
    car = document.getElementById('nVolte').valueAsNumber    // Memorizzo nella variabile la somma di tutti i valori in input
    returna(car, 'nChar')
}

function Lancia(){
    let n = document.getElementById('nVolte').valueAsNumber
    let d1 = [], d2 = [], somma = [], frequenze = []
    frequenze.length=11
    frequenze.fill(0)
    tiraDadi(n, d1, d2, somma, frequenze)
    let corpo = html(d1, d2, somma, frequenze, n)
    let ist = istog(frequenze, n)
    returna(corpo, 'tab')
    returna(ist, 'istogramma')
}

function tiraDadi(n, d1, d2, somma, frequenze){
    for(let i=0; i<n; i++){
        d1[i] = Math.floor(Math.random()*6 +1)
        d2[i] = Math.floor(Math.random()*6 +1)
        somma[i] = d1[i] + d2[i]
        frequenze[somma[i] - 2] += 1
    }
}

function html(d1, d2, somma, frequenze, n){ //crea l'html della table con i dati dei lanci
    let html = '<thead>'
    html += '<tr>'
    html += '<th> </th>'
    html += '<th>Dado 1</th>'
    html += '<th>Dado 2</th>'
    html += '<th>Somma</th>'
    html += '</tr>'
    html += '</thead>'
    html += '<tbody>'
    for(let i=0; i<n; i++){
        html += '<tr>'
        html += '<td>Lancio ' + (i+1) + '</td>'
        html += '<td>' + d1[i] + '</td>'
        html += '<td>' + d2[i] + '</td>'
        html += '<td>' + somma[i] + '</td>'
        html += '</tr>'
    }
    html += '</tbody>'
    return html
}

function istog(frequenze, n){   //crea l'html di un istogramma (che parte da sinistra)
    console.log('freq ' + frequenze)
    let html = '<thead>'
    html += '<tr>'
    html += '<th>Numeri estratti</th>'
    html += '<th>Quanto sono stati estratti</th>'
    html += '</tr>'
    html += '</thead>'
    html += '<tbody>'
    for(let i=2; i<13; i++){
        html += '<tr>'
        html += '<td>' + (i) + '</td>'
        html += '<td>'
        while(frequenze[i-2]>=1){
            html += 'X'
            frequenze[i-2]--
        }
        html += '</td>'
        html += '</tr>'
    }
    html += '</tbody>'
    return html
}

function returna(cosa, dove){
    document.getElementById(dove).innerHTML = cosa
}