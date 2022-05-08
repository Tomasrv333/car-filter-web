"use strict";

// Variables
var marca = document.querySelector('#marca');
var year = document.querySelector('#year');
var pMin = document.querySelector('#pMin');
var pMax = document.querySelector('#pMax');
var transmision = document.querySelector('#transmision');
var kmMin = document.querySelector('#kmMin');
var kmMax = document.querySelector('#kmMax'); // Results content

var result = document.querySelector('#result'); // Year limit

var max = new Date().getFullYear();
var min = max - 10; // Object result

var dataSearch = {
  marca: '',
  year: '',
  pMin: '',
  pMax: '',
  transmision: '',
  kmMin: '',
  kmMax: ''
}; // Events

document.addEventListener('DOMContentLoaded', function () {
  showCars(cars);
  fullSelect();
});
marca.addEventListener('change', function (e) {
  dataSearch.marca = e.target.value;
  carFilter();
});
year.addEventListener('change', function (e) {
  dataSearch.year = parseInt(e.target.value);
  carFilter();
});
pMin.addEventListener('change', function (e) {
  dataSearch.pMin = parseInt(e.target.value);
  carFilter();
});
pMax.addEventListener('change', function (e) {
  dataSearch.pMax = e.target.value;
  carFilter();
});
transmision.addEventListener('change', function (e) {
  dataSearch.transmision = e.target.value;
  carFilter();
});
kmMin.addEventListener('change', function (e) {
  dataSearch.kmMin = parseInt(e.target.value);
  carFilter();
});
kmMax.addEventListener('change', function (e) {
  dataSearch.kmMax = parseInt(e.target.value);
  carFilter();
}); // Functions

function showCars(cars) {
  clearHTML();
  cars.forEach(function (car) {
    var image = car.image,
        marca = car.marca,
        modelo = car.modelo,
        year = car.year,
        precio = car.precio,
        kilometraje = car.kilometraje,
        transmision = car.transmision;
    var carHTML = document.createElement('div');
    carHTML.classList.add('card', 'shadow-sm');
    var cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    cardImg.style.backgroundImage = "url('".concat(image, "')");
    var nameCar = document.createElement('div');
    nameCar.classList.add('d-flex', 'justify-content-center');
    var infoCar = document.createElement('div');
    infoCar.classList.add('card__info', 'd-flex');
    var cardMarca = document.createElement('p');
    cardMarca.classList.add('card__marca');
    cardMarca.textContent = "".concat(marca);
    nameCar.appendChild(cardMarca);
    var cardModelo = document.createElement('p');
    cardModelo.classList.add('card__modelo');
    cardModelo.textContent = "".concat(modelo);
    nameCar.appendChild(cardModelo);
    var cardPrice = document.createElement('p');
    cardPrice.classList.add('card__price', 'w-25');
    cardPrice.textContent = "$".concat(precio);
    infoCar.appendChild(cardPrice);
    var cardYear = document.createElement('p');
    cardYear.classList.add('card__year', 'w-25');
    cardYear.textContent = "".concat(year);
    infoCar.appendChild(cardYear);
    var cardKm = document.createElement('p');
    cardKm.classList.add('card__km', 'w-25');
    cardKm.textContent = "".concat(kilometraje, "km");
    infoCar.appendChild(cardKm);
    carHTML.appendChild(cardImg);
    carHTML.appendChild(nameCar);
    carHTML.appendChild(infoCar);
    result.appendChild(carHTML);
  });
}

function clearHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function fullSelect() {
  for (var i = max; i > min; i--) {
    var option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    year.appendChild(option); // Agregar las opciones de anho al select
  }
}

function carFilter() {
  var result = cars.filter(marcaFilter).filter(yearFilter).filter(pMinFilter).filter(pMaxFilter).filter(kmMinFilter).filter(kmMaxFilter).filter(transmisionFilter);

  if (result.length) {
    showCars(result);
  } else {
    noResult();
  }
}

function noResult() {
  clearHTML();
  var noResult = document.createElement('div');
  noResult.classList.add('alerta', 'error');
  noResult.textContent = 'No hay resultados';
  result.appendChild(noResult);
}

function marcaFilter(car) {
  var marca = dataSearch.marca;

  if (marca) {
    return car.marca === marca;
  }

  return car;
}

function yearFilter(car) {
  var year = dataSearch.year;

  if (year) {
    return car.year === year;
  }

  return car;
}

function pMinFilter(car) {
  var pMin = dataSearch.pMin;

  if (pMin) {
    return car.precio >= pMin;
  }

  return car;
}

function pMaxFilter(car) {
  var pMax = dataSearch.pMax;

  if (pMax) {
    return car.precio <= pMax;
  }

  return car;
}

function kmMinFilter(car) {
  var kmMin = dataSearch.kmMin;

  if (kmMin) {
    return car.kilometraje >= kmMin;
  }

  return car;
}

function kmMaxFilter(car) {
  var kmMax = dataSearch.kmMax;

  if (kmMax) {
    return car.kilometraje <= kmMax;
  }

  return car;
}

function transmisionFilter(car) {
  var transmision = dataSearch.transmision;

  if (transmision) {
    return car.transmision === transmision;
  }

  return car;
}