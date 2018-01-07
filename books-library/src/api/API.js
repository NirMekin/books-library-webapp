


class API{

    getBooks(){
        return new Promise((resolve,reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(xhttp.responseText))
            }
            };
            xhttp.open("GET", "http://localhost:3000/", true);
            xhttp.send();
        })
        
    }

    saveFile(str){
        return new Promise((resolve,reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(xhttp.responseText))
            }
            };
            xhttp.open("POST", "http://localhost:3000/savejson", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            console.log(str)
            xhttp.send(str);
        })
        
    
    }

}

const api = new API();

export { api };