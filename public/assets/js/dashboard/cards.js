/**document.addEventListener("DOMContentLoaded",function(){
    for (let i=1; i<=30; i++) {
        let cardTemp = $('<div class="card"><h5 class="card-title">Google</h5><p class="card-text">Data Analyst</p><p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p></div>');
        alert('test');
        cardTemp.appendTo('#cardTemplate');
    }
});**/

function deleteCard(data) {
    $('#deleteModal').modal('show')
    jobContainer = document.getElementById('delete-job');
    jobContainer.setAttribute("action", "dashboard/" + data.id + "/delete");

    modaltitle = document.getElementById('deleteModallabel');
    modaltitle.innerText = "Delete " + data.name;

    modaltext = document.getElementsByClassName('delete-text');
    modaltext.innerText = "Are you sure you would like to delete " + data.name + "?";

}
function editCard(data) {
    $('#editModal').modal('show');
    jobContainer = document.getElementById('edit-job');
    jobContainer.setAttribute("action", "dashboard/" + data.id + "/update");

    modaltitle = document.getElementById('editModalLabel');
    modaltitle.innerText = "Editing " + data.name;
}
function openCard(data) {
    //alert(div.id);
    dropdownbtn = document.getElementsByClassName('btn btn-outline-light dropdown-toggle');
    var card = JSON.parse(cards);

    modaltitle = document.getElementById('jobTitle');
    modalstatus = document.getElementById('jobStatus');
    modaldesc = document.getElementById('jobDesc');
    $.each(card, function(i,dt){

        if(dt._id == data.id )
            modaltitle.innerText = dt.title;
            modalstatus.innerText = dt.status;
            modaldesc.innerText = dt.desc;
            //modaltitle.innerText = dt.type;
    });

    $('#openedModal').modal('show');
}

function cardSearch() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("cardTemplate");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function cardStatus() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("statusInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("cardTemplate");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-status");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

let cardContainer;

let createTaskCard = (carddata) => {
    let card = document.createElement('div');
    switch(carddata.status) {
        case 'Pending':
            card.className = 'card';
            break;
        case 'Interview Offer':
            card.className = 'card text-white bg-primary mb-3';
            break;
        case 'Offer Declined':
            card.className = 'card text-white bg-danger mb-3';
            break;
        case 'Job Offered':
            card.className = 'card text-white bg-success mb-3';
            break;
    }


    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';


    let titlediv = document.createElement('div');
    titlediv.className = 'title-div';

    let title = document.createElement('h5');
    title.innerText = carddata.title;
    title.className = 'card-title';

    let dropdowndiv = document.createElement('div');
    dropdowndiv.className = 'dropdown';

    let menu = document.createElement('button');
    menu.className = "btn btn-outline-light dropdown-toggle";
    menu.setAttribute('type', "button");
    menu.setAttribute('data-bs-toggle', "dropdown");
    menu.setAttribute('aria-expanded', "false");
    menu.id = carddata._id;

    let dropdown = document.createElement('ul');
    dropdown.className = "dropdown-menu";
    dropdown.setAttribute('aria-labelledby', carddata.title);

    let email = document.createElement('li');
    let emaila = document.createElement('a');
    emaila.className = "dropdown-item";
    emaila.innerText = "Email";

    let edit = document.createElement('li');
    let edita = document.createElement('a');
    edita.className = "dropdown-item";
    edita.innerText = "Edit";
    edit.id = carddata._id;
    edit.name = carddata.title;
    //deleteli.setAttribute("value", carddata._id);
    edit.setAttribute("onClick", "editCard(this)");

    let deleteli = document.createElement('li');
    let deletea = document.createElement('a');
    deletea.className = "dropdown-item";
    deletea.innerText = "Delete";
    deleteli.id = carddata._id;
    deleteli.name = carddata.title;
    //deleteli.setAttribute("value", carddata._id);
    deleteli.setAttribute("onClick", "deleteCard(this)");

    let status = document.createElement('p');
    status.innerText = carddata.status;
    status.className = 'h6 card-status';


    let dateApp = document.createElement('p');
    var applied = new Date(carddata.dateApplied);
    dateApp.innerText = "Date Applied: \n" + applied.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'long',});
    dateApp.className = "date";

    let dateUpt = document.createElement('p');
    var updated = new Date(carddata.dateUpdated);
    dateUpt.innerText = "Last Update: \n" + updated.toLocaleString('en-US', {
            weekday: 'short',
            day: 'numeric',
            year: 'numeric',
            month: 'long', });
    dateApp.className = "date";
    dateUpt.className = "date";

    let link = document.createElement('p');
    link.setAttribute("onClick", "openCard(this)");
    link.id = carddata._id;
    link.className = "stretched-link";


    titlediv.appendChild(title);
    dropdowndiv.appendChild(menu);
    dropdowndiv.appendChild(dropdown);
    email.appendChild(emaila);
    dropdown.appendChild(email);
    edit.appendChild(edita);
    dropdown.appendChild(edit);
    deleteli.appendChild(deletea);
    dropdown.appendChild(deleteli);
    titlediv.appendChild(dropdowndiv)

    cardBody.appendChild(titlediv);
    cardBody.appendChild(status);
    cardBody.appendChild(dateApp);
    cardBody.appendChild(dateUpt);
    cardBody.appendChild(link);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}

data = JSON.parse(cards);
document.addEventListener("DOMContentLoaded",function(){
    cardContainer = document.getElementById('cardTemplate');
    data.forEach((carddata) => {
        createTaskCard(carddata);
    });
})

