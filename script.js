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

    vsechnyAutořiAOdworky() {
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
console.log("Všichni autoři a jejich díla:", galerie.vsechnyAutořiAOdworky());