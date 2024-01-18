mapboxgl.accessToken = 'pk.eyJ1IjoiaXNtYWlsamFvdWFoaXIiLCJhIjoiY2xyZzdrOTFxMDk5NjJpbnNpNnhub2FnNiJ9.C0WQhLaIowwB5ps9Q5A0Vg';

var map = new mapboxgl.Map({
    container: 'maMap',
    style: 'mapbox://styles/mapbox/streets-v11'
});



// Définition de la fonction geocodeaddress

function geocodeAddress(address) {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
              encodeURIComponent(address) + '.json' +
              '?access_token=pk.eyJ1IjoiaXNtYWlsamFvdWFoaXIiLCJhIjoiY2xyZzdrOTFxMDk5NjJpbnNpNnhub2FnNiJ9.C0WQhLaIowwB5ps9Q5A0Vg';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.features && data.features.length > 0) {
            var coordinates = data.features[0].center;
            map.flyTo({
                center: coordinates,
                zoom: 15, // Vous pouvez ajuster le niveau de zoom selon vos besoins
                essential: true // cette option permet une transition en douceur
            });
        } else {
            console.log("Aucun résultat trouvé pour cette adresse");
        }
    });
}




// Ajout de l'écouteur d'événements sur le bouton de recherche
document.getElementById('search-button').addEventListener('click', function() {

        var adressesearch = document.getElementById('search-input').value;
        geocodeAddress(adressesearch); // Appel de la fonction geocodeAddress avec la ville entrée
        map.flyTo({
            center: adressesearch,
            zoom: 15, // Vous pouvez ajuster le niveau de zoom selon vos besoins
            essential: true // cette option permet une transition en douceur
        });
});

let btnconsomateur  = document.getElementById('Consommateurs');
let btnfournisseur  = document.getElementById('Fournisseurs');
let infoconsomateur = document.getElementById('info_Consommateurs');
let infofournisseur = document.getElementById('info_Fournisseurs');

btnconsomateur.addEventListener('click' , function(){
    infoconsomateur.classList.add('translateinfo');
})

infoconsomateur.addEventListener('mouseleave' , function(){
    infoconsomateur.classList.remove('translateinfo')
})

btnfournisseur.addEventListener('click' , function(){
    infofournisseur.classList.add('translateinfo');
})

infofournisseur.addEventListener('mouseleave' , function(){
    infofournisseur.classList.remove('translateinfo')
})

let btnFormVisible = document.getElementById('btnDemande');
let FormRequest    = document.getElementById('FormRequest');

btnFormVisible.addEventListener('click' , function(){
    FormRequest.classList.add('transition_From');
})

FormRequest.addEventListener('submit', function(event) {
    event.preventDefault();

    let TitleRequest = document.getElementById('nameRequest').value;
    let DescriptionRequest = document.getElementById('Description').value;
    let CategorieRequest = document.getElementById('Categorie').value;
    let Budget = document.getElementById('Budget').value;
    let Phone = document.getElementById('phoneUser').value;
    let adresse = document.getElementById('UserAdresse').value;

    // Utilisez l'API de géocodage ici pour convertir l'adresse en coordonnées
    geocodeAddress(adresse, function(coordinates) {
        // Créez l'élément HTML pour le marqueur
        var el = document.createElement('div');
        el.className = 'marker'; // Assurez-vous que cette classe est définie dans votre CSS pour afficher le marqueur

        // Ajout du marqueur sur la carte avec les coordonnées
        var marker = new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(map);

        // Création du contenu HTML pour le popup
        var popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
                <div>
                    <strong>${TitleRequest}</strong><br>
                    ${DescriptionRequest}<br>
                    Catégorie: ${CategorieRequest}<br>
                    Budget: ${Budget}<br>
                    Contact: ${Phone}<br>
                    Adresse: ${adresse}<br>
                </div>
            `);

        // Associez la popup au marqueur
        marker.setPopup(popup).addTo(map);

        // Centrez la carte sur le marqueur
        map.flyTo({
            center: coordinates,
            zoom: 15
        });
    });

    // Fermez le formulaire (si nécessaire)
    FormRequest.classList.remove('transition_From');
});