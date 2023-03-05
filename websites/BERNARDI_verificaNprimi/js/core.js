function main(){
    let intervallo = document.getElementById('inter').valueAsNumber
    let arr = valorizzaArray(intervallo)
    arr = numPrim(arr, intervallo)
    let html = buildHtml(arr, intervallo)
    returnaRis('tab', html)
}

function valorizzaArray(max){
    let array = []
    for(let i=0; i<max; i++){
        array[i] = i+1
    }
    return array
}

function numPrim(arr, max){
    for(let i=2; i<=max/2; i++){
        for(let j=i+i; j<=max; j++){
            if(arr[j]%i==0){
                arr[j]=0
            }
        }
    }
    return arr
}

function buildHtml(arr, max){
    let html = '<tbody>'
    html += '<tr>'
    for(let i=0; i<=max; i++){
        if(arr[i]!=0){
           html += '<td>' + arr[i] + '</td>'
        }
    }
    html += '</tr>'
    html += '</tbody>'
    return html
}

function returnaRis(dove, cosa){
    document.getElementById(dove).innerHTML='' + cosa
}

function stile(){   //Cambiare orientamento pagina
    if(document.querySelector('input[name="stile"]:checked').value=='Centrata'){
        document.getElementById('stil').innerHTML = 'body{text-align:center;}'
    }else{
        document.getElementById('stil').innerHTML = 'body{text-align:justify;}'
    }
}
