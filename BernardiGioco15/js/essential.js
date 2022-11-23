function fillHeader(page){
    const DEF = ['Home Page', 'Giochi', 'Notizie', 'Area Personale', 'Info']
    const DEF_P = ['../', 'html/games.html', 'html/news.html', 'html/pers.html', 'html/about.html']
    let perc = ''
    if(page!='Home Page'){
        perc = '../'
    }
    perc += 'images/logo.jpeg'
    let html = `<img src="`+ perc + `" class="logo" alt="logo">`
    html += '<h1>4B<i>INtrattenimento</i></h1>'
    html += '<p class="tit">Power by Levi-Ponti</p>'
    html += '<nav>'
    for(let i=0; i<DEF.length; i++){
        html += `<a href="` + DEF_P[i] + `" class="btn btn-light `
        if(page == DEF[i]){
            html += 'active'
        }
        html += `">` + DEF[i] + `</a>`
    }
    html += '</nav></header>'
    setHtml('nav', html)
}