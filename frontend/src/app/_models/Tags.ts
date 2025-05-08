export class Tag{
    
    static readonly PYTHON = new Tag('Python', '#dc3545');       // Bootstrap danger (dark red)
    static readonly CPP = new Tag('C++', '#0d6efd');             // Bootstrap primary (blue)
    static readonly C = new Tag('C', '#343a40');                 // Bootstrap gray-800 (dark gray)
    static readonly VERILOG = new Tag('Verilog', '#b02a37');     // Darker red
    static readonly BASH = new Tag('Bash', '#fd7e14');           // Bootstrap orange
    static readonly TCL = new Tag('Tcl', '#6c584c');             // Muted brown
    static readonly CADENCE = new Tag('Cadence', '#6f42c1');     // Bootstrap purple
    static readonly ASSEMBLY = new Tag('Assembly', '#842029');   // Very dark red
    static readonly VIVADO = new Tag('Vivado', '#0a58ca');       // Darker blue
    static readonly QUESTASIM = new Tag('Questasim', '#d63384'); // Bootstrap pink
    static readonly GIT = new Tag('Git', '#5a6b77');             // Muted cadet blue
    static readonly LINUX = new Tag('Linux', '#ffc107');         // Bootstrap warning (yellow)
    static readonly FPGA = new Tag('FPGA', '#198754');           // Bootstrap success (green)
    static readonly MCU = new Tag('MCU', '#6f42c1');             // Bootstrap purple
    static readonly MCUXPresso = new Tag("MCUXpresso", '#c56200'); // Darker orange
    static readonly CIRCUITS = new Tag("Digital Circuits", '#212529'); // Bootstrap gray-900 (almost black)
    static readonly WEBSOCKET = new Tag("Websocket", '#7952b3');  // Muted blue-violet
    static readonly COLLAB = new Tag("Collaboration", '#4b0082'); // Muted indigo
    static readonly DEBIAN = new Tag('Debian', '#dc3545');        // Bootstrap danger (dark red)
    static readonly UBUNTU = new Tag('Ubuntu', '#fd7e14');        // Bootstrap orange
    static readonly FREERTOS = new Tag('FreeRTOS', '#0d6efd');    // Bootstrap primary (blue)
    static readonly ESP32 = new Tag('ESP32', '#20c997');          // Bootstrap teal
    static readonly FRDM_KL46Z = new Tag('FRDM KL46Z', '#6c757d'); // Bootstrap secondary (gray)
    static readonly PYNQ_Z2 = new Tag('PYNQ-Z2', '#b02a37');      // Darker red
    static readonly KRIA_K26C = new Tag('Kria K26C', '#198754');  // Bootstrap success (green)
    static readonly ARTIX7 = new Tag('Artix 7', '#0a58ca');       // Darker blue
    static readonly LTSPICE = new Tag('LTSpice', '#495057');      // Bootstrap gray-700
    static readonly MATLAB = new Tag('MATLAB', '#e76f51');        // Muted orange
    static readonly VITIS = new Tag('Vitis', '#3d8bfd');          // Lighter blue
    static readonly UART = new Tag('UART', '#d2691e');            // Muted chocolate
    static readonly SPI = new Tag('SPI', '#343a40');              // Bootstrap gray-800
    static readonly I2C = new Tag('I2C', '#198754');              // Bootstrap success (green)
    static readonly UDP = new Tag('UDP', '#6c584c');              // Muted olive/brown
    static readonly TCP = new Tag('TCP', '#a94064');              // Muted medium violet red


    private constructor(private readonly key: string, public readonly color: string){

    }

    toString() {
        return this.key
    }
}