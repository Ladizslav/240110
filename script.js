class Autor {
    constructor(jmeno, prijmeni, dat_nar) {
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.dat_nar = dat_nar;
    }
}

class Obraz extends Autor {
    constructor(jmeno, prijmeni,dat_nar, nazev, cena, rok_vznik) {
        super(jmeno, prijmeni,dat_nar);
        this.nazev = nazev;
        this.cena = cena;
        this.rok_vznik = rok_vznik;
    }
}

class Galerie {
    constructor() {
        this.obrazy = [];
    }

    pridejObraz(obraz) {
        this.obrazy.push(obraz);
    }

    celkovaCena() {
        return this.obrazy.reduce((celkovaCena, obraz) => celkovaCena + obraz.cena, 0);
    }

    nejdrahsiObrazy() {
        const serazeneObrazy = this.obrazy.slice().sort((a, b) => b.cena - a.cena);
        return serazeneObrazy.slice(0, 3);
    }

    obrazOdAutora(jmeno, prijmeni) {
        const obrazyAutora = this.obrazy.filter(obraz => obraz.jmeno === jmeno && obraz.prijmeni === prijmeni);
        return obrazyAutora.sort((a, b) => a.cena - b.cena);
    }

    vsichniAutoři() {
        const autoři = {};

        this.obrazy.forEach(obraz => {
            const autor = `${obraz.jmeno} ${obraz.prijmeni}`;

            if (!autoři[autor]) {
                autoři[autor] = [];
            }

            autoři[autor].push(obraz);
        });

        return autoři;
    }
}

const galerie = new Galerie();
nactiStavGalerie();

document.getElementById('galerieForm').addEventListener('submit', function (event) {
    event.preventDefault();
    pridejObraz();
});

function pridejObraz() {
    const jmeno = document.getElementById('jmeno').value;
    const prijmeni = document.getElementById('prijmeni').value;
    const dat_nar = new Date(document.getElementById('dat_nar').value);
    const nazev = document.getElementById('nazev').value;
    const cena = parseInt(document.getElementById('cena').value);
    const rok_vznik = parseInt(document.getElementById('rok_vznik').value);

    const obraz = new Obraz(jmeno, prijmeni, dat_nar, nazev, cena, rok_vznik);
    galerie.pridejObraz(obraz);
    ulozStavGalerie();
    zobrazVysledky();
    }

function zobrazVysledky() {
    document.getElementById('celkovaCena').textContent = galerie.celkovaCena();
    document.getElementById('nejdrahsiObrazy').textContent = JSON.stringify(galerie.nejdrahsiObrazy());
    document.getElementById('obrazyOdAutora').textContent = JSON.stringify(galerie.obrazOdAutora("Joe", "Pajdal"));
    document.getElementById('vsichniAutoři').textContent = JSON.stringify(galerie.vsichniAutoři());
}

function ulozStavGalerie() {
    localStorage.setItem('galerieStav', JSON.stringify(galerie));
}

function nactiStavGalerie() {
    const ulozenyStav = localStorage.getItem('galerieStav');
    if (ulozenyStav) {
        const stavObjekt = JSON.parse(ulozenyStav);
        galerie.obrazy = stavObjekt.obrazy || [];
    }
}

function removeStavGalerie() {
    localStorage.removeItem('galerieStav');
}

function clearStavGalerie() {
    localStorage.clear();
}

/*
const obraz1 = new Obraz("Joe", "Pajdal",new Date(2005,2,5), "Zomboi", 500, 2020);
const obraz2 = new Obraz("Ajdam", "Headcik",new Date(2005,4,5), "Terkov", 700, 2018);
const obraz3 = new Obraz("Leo", "Vinci",new Date(2005,4,5), "Mon Lis", 1000, 2019);
const obraz4 = new Obraz("Joe", "Pajdal",new Date(2005,2,5), "Projkt", 1500, 2010);

galerie.pridejObraz(obraz1);
galerie.pridejObraz(obraz2);
galerie.pridejObraz(obraz3);
galerie.pridejObraz(obraz4);

console.log("Celková cena:", galerie.celkovaCena());
console.log("Nejdražší obrazy:", galerie.nejdrahsiObrazy());
console.log("Obraz od autora:", galerie.obrazOdAutora("Joe", "Pajdal"));
console.log("Všichni autoři a jejich díla:", galerie.vsichniAutoři());
*/