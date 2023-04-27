import debounce from "lodash.debounce";
import oneCountryTpl from "./templates/one-country.hbs";
import countriesTpl from './templates/countries.hbs';
import ApiFunction from "./js/function";

const refs = {
    input: document.querySelector('.search'),
    countainer: document.querySelector('.countries')
}

refs.input.addEventListener('input', debounce(onInput, 500));

//  Чи доцільно тут розбивати на функції та створювати додатковий js файл-клас
// з одного боку: код дрібний, з іншого: багато дрібного коду - смітник
// а ще там щось із класом пішло не так, я той код закоментувала, глянь, якщо зможеш

function onInput(e) {
    // ApiFunction.name = e.target.value;
    // console.log(ApiFunction.name);
    // ApiFunction.fetchCountries()
    const name = e.target.value
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => response.json())
        .then(res => {
            console.log(res);
        if ( ApiFunction.name === '') {
            return
        } else if (res.status === 404) {
             ApiFunction.ifStatus404()
        } else if (res.message === "Page Not Found") {
               ApiFunction.ifPageNotFound()
        }else if (res.length === 1) {
            createMurkupOfOneCountry(res[0])
            
        } else {
             createMurkupOfMoreCountries(res)
        }
        })
    .catch(er => alert('Error'))
}

function createMurkupOfOneCountry(info) {
     const murkup = oneCountryTpl(info)
    refs.countainer.innerHTML = murkup
}

function createMurkupOfMoreCountries(info) {
     const murkup = countriesTpl(info)
    refs.countainer.innerHTML = murkup
}