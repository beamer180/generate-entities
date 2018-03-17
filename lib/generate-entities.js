function GenerateEntities(argv, EntitiesParser) {

    var generateEntities = null;
    var args = null;
    var entitiesfile = null;
    var EntitiesFileParser = null;
    var generators = null;
    var entitySpecs = null;
    var env = null;


    EntitiesFileParser = EntitiesParser;
    var program = require('commander');

    constructor(argv);

    this.run = function() {
        runCommander();
    }

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
    
        entitiesfile = env.configPath;
        var entitiesFileParser = new EntitiesFileParser(entitiesfile);
         
        generators = entitiesFileParser.getGenerators();
        entitySpecs = entitiesFileParser.getEntitySpecs();

        runGenerators(generators, entitySpecs);
        
    }

    function runGenerators(generators, entitySpecs) {

        
        for(const generatorName in generators) {
            runGenerator(generators[generatorName], entitySpecs)
        }
    
    }

    function runGenerator(generator, entitySpecs) {
        generator.generate(entitySpecs);
    }

}

module.exports = GenerateEntities;