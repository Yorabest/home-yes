export default class ApiFunction{
    constructor (){
        this.name = ''
    }

    ifStatus404() {
        alert('Not Found')
    }

    ifPageNotFound() {
         alert("Page Not Found")
    }

    fetchCountries() {
      return fetch(`https://restcountries.com/v3.1/name/${this.name}`)
        .then(response => response.json())
    }
}