function getTitles(){
    $.get("/videos", function(data){
        data.forEach(function(title){
            console.log(title.title)
            let h1 = document.createElement("h1")
            h1.textContent = title.title
            document.getElementById("container").append(h1)
        })
    })
}

document.getElementById("show").addEventListener('click', function(){
    getTitles()
})


document.getElementById("scrape").addEventListener('click', function(){
    console.log("awda")
    $.get("/scrape")
    
})