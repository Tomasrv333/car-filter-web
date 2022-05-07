
// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const pMin = document.querySelector('#pMin');
const pMax = document.querySelector('#pMax');
const transmision = document.querySelector('#transmision');
const kmMin = document.querySelector('#kmMin');
const kmMax = document.querySelector('#kmMax');

// Results content
const result = document.querySelector('#result');

// Year limit
const max = new Date().getFullYear();
const min = max - 10;

// Object result
const dataSearch = {
    marca: '',
    year: '',
    pMin: '',
    pMax: '',
    transmision: '',
    kmMin: '',
    kmMax: '',
}

// Events
document.addEventListener('DOMContentLoaded', () => {
    showCars(cars);
    fullSelect();
})

marca.addEventListener('change', (e) => {
    dataSearch.marca = e.target.value;
    carFilter();
})

year.addEventListener('change', (e) => {
    dataSearch.year = parseInt(e.target.value);
    carFilter();
})

pMin.addEventListener('change', (e) => {
    dataSearch.pMin = parseInt(e.target.value);
    carFilter();
})

pMax.addEventListener('change', (e) => {
    dataSearch.pMax = e.target.value;
    carFilter();
})

transmision.addEventListener('change', (e) => {
    dataSearch.transmision = parseInt(e.target.value);
    carFilter();
})

kmMin.addEventListener('change', (e) => {
    dataSearch.kmMin = e.target.value;
    carFilter();
})

kmMax.addEventListener('change', (e) => {
    dataSearch.kmMax = e.target.value;
    carFilter();
})

// Functions
function showCars(cars) {
    cleanHTML();

    cars.forEach(car => {
        const {image, marca, modelo, year, precio, kilometraje, transmision} = car;
        const carHTML = document.createElement('div');
        carHTML.classList.add('card');

        const cardImg = document.createElement('div');
        cardImg.classList.add('card__img');
        cardImg.style.backgroundImage = `url('${image}')`


        const nameCar = document.createElement('div');
        nameCar.classList.add('d-flex', 'justify-content-center')
        const priceCar = document.createElement('div');
        priceCar.classList.add('d-flex', 'justify-content-center')

        const cardMarca = document.createElement('p');
        cardMarca.classList.add('card__marca');
        cardMarca.textContent = `${marca}`;
        nameCar.appendChild(cardMarca);

        const cardModelo = document.createElement('p');
        cardModelo.classList.add('card__modelo');
        cardModelo.textContent = `${modelo}`;
        nameCar.appendChild(cardModelo);

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('card__price')
        cardPrice.textContent = `$${precio}`;
        priceCar.appendChild(cardPrice);

        const cardKm = document.createElement('p');
        cardKm.classList.add('card__km')
        cardKm.textContent = `${kilometraje}km`;
        priceCar.appendChild(cardKm);

        carHTML.appendChild(cardImg);
        carHTML.appendChild(nameCar);
        carHTML.appendChild(priceCar);

        result.appendChild(carHTML);
    })
}

function cleanHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function fullSelect() {

    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); // Agregar las opciones de anho al select
    }
}

function carFilter() {
    const result = cars.filter(marcaFilter).filter(yearFilter).filter(pMinFilter).filter(pMaxFilter).filter(kmMinFilter).filter(kmMaxFilter).filter(transmisionFilter);

    if (result.length) {
        showCars(result);
    } else {
        noResult();
    }
}

function noResult() {

    clearHTML();

    const noResult = document.createElement('div');
    noResult.classList.add('alerta', 'error');
    noResult.textContent = 'No hay resultados';
    resultado.appendChild(noResult);
}

function marcaFilter(car) {
    const {marca} = dataSearch;
    if (marca) {
        return car.marca === marca;
    }
    return car;
}

function yearFilter(car) {
    const {year} = dataSearch;
    if (year) {
        return car.year === year;
    }
    return car;
}

function pMinFilter(car) {
    const {pMin} = dataSearch;
    if (pMin) {
        return car.precio >= pMin;
    }
    return car;
}

function pMaxFilter(car) {
    const {pMax} = dataSearch;
    if (pMax) {
        return car.precio <= pMax;
    }
    return car;
}

function kmMinFilter(car) {
    const {kmMin} = dataSearch;
    if (kmMin) {
        return car.precio >= kmMin;
    }
    return car;
}

function kmMaxFilter(car) {
    const {kmMax} = dataSearch;
    if (kmMax) {
        return car.precio <= kmMax;
    }
    return car;
}

function transmisionFilter(car) {
    const {transmision} = dataSearch;
    if (transmision) {
        return car.transmision === transmision;
    }
    return car;
}