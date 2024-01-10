function Autor(jmeno, prijmeni, dat_nar) {
    this.jmeno = jmeno;
    this.prijmeni = prijmeni;
    this.dat_nar = dat_nar;
}

function Obraz(jmeno, prijmeni, nazev, cena, rok_vznik) {
    Autor.call(this, jmeno, prijmeni, "01/01/1970");
    this.nazev = nazev;
    this.cena = cena;
    this.rok_vznik = rok_vznik;
}

Obraz.prototype = Object.create(Autor.prototype);
Obraz.prototype.constructor = Obraz;

function Galerie() {
    this.obrazy = [];
}

Galerie.prototype.pridejObraz = function (obraz) {
    this.obrazy.push(obraz);
};

Galerie.prototype.celkovaCena = function () {
    return this.obrazy.reduce(function (celkovaCena, obraz) {
        return celkovaCena + obraz.cena;
    }, 0);
};

Galerie.prototype.nejdrahsiObrazy = function () {
    const serazeneObrazy = this.obrazy.slice().sort(function (a, b) {
        return b.cena - a.cena;
    });
    return serazeneObrazy.slice(0, 3);
};

Galerie.prototype.obrazOdAutora = function (jmeno, prijmeni) {
    const obrazyAutora = this.obrazy.filter(function (obraz) {
        return obraz.jmeno === jmeno && obraz.prijmeni === prijmeni;
    });
    return obrazyAutora.sort(function (a, b) {
        return a.cena - b.cena;
    });
};

Galerie.prototype.vsechnyAutořiAOdworky = function () {
    const autoři = {};

    this.obrazy.forEach(function (obraz) {
        const autor = obraz.jmeno + " " + obraz.prijmeni;

        if (!autoři[autor]) {
            autoři[autor] = [];
        }

        autoři[autor].push(obraz);
    });

    return autoři;
};

const galerie = new Galerie();

const obraz1 = new Obraz("Joe", "Pajdal", "Zomboi", 500, 2020);
const obraz2 = new Obraz("Ajdam", "Headcik", "Terkov", 700, 2018);
const obraz3 = new Obraz("Leo", "Vinci", "Mon Lis", 1000, 2019);

galerie.pridejObraz(obraz1);
galerie.pridejObraz(obraz2);
galerie.pridejObraz(obraz3);

console.log("Celková cena:", galerie.celkovaCena());
console.log("Nejdražší obrazy:", galerie.nejdrahsiObrazy());
console.log("Obraz od autora:", galerie.obrazOdAutora("John", "Doe"));
console.log("Všichni autoři a jejich díla:", galerie.vsechnyAutořiAOdworky());
