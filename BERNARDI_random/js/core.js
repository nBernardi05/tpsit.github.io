function generaRand(){
    const DIM = 10
    let array = []
    valorizzaArray(DIM, array)
    returnaArray(DIM, array)
}
function casualeTra(a, b){
    return (Math.floor(Math.random()*(b-a)+a))
}
function valorizzaArray(DIM, array){
    min = document.getElementById('mn').valueAsNumber
    max = document.getElementById('mx').valueAsNumber
    for(let j=0; j<DIM; j++){
        array[j] = casualeTra(min, max)
    }
}
function returnaArray(DIM, array){
    for(let i=0; i<DIM; i++){
        document.getElementById(i).innerText='' + array[i]
    }
}