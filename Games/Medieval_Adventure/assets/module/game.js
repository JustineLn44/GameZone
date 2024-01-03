import Vers from "../js/vers.js";
import Warrior from "../js/warrior.js";
import Wizard from "../js/wizard.js";
import Blob from "../js/blob.js";

var capacite1  = document.getElementById('spell1');
var capacite2  = document.getElementById('spell2');
var pass =  document.getElementById('next');
var tour = 1;


const heroClasse = window.localStorage.getItem('Character');

if (heroClasse == "warrior"){
    var joueur = new Warrior;
    var ennemi = new Vers;
    var element = document.getElementById("character-bloc");
    element.classList.add("warriorIdle");
} else if (heroClasse == "wizard"){
    var joueur = new Wizard;
    var ennemi = new Vers;
    var element = document.getElementById("character-bloc");
    element.classList.add("wizardIdle");
} else {
    window.localStorage.setItem('Name', 'Blobby');
    var joueur = new Blob;
    var ennemi = new Vers;
    var element = document.getElementById("character-bloc");
    element.classList.add("blobIdle");
}

var heroName = window.localStorage.getItem('Name');
if (!heroName){
    heroName = "Bob";
}
const hpEnnemiMax = ennemi.hp;
const hpJoueurMax = joueur.hp;
const energieJoueurMax = joueur.energie;

document.getElementById("counter-bloc").innerHTML = 'Round </br>' + tour;
document.getElementById("log-bloc").innerHTML = heroName + " tombe nez à nez avec un monstre.";


capacite1.addEventListener('click', function () {
    document.getElementById("log-bloc").innerHTML = heroName + joueur.capacite1();
    let energieJoueurRestant = joueur.energie * 100 / energieJoueurMax;
    document.getElementById("character-energy").style.width = energieJoueurRestant+'%';
});

capacite2.addEventListener('click', function () {
    document.getElementById("log-bloc").innerHTML = heroName + joueur.capacite2(ennemi);
    let hpEnnemiRestant = ennemi.hp * 100 / hpEnnemiMax;
    let energieJoueurRestant = joueur.energie * 100 / energieJoueurMax;
    document.getElementById("monster-hp").style.width = hpEnnemiRestant+'%';
    document.getElementById("character-energy").style.width = energieJoueurRestant+'%';
    if (ennemi.hp <= 0){
        document.getElementById("monster-hp").style.width = '0%';
        document.location.href='game-lvl2.html';
    }
});

pass.addEventListener('click', function () {
    if (window.localStorage.getItem('Protection') == 'true'){
        document.getElementById("log-bloc").innerHTML = heroName + ' se protège, il ne reçoit donc aucun dégat.'
        window.localStorage.setItem('Protection', 'false');
    } else {
        document.getElementById("log-bloc").innerHTML = 'Le monstre vous inflige ' + ennemi.attack(joueur) + " dégats.";
        let hpJoueurRestant = joueur.hp * 100 / hpJoueurMax;
        document.getElementById("character-hp").style.width = hpJoueurRestant+'%';
        if (joueur.hp <= 0){
            document.getElementById("character-hp").style.width = '0%';
            document.location.href='../game-over.html';
        }
    }
    joueur.energie = energieJoueurMax;
    document.getElementById("character-energy").style.width = '100%';
    tour += 1;
    document.getElementById("counter-bloc").innerHTML = 'Round </br>' + tour;
});
