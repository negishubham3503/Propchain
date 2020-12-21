//const { PropertyVerification } = require("../build/contracts/PropertyVerificationByLocation.json");
let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

var contract_address = "0x2704e69a61cFdc62583491a63bEF628384597CCB"; //Replace this with the address shown in ganache
var contract_abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "propertyDatabaseLength",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "RecordFound",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "lat",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "lng",
        "type": "int256"
      }
    ],
    "name": "getPropertyRecord",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ownerName",
        "type": "string"
      },
      {
        "internalType": "int256[4]",
        "name": "xCoordinates",
        "type": "int256[4]"
      },
      {
        "internalType": "int256[4]",
        "name": "yCoordinates",
        "type": "int256[4]"
      },
      {
        "internalType": "string",
        "name": "_ownershipType",
        "type": "string"
      }
    ],
    "name": "addPropertyRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const PropertyVerification = new web3.eth.Contract(contract_abi, contract_address);

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

mapboxgl.accessToken = process.env.ACCESS_TOKEN; //Your mapbox access token here
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [80, 25],
    zoom: 3
});

var marker = new mapboxgl.Marker({draggable: true})
    .setLngLat([80, 25])
    .addTo(map);
     
function onDragEnd() {
var lngLat = marker.getLngLat();
coordinates.style.display = 'block';
coordinates.innerHTML =
'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}
     
marker.on('dragend', onDragEnd);

function setCoordinates(pointNumber) {
    var lngLat = marker.getLngLat();
    document.getElementById(`lat${pointNumber}`).value = lngLat.lat;
    document.getElementById(`lng${pointNumber}`).value = lngLat.lng;
}

async function handleAddPropertyButton() {
    let ownership;
    let lat1 = parseFloat(document.getElementById("lat1").value).toFixed(6) * 1000000;
    let lng1 = parseFloat(document.getElementById("lng1").value).toFixed(6) * 1000000;
    let lat2 = parseFloat(document.getElementById("lat2").value).toFixed(6) * 1000000;
    let lng2 = parseFloat(document.getElementById("lng2").value).toFixed(6) * 1000000;
    let lat3 = parseFloat(document.getElementById("lat3").value).toFixed(6) * 1000000;
    let lng3 = parseFloat(document.getElementById("lng3").value).toFixed(6) * 1000000;
    let lat4 = parseFloat(document.getElementById("lat4").value).toFixed(6) * 1000000;
    let lng4 = parseFloat(document.getElementById("lng4").value).toFixed(6) * 1000000;
    let name = document.getElementById("inputName").value;
    if (document.getElementById('inlineRadio1').checked) {
        ownership = document.getElementById('inlineRadio1').value;
    }
    if (document.getElementById('inlineRadio2').checked) {
        ownership = document.getElementById('inlineRadio2').value;
    }
    const accounts = await web3.eth.getAccounts();
    const addedRecord = await PropertyVerification.methods.addPropertyRecord(name, [lat1, lat2, lat3, lat4], [lng1, lng2, lng3, lng4], ownership).send({ from: accounts[2], gas:3000000});
    document.getElementById("success").innerHTML = `Property details successfully added to records<br>The property id is ${addedRecord.events.RecordAdded.returnValues[1]}`;
}

async function handleSeePropertyDetailsButton() {
    let lat = parseFloat(document.getElementById("lat").value).toFixed(6) * 1000000;
    let lng = parseFloat(document.getElementById("lng").value).toFixed(6) * 1000000;

    let result = await PropertyVerification.methods.getPropertyRecord(lat, lng).call();
    if (result[0] == 404){
        document.getElementById("result").innerHTML = `${result[2]}<br>Error: ${result[0]}`;
    }
    else {
        document.getElementById("result").innerHTML = `Owner: ${result[2]}<br>Property ID: ${result[0]}<br>Owner account: ${result[1]}`;
    }
}