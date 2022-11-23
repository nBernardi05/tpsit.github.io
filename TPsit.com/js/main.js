

let userr



let nbernardi = {   // Creati gli oggetti degli utenti
    name: 'Nicola Bernardi',
    mode: 'dark',
    profile: 4,
    rango: 'admin'
};
let erizzolo = {    // erizzolo, pass: profff
    name: 'Emanuele Rizzolo',
    mode: 'white',
    profile: 3,
    rango: 'mod'
};
let sign = {    //  Utente registrato
    name: '?',
    mode: 'white',
    profile: 1,
    rango: 'normal'
};


function main(){
    let ifcookie = document.cookie
    let x = document.cookie.split('name=')
    let c = x[1]
    if(document.cookie != 'name=c' && document.cookie != ''){
        let us
        let pref = JSON.parse(c);
        document.getElementById('usrlogged').innerText = pref.name
    }
}

function logg(){
    us = document.getElementById('usr').value
    let ps = document.getElementById('pass').value
    switch (us){
        case 'nbernardi':
            if(ps == 'ciaooo')
                login(us)
            else
                document.getElementById('err').innerText = 'Username o password non corretti'
            break
        case 'erizzolo':
            if(ps == 'profff')
                login(us)
            else
                document.getElementById('err').innerText = 'Username o password non corretti'
            break
        default:
            document.getElementById('err').innerText = 'Username o password non corretti'
    }
}

function login(us){
    if(us == 'nbernardi'){
        let ciao = 'name=' + JSON.stringify(nbernardi) + ';path=/'
        document.cookie = ciao
        location.href = 'settings.html'
    }else{
        let er = 'name=' + JSON.stringify(erizzolo) + ';path=/'
        document.cookie = er
        location.href = 'settings.html'
    }
    
}

function reg(){
    userr = document.getElementById('realname').value
    sign.name = userr
    us = document.getElementById('usr').value

    let ps = document.getElementById('pass').value
    aggiornaCookie(sign)
    location.href = 'settings.html'
}
function aggiornaCookie(obj){
    let cook = 'name=' + JSON.stringify(obj) + '; path=/'
    document.cookie = cook
    //console.log('Questo sito è stato programmato interamente da Nicola Bernardi. Vietata la copia')
}
function slogga(){
    document.cookie = 'name=c; path=/'
    location.href = '../'
}






