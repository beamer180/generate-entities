function GenerateEntities(argv, EntitiesParser, generatorBuilder, appRoot, fileWriterFactory) {

    var generateEntities = null;
    var args = argv;
    var entitiesfile = null;
    var EntitiesFileParser = null;
    var generators = null;
    var entitySpecs = null;
    var env = null;


    EntitiesFileParser = EntitiesParser;
    var program = require('commander');

    constructor();

    this.run = function() {
        runCommander();
    }

    function constructor() {
    
        bootstrapCommander(args);
        bootstrapLiftoff(args);
    }
    
    function bootstrapCommander(argv) {
    
        program
            .version('0.0.1')
            .description('Generate stuff');
    
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
        var entitiesFileParser = new EntitiesFileParser(entitiesfile, generatorBuilder, appRoot, fileWriterFactory);
         
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