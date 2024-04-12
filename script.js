
// - Manipolazione del DOM
// - Event Listeners
// - Template literal
// - Funzioni
// - Array
// - Axios

//======== AUTSEARCH ===========================

// Imposta una variabile per tenere traccia dell'ID del timeout
let timeoutId;
// Alla modifica dell'input, reimposta il timeout
document.getElementById('searchInput').addEventListener('input', function(){
    // Cancella il timeout esistente, se presente
    clearTimeout(timeoutId);
    // Imposta un nuovo timeout dopo 700 millisecondi
    timeoutId = setTimeout(function() {
        // Esegui funzione di ricerca
        searchRepositories();
    }, 700); // Timeout impostato a 700 millisecondi
});

//======== SEARCH ==========================

// Individua il bottone di ricerca e assegna un gestore di eventi per il clic
document.getElementById('searchButton').addEventListener('click', function(){
    
        // Esegui funzione di ricerca
        searchRepositories();
    
});

// Funzione per ricerca tramite API utilizzando Axios
function searchRepositories() {

    // Individua searchTerm 
    const searchTerm = document.getElementById('searchInput').value.trim();
    // Ottieni il valore selezionato
    const selectedValue = document.getElementById('search_type').value;
    // Se SearchTerm è piu corto di 3 caratteri
    if (searchTerm.length < 3){
         
         // Individua il container nel DOM
         const resultsContainer = document.getElementById('results');
         // Parti da un container vuoto
         resultsContainer.innerHTML = '';
 
         // Crea un nuovo elemento <h3> per rappresentare il messaggio
         const message = document.createElement('h3');
         //aggiungi una classe
         message.classList.add('message');
        //Inserisci il contenuto
         message.innerHTML = 'Inserisci almeno 3 caratteri';
         // inseriscilo nel container in html
         resultsContainer.appendChild(message);
       
    }else{

        // ====== LOADER=====
         // Individua il container nel DOM
        const resultsContainer = document.getElementById('results');
        // Parti da un container vuoto
        resultsContainer.innerHTML = '';

        // Crea un nuovo elemento <h3> per rappresentare il messaggio
        const loader = document.createElement('div');
        //aggiungi una classe
        loader.classList.add('loader');
        // inseriscilo nel container in html
        resultsContainer.appendChild(loader);
        // ======FINE LOADER=====

  // URL di base comune per entrambe le opzioni
  let apiUrl = 'https://api.github.com/search/';
  

  // Aggiungi la stringa specifica per l'opzione selezionata nel menu a discesa
  if (selectedValue === 'repo') {
      apiUrl += `repositories?q=${searchTerm}`;
  } else {
      apiUrl += `users?q=${searchTerm}`;
  }
    
    // Effettua la richiesta API utilizzando Axios
    axios.get(apiUrl)
        .then(response => {
                // Gestisci la risposta in base al tipo di ricerca
                if (selectedValue === 'repo') {
                    displayRepositories(response.data.items);
                } else {
                    displayUsers(response.data.items);
                };
        })
        .catch(error => {
            // Gestisci gli errori
            console.error('Errore durante la ricerca dei repository:', error);
        });
    }
}



//======== DISPLAY ==========================

// Funzione per visualizzare i risultati della ricerca delle repo
function displayRepositories(repositories) {
    // Individua il container nel DOM
    const resultsContainer = document.getElementById('results');
    // Parti da un container vuoto
    resultsContainer.innerHTML = '';


    console.log(repositories.length );
   //Se non ci sono risultati
   if(repositories.length < 1){
   
    // Crea un nuovo elemento <h3> per rappresentare il messaggio
    const noResults = document.createElement('h3');
    //aggiungi una classe
    noResults.classList.add('no_results');
    //aggiungi un contenuto
    noResults.innerHTML = `non esiste una repo con il nome che è stato cercato`
    // inseriscilo nel container in html
    resultsContainer.appendChild(noResults);
   }else{
     // Per ogni repository nell'array 'repositories', esegui le seguenti operazioni:
     repositories.forEach(repo => {
        // Estrai il nome del repository dalla proprietà 'name' dell'oggetto 'repo'
        const repoName = repo.full_name;

         // Estrai la descrizione dell'oggetto 'repo'
         const repoDescription = repo.description;

           // Estrai il numero di stars dell'oggetto 'repo'
           const repoStars = repo.stargazers_count;

        // Crea un nuovo elemento <div> per rappresentare la card del repository
        const repoCard = document.createElement('div');
        repoCard.classList.add('element_card');

        // Aggiungi il nome del repository come testo all'interno della card
        const repoNameElement = document.createElement('h4');
        repoNameElement.textContent = repoName;
        repoCard.appendChild(repoNameElement);

        // Aggiungi la descrizione come testo all'interno della card
        const repoDescriptionElement = document.createElement('p');
        repoDescriptionElement.textContent = repoDescription;
        repoCard.appendChild(repoDescriptionElement);

        // Aggiungi la descrizione come testo all'interno della card
        const repoStarsElement = document.createElement('p');
        repoCard.appendChild(repoStarsElement);
        repoStarsElement.innerHTML += `&#9733; ${repoStars}`

        // Aggiungi l'immagine profilo del proprietario come immagine alla card
        const ownerAvatar = document.createElement('img');
        ownerAvatar.src = repo.owner.avatar_url;
        ownerAvatar.alt = "Owner Avatar";
        repoCard.appendChild(ownerAvatar);

        // Aggiungi la card al container dei risultati nel DOM
        resultsContainer.appendChild(repoCard);
    });
   }

   
}

// Funzione per visualizzare i risultati della ricerca degli utenti
function displayUsers(users) {
    // Individua il container nel DOM per gli utenti
    const resultsContainer = document.getElementById('results');
    // Parti da un container vuoto
    resultsContainer.innerHTML = '';

    if(users.length < 1){
   
        // Crea un nuovo elemento <h3> per rappresentare il messaggio
        const noResults = document.createElement('h3');
        //aggiungi una classe
        noResults.classList.add('no_results');
        //aggiungi un contenuto
        noResults.innerHTML = `non esiste un utente con il nome che è stato cercato`
        // inseriscilo nel container in html
        resultsContainer.appendChild(noResults);
       }else{

        // Per ogni utente nell'array 'users', esegui le seguenti operazioni:
        users.forEach(user => {
        // Estrai il nome dell'utente dalla proprietà 'login' dell'oggetto 'user'
        const userName = user.login;
        // Estrai il type dell'utente dalla proprietà 'login' dell'oggetto 'user'
        const userType = user.type;

        // Crea un nuovo elemento <div> per rappresentare la card dell'utente
        const userCard = document.createElement('div');
        userCard.classList.add( 'user_card');

        // Aggiungi il nome dell'utente come testo all'interno della card
        const userNameElement = document.createElement('h4');
        userNameElement.textContent = userName;
        userCard.appendChild(userNameElement);

        // Aggiungi il tipo dell'utente come testo all'interno della card
        const userTypeElement = document.createElement('h5');
        userTypeElement.textContent ='Type:'+ userType;
        userCard.appendChild(userTypeElement);

        // Aggiungi l'immagine profilo dell'utente come immagine alla card
        const userAvatar = document.createElement('img');
        userAvatar.src = user.avatar_url;
        userAvatar.alt = "User Avatar";
        userCard.appendChild(userAvatar);

        // Aggiungi la card al container dei risultati nel DOM
        resultsContainer.appendChild(userCard);
        
    });
};
}