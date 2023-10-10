// Clase definida

class eventos { 

    constructor(id, name, description, fecha, lugar, pais, precio, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.fecha = fecha;
        this.lugar = lugar;
        this.pais = pais;
        this.precio = precio;
        this.image = image;
      }
}

// objetos

// Objetos
const evento1 = new eventos(1, "Bonaroo", "Bonnaroo es un festival de música y artes escénicas conocido por su ambiente festivo y ecléctico, Bonnaroo presenta una amplia variedad de géneros musicales.", "Junio del 2023", "Great Stage Park, Mnachester Tenesee", "USA", 122, "Bonaroo-2023-Editado.png");
const evento2 = new eventos(2, "Coachella", "Coachella es uno de los festivales de música más grandes y populares del mundo, celebrado en el desierto de California. Ofrece una mezcla de géneros musicales y atrae a artistas de renombre.", "Abril de 2023", "Empire Polo Club, California", "USA", 350, "coachella-2023-cartel-lineup.webp");
const evento3 = new eventos(3, "Louder Than Life", "Louder Than Life es un festival de rock y metal que presenta actuaciones de algunas de las bandas más grandes del género. Es conocido por su energía y pasión por la música pesada.", "Septiembre de 2023", "Highland Festival Grounds, Kentucky", "USA", 175, "LTL23_Social_1200x1500-scaled.jpg");
const evento4 = new eventos(4, "Tecate Pal Norte", "Tecate Pal Norte es un festival de música que ofrece una mezcla de artistas internacionales y locales en un ambiente vibrante.", "Octubre de 2023", "Parque Fundidora, Monterrey", "México", 850, "pal-norte-2023.jpeg");
const evento5 = new eventos(5, "Glastonbury", "Glastonbury es uno de los festivales de música más grandes y emblemáticos. Cuenta con una amplia variedad de géneros musicales y actividades culturales.", "Junio de 2023", "Worthy Farm, Somerset", "Reino Unido", 300, "Poster_2023_4x5_M4y_upd4t3_1912.png");
const evento6 = new eventos(6, "Primavera Sound", "Primavera Sound es un festival de música que se destaca por su ecléctica selección de artistas y su ambiente festivo.", "Junio de 2023", "Parc del Fòrum, Barcelona", "España", 140, "clzbhlnvke8f34ze1azf_1685440467527.jpg");

// array con objetos

const eventosList = [evento1, evento2, evento3, evento4, evento5, evento6];

// ordernar por indices

console.log('Impresion en consola de elementos accesados por indices: ');
console.log(eventosList[0]);
console.log(eventosList[1]);
console.log(eventosList[1]);

// Accedemos datos con funcion forEach() de array 
console.log('Impresion en consola de elementos accesados con forEach(): ');
eventosList.forEach(item => {console.log(item)});