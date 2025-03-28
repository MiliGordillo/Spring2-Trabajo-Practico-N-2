
//// CONEXION A MONGODB

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-11:grupo11@cursadanodejs.ls9ii.mongodb.net/Node-js')
.then(() => console.log('Conexion exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a la base de datos', error));

//// ESQUEMA Y MODELO PARA SUPERHEROES 
const superHeroSchema = new mongoose.Schema({
    nombreSuperHeroe: {type: String, required: true},
    nombreReal: {type: String, required: true},
    edad: {type: Number, min: 0},
    planetaOrigen: {type: String, default: 'Desconocido'},
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: {type: Date, default: Date.now},
    creador: String},{collection: 'Grupo-11'});

    const SuperHero = mongoose.model('SuperHero', superHeroSchema);

    //// INSERTAR UN NUEVO SUPERHEROES
    async function insertSuperHero() {
        const hero = new SuperHero ({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza','Agilidad' ],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creador: 'Martin'
        });
    
        await hero.save();
        console.log('Superhéroe insertado:', hero);
    }
    
    insertSuperHero();
    
    //// ACTUALIZAR SUPERHEROE EXISTENTE
    async function updateSuperHero(nombreSuperHeroe) {
        const result = await SuperHero.updateOne({nombreSuperHeroe}, 
        {$set: {edad: 35}});
        console.log('Superhéroe actualizado:', result);
    }
    
    //// ELIMINAR SUPERHEROE 
    updateSuperHero('Spiderman');
    
    async function deleteSuperHero(nombreSuperHeroe) {
        const result = await SuperHero.deleteOne({nombreSuperHeroe});
        console.log('Superhéroe eliminado:', result);
    }
    
    deleteSuperHero('Spiderman');
    
    //// BUSCAR SUPERHEROES LOS CUALES HABITAN EN LA TIERRA
    async function findSuperHeroes() {
        const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
        console.log('Superhéroes encontrados:', heroes);
    }
    
    findSuperHeroes();