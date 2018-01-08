
/*
    API working with the service "Books-Library-Server"
*/

class API{

    getBooks(){
        return new Promise((resolve,reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(xhttp.responseText))
            }
            };
            xhttp.open("GET", "https://nir-books-library-2018.herokuapp.com/getbooks", true);
            xhttp.send();
        })
        
    }

    saveFile(str){
        return new Promise((resolve,reject) => {
            var data = new FormData();
            data.append('str', str);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(xhttp.responseText))
            }
            };
            xhttp.open("POST", "https://nir-books-library-2018.herokuapp.com/savejson", true);
            xhttp.setRequestHeader('Content-type', 'application/json')
            xhttp.send(JSON.stringify({str}));
        })
        
    
    }

}

const api = new API();

export { api };