var program = require('commander');
var generateEntities = null;
var args = null;
var entitiesfile = null;
var EntitiesFileParser = null;
var generators = null;
var entitySpecs = null;
var env = null;



function constructor(argv) {

    args = argv;

    bootstrapCommander(argv);
    bootstrapLiftoff(argv);
}

function bootstrapCommander(argv) {

    program
        .version('0.0.1')
        .description('Generate RESTful resources and everthing that goes along with them');

    program
        .command("generate")
        .option('-e, --entities-files', 'Entities File, default: entitiesfile.js')
        .alias("g")
        .description("Generate entities")
        .action(() => {
            runLiftoff();
        });
}

function bootstrapLiftoff(argv) {
    const Liftoff = require("liftoff");
    
    const args = require("minimist")(argv.slice(2));

    generateEntities = new Liftoff({
        processTitle: "generate-entities",
        moduleName: 'generate-entities',
        configName: 'entitiesfile'
    });
}

function runCommander() {
    program.parse(args);
}

function runLiftoff() {
    var argv = require('minimist')(args.slice(2));


    generateEntities.launch({
        cwd: argv.cwd,
        configPath: argv.entitiesfile
    }, liftoffCallback);
}

function liftoffCallback(environment) {

    env = environment;
    console.log(env);

    entitiesfile = env.configPath;
    var entitiesFileParser = new EntitiesFileParser(entitiesfile);
     
    generators = entitiesFileParser.getGenerators();
    console.log(generators);
    entitySpecs = entitiesFileParser.getEntitySpecs();
    console.log(entitySpecs);
    
}


function GenerateEntities(argv, EntitiesParser) {
    EntitiesFileParser = EntitiesParser;

    constructor(argv);

    this.run = function() {
        runCommander();
    }
}

module.exports = GenerateEntities;