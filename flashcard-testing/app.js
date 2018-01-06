const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();


const socket = require('socket.io');


// connect to mongoose
mongoose.connect('mongodb://localhost/flashcard-test')
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err));
    
// load flash card model
require('./models/Cards');
const Cards = mongoose.model('cards');

// express handlebars middleware
app.engine('handlebars', handlebars({
    defaultLayout: 'main'   //main.handlebars
}));

app.set('view engine', 'handlebars');

// index route
app.get('/', (req, res) => {
   res.render('index');
});

// game route
app.get('/game', (req, res) => {
   res.render('game', { //game.handlebars 
       classroom: 'Biology', //test values
       user1: 'Billy Madison',
       user2: 'Happy Gilmore',
       percent1: 50,
       percent2: 30,
       timer: 40,       
       definition: 'an organism whose cells contain a nucleus and organelles'
   });      
});


const port = process.env.PORT; //cloud9 defaults to 8080 

const server = app.listen(port, () => {
   console.log(`Server started on port ${port}`); //es6 styling 
});


/*
    SOCKET STUFF
*/


// socket setup (test)
const io = socket(server);

io.on('connection', function(socket){
    console.log('socket created at port', socket.id);
    
    //set user1 and user2
    
    
    //needs function to start progress at 0 for all users
    
    //get submitted response
    socket.on('answer', function(data){
        
 
        //update shared area 
        io.emit('answer', data);
            
        
    });
});



















/* FOR REFERENCE AND SINCE I'M LAZY.... here are some biology terms for flash card content

===
Eukaryote	an organism whose cells contain a nucleus and organelles
Heterotroph	an organism that must obtain its food by consuming other organisms
Population	all of the individuals of a species living in the same area
Prokaryote	a single-celled organism that does not have a nucleus
Species	a distinct population of organisms that have the same basic structure and can interbreed in nature to produce fertile offspring
abiotic factor	physical, or nonliving, part of an ecosystem, such as the sun, temperature, and rocks
active transport	type of diffusion that requires energy to move particles into and out of the cell (moving from low to high concentration)
asexual reproduction	to reproduce by cell division, spore formation, fission, or budding without the union of individuals or gametes
ATP	adenosine triphosphate; energy molecule of living things that is produced from food by respiration
Autotroph	an organism that can make its own organic food molecules from only carbon dioxide, simple inorganic nitrogen, and light or ATP
Biotic	living things that make up and ecosystem
Carbohydrate	a chemical compound such as sugars or starches that is made up of carbon, hydrogen, and oxygen
Cell	the smallest functional unit of a living organism that is bound by a cell membrane and contains various organelles
Cell membrane	the cellular structure that surrounds the cell separating the inside of the cell from the external environment; controls what goes in and out of the cell; made up of phospholipid bilayer
cell wall	the rigid, outer structure of plant cells that gives the cells shape and strength
chlorophyll	the green photosynthetic pigment found in plant chloroplasts
chloroplast	a plant organelle that contains chlorophyll and is the site of photosynthesis
diffusion	the movement of a substance across a membrane following the electrical or concentration gradient (from high concentration to low concentration); does not require energy; also known as passive transport.
DNA	the abbreviation for deoxyribonucleic acid; it is the blueprint for life, is bundled into chromosomes found in the nucleus of cells and is made up of nucleotides joined together to form a complex double helix structure
endoplasmic reticulum	organelle system of membranes within cells that transport material around the cell; two types: rough and smooth
enzyme	speeds up chemical reactions
eukaryote	a type of cell that contains a nucleus; examples are plants, animals, protists, and fungi
facilitated diffusion	the diffusion of a substance across the cell membrane with the help of a carrier.
Golgi apparatus	organelle system of membranes within cells associated with sorting, modification, packaging, and transport of cell products that come from the endoplasmic reticulum
Homeostasis	the ability of an organism to maintain stability, also known as equilibrium. Temperature regulation is an example.
hypertonic	condition where the solution surrounding a cell has a higher concentration than the concentration inside the cell; cause cells to shrink as water moves out of the cell by osmosis
hypotonic	condition where the solution surrounding a cell has a lower concentration than the concentration inside the cell; cause cells to swell as water moves into the cell by osmosis
isotonic	condition where the solution surrounding a cell has the same concentration as the inside of the cell; do not change the size of cells because osmotic flow in and out of the cell is equal
lipid	macromolecule such as fats, oils, waxes made mostly of fatty acids
lysosome	organelle containing powerful digestive enzymes used to break down cell wastes, food, or engulfed particles
mitochondrion	rod-shaped organelle, in all cells, that produces energy for the cell through respiration
monosaccharide	a single sugar molecule that cannot be broken into smaller, simpler sugars; building blocks for carbohydrates
nucleic acid	the basic building block of DNA and RNA. Structurally made up of a nucleotide base, a sugar molecule, and a phosphate all linked to form a linear chain
nucleotide	the basic structural group of nucleic acids made up of a ribose sugar, a nitrogen base, and a phosphate
nucleus	the central part of the cell that controls the cell and contains genetic material(DNA). The nucleus has 3 parts: the nuclear envelope, the chromatin, and the nucleolus.
Organelle	a specialized cell structure that performs a specific function such as the
osmosis	the diffusion of water across a cell membrane from the area of low solute concentration (high water concentration) to the area of high solute concentration (low water concentration); does not require energy
passive transport	the movement of a substance across a membrane following the electrical or concentration gradient (from high concentration to low concentration); does not require energy; also known as diffusion
photosynthesis	the process plants use to make carbohydrates and oxygen from water and from carbon dioxide in the air in the presence of light
plant cell	eukaryotic cells that make up plant tissues; have cell walls and chloroplasts, but lack centrioles
population	a group of interbreeding plants or animals of the same species that occupy a community or area
producer	an organism that uses the sun to make food for itself
products	substances that are produced from reactants through a chemical reaction
prokaryote	a single celled microorganism, like bacteria, that does not have a nucleus or membrane-bound organelles
protein	a complex organic molecule made up of many amino acids joined by peptide bonds
Reactants	substances that enter a chemical reaction
ribosome	site of protein synthesis
rough endoplasmic reticulum	rough looking part of the endoplasmic reticulum that has ribosomes on its surface; ribosomes cause the rough looking appearance
stomata	a small opening in the bottom of a leaf that allows carbon dioxide and oxygen to diffuse into and out of the leaf
synthesis	a combination of two or more things that form something new
===

*/