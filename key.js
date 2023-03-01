let movieRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-button");
let result = document.getElementById("result");
const ApiKey = "e097caa8";

function getMovie(){
    let movieName = movieRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${ApiKey}`;
    
    //if input is empty
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Enter movie name</h3>`;
    }
    
    // if input is not empty
    else{
        fetch(url).then((resp) => resp.json()).then((data)=>{
            // if movie searched is in database
            if(data.Response == "True"){
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join
                                ("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
                console.log(data)
            }
            else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        // Incase of error
        .catch(()=>{
            result.innerHTML = `<h3 class="msg">Error occured</h3>`;
        })
    }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);