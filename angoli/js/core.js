function getValue(){
    let a = document.getElementById('a').valueAsNumber
    let b = document.getElementById('b').valueAsNumber
    let c = document.getElementById('c').valueAsNumber
    let d = document.getElementById('d').valueAsNumber
    isQuadrilatero(a, b, c, d)
}

function isQuadrilatero(a, b, c, d){
    if((a+b+c+d)==360){
        
        typeQ(a, b, c, d)
    }else {
        outputQ("Non è un quadrilatero", "---")
    }
}

function outputQ(risposta1, risposta2){
    document.getElementById('msg1').innerText='' + risposta1
    document.getElementById('msg2').innerText='' + risposta2
}

function typeQ(a, b, c, d){
    let quadri = "È un quadrilatero"
    if(a&&b&&c&&d==90){       // Verifico se è un quadrato/rettangolo
        outputQ(quadri, "È un quadrato o un rettangolo")
    }else if(a&&d==90){       // Verifico se è un trapezio rettangolo
        outputQ(quadri, "È un trapezio rettangolo")
    }else if(a==c&&b==d){
        outputQ(quadri, "È un rombo o un parallelogramma")
    }else if(a==b&&c==d){
        outputQ(quadri, "È un trapezio isocele")
    }else{
        outputQ(quadri, "È un quadrilatero scaleno")
    }
}