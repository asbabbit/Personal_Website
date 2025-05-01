export class Tag{
    
    static readonly PYTHON = new Tag('Python', 'red');
    static readonly CPP = new Tag('C++', 'blue');
    static readonly C = new Tag('C', 'black');
    static readonly VERILOG = new Tag('Verilog', 'red');
    static readonly BASH = new Tag('Bash', 'orange');
    static readonly TCL = new Tag('Tcl', 'brown');
    static readonly CADENCE = new Tag('Cadence', 'purple');
    static readonly ASSEMBLY = new Tag('Assembly', 'darkred');
    static readonly VIVADO = new Tag('Vivado', 'darkblue');
    static readonly QUESTASIM = new Tag('Questasim', 'pink');
    static readonly GIT = new Tag('Git', 'cadetblue');
    static readonly LINUX = new Tag('Linux', 'yellow');
    static readonly FPGA = new Tag('FPGA', 'green');
    static readonly MCU = new Tag('MCU', 'purple');
    static readonly MCUXPresso = new Tag("MCUXpresso", "darkorange");
    static readonly CIRCUITS = new Tag("Digital Circuits", "black");
    static readonly WEBSOCKET = new Tag("Websocket", "blueviolet");
    static readonly COLLAB  = new Tag("Collaboration", "indigo");


    private constructor(private readonly key: string, public readonly color: string){

    }

    toString() {
        return this.key
    }
}