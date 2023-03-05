function web(){
    setTextWithId('selected', 'Siti Web')
    setTextWithId('info', 'Questa pagina raccoglie i miei principali progetti scolastici sui siti web, sviluppati negli ultimi due anni. Comprende verifiche già svolte')
}

function android(){
    setTextWithId('selected', 'Applicazioni Android')
    setTextWithId('info', 'Questa pagina raccoglie i miei principali progetti scolastici sulle App Android, sviluppati negli ultimi due anni. Comprende verifiche già svolte')
}

function clear(){
    setTextWithId('selected', ' ')
    setTextWithId('info', ' ')
}


function setTextWithId(id, msg){
    document.getElementById(id).innerText = msg
}