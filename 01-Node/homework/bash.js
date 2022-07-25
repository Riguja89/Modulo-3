const commands = require('./commands/index.js')

process.stdout.write('prompt > ');

process.stdin.on('data',function(data){ // pwd
    var args=data.toString().trim().split(' '); // le sacamos los espacios en blanco
    var cmd=args.shift(); // saca el primer elemento del array
    if(!commands.hasOwnProperty(cmd)){
        process.stdout.write('comando no valido');
        
    }else{
        commands[cmd](args);
    }
    process.stdout.write('\n prompt > ');
})