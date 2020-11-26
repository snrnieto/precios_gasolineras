
var ubicacion = [3.3745808, -76.5228922]
var ubicacion_real = 0


var gasolineras = {
    "0": {
        "id": 0,
        "nombre": "Terpel San joaquin",
        "ubicacion": [3.3793379, -76.5256912],
        "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
        "precios_gasolina": [7000, 8000, 10000],
    },
    "1": {
        "id": 1,
        "nombre": "Esso valle del lili",
        "ubicacion": [3.3757564, -76.5241921],
        "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
        "precios_gasolina": [7700, 9800, 11000],
    },
    "2": {
        "id": 2,
        "nombre": "Texaco pampalinda",
        "ubicacion": [3.3776112, -76.5379013],
        "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
        "precios_gasolina": [8000, 9000, 12000],
    },
    "3": {
        "id": 0,
        "nombre": "Terpel Jardin plaza",
        "ubicacion": [3.3685699, -76.5294304],
        "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
        "precios_gasolina": [7000, 8000, 10000],
    },
    "4": {
        "id": 0,
        "nombre": "Terpel Caney",
        "ubicacion": [3.3801929, -76.5217335],
        "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
        "precios_gasolina": [7000, 8000, 10000],
    },
    "5": {
    "id": 0,
    "nombre": "Terpel Melendez",
    "ubicacion": [3.3766191, -76.5476034],
    "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
    "precios_gasolina": [7000, 8000, 10000],
    },
    "6": {
    "id": 0,
    "nombre": "Terpel Pasoancho",
    "ubicacion": [3.38431181, -76.5383936],
    "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
    "precios_gasolina": [7000, 8000, 10000],
    },
    "7": {
    "id": 1,
    "nombre": "Esso Pasoancho",
    "ubicacion": [3.3833947,-76.5369269],
    "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
    "precios_gasolina": [7000, 8000, 10000],
    },
    "7": {
    "id": 0,
    "nombre": "Terpel La Hacienda",
    "ubicacion": [3.3894302,-76.5361815],
    "nombres_gasolina": ["Diesel", "Corriente", "Extra"],
    "precios_gasolina": [7000, 8000, 10000],
    }
}


let myMap = L.map('myMap').setView(ubicacion, 7);
pedirUbicacion();

L.tileLayer(`http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(myMap);

let iconTerpel = L.icon({
    iconUrl: 'logos/terpel logo.png',
    iconSize: [83, 61],
    iconAnchor: [41, 61]
})

let iconEsso = L.icon({
    iconUrl: 'logos/esso logo.png',
    iconSize: [60, 42],
    iconAnchor: [30, 42]
})

let iconTexaco = L.icon({
    iconUrl: 'logos/texaco logo.png',
    iconSize: [51, 50],
    iconAnchor: [25, 50]
})

let iconPerson = L.icon({
    iconUrl: 'logos/person.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
})

for (var i = 0; i < Object.keys(gasolineras).length; i++) {

    if (gasolineras[i].id == 0) {
        icono = iconTerpel
    }
    else if (gasolineras[i].id == 1) {
        icono = iconEsso
    }
    else if (gasolineras[i].id == 2) {
        icono = iconTexaco
    }

    let marker = L.marker(gasolineras[i].ubicacion, { icon: icono }).addTo(myMap);

    nombres = gasolineras[i].nombres_gasolina
    precios = gasolineras[i].precios_gasolina

    html_precios = ""


    for (let index = 0; index < nombres.length; index++) {
        html_precios +=
            `
        <div style="display:flex;">
            <h3 style="font-size:16px">${nombres[index]}:</h3><p style="font-size:14px" >${precios[index]}</p>
        </div>
        <br>
        `
    }

    html_popup =
        `
        <div style="padding:10px;line-height:1px">
            <h2 style="font-size:20px" >${gasolineras[i].nombre}</h2> <br>
            ${html_precios}
        </div>
    `;
    marker.bindPopup(html_popup);

}


function pedirUbicacion() {

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { coords } = pos
            const { latitude, longitude } = coords
            marcador_ubicacion = L.marker([latitude, longitude], { icon: iconPerson }).addTo(myMap)

            ubicacion_real = [latitude, longitude]
            myMap.setView(ubicacion_real, 14);

            var circle = L.circle(ubicacion_real, {
                color: 'blue',
                fillOpacity: 0,
                radius: 1500
            }).addTo(myMap);


            setTimeout(() => {
                myMap.panTo(new L.LatLng(latitude, longitude))
            }, 1000)
        },
        (error) => {
            console.log(error)
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
}


