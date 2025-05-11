import { Injectable } from '@angular/core';
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tags';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    projects: Project[] = [
      {
        id: 0,
        name: '4G LTE Security Camera',
        summary: 'Created a system that live streams video over 4G LTE',
        description: 'I developed a battery-powered, LTE-connected camera system that streams video to a server without relying on Wi-Fi. I implemented multithreaded FreeRTOS tasks to synchronize real-time image capture and network transmission, and switched from TCP to UDP to reduce latency—achieving 325 kbps and 10 fps with SVGA compression. I adapted TinyGSM to support UDP APIs and designed an MTU-aware chunking and metadata tagging system to ensure reliable file transfer and reassembly. Through this project, I gained hands-on experience with real-time operating systems, embedded networking, and protocol optimization, and set the stage for future upgrades like H.265 hardware acceleration and secure transmission with SSL.',
        projectLink: 'https://github.com/asbabbit/Securmax',
        tags: [Tag.DEBIAN, Tag.CPP, Tag.MCU, Tag.FREERTOS, Tag.PYTHON],
        pictures: ["assets/ESP32.webp", "assets/output_bright.gif"]
      },
      {
        id: 1,
        name: 'LLM for Verilog Verification',
        summary: 'Collected data points to fine tune LLM\'s',
        description: 'During my undergrad, I led a research project to develop an open-source tool that uses a fine-tuned LLM to generate verification tests for SystemVerilog designs. I collaborated with professors and grad students to reduce verification effort by automating test generation. I handled data collection and processing, using GitHub’s API, Python, and Bash to curate and analyze hundreds of HDL repositories. I built scripts to detect file dependencies, identify top modules, and auto-generate Makefiles. I also benchmarked LLaMA 3.1 on ASU’s supercomputer to evaluate prompt effectiveness. This project deepened my skills in automation, scripting, and model evaluation, and the tool continues to support more efficient hardware verification in ongoing research.',
        projectLink: 'https://github.com/asbabbit/VeriVerif',
        tags: [Tag.BASH, Tag.PYTHON, Tag.GIT, Tag.VERILOG, Tag.QUESTASIM],
        pictures: ["assets/LLM.gif", "assets/Data_Point.png"]
      },

    {
      id: 2,
      name: 'Autonomous Robots',
      summary: 'Built robots that avoid objects, detect color, and folow a path',
      description: 'I built an autonomous object avoidance robot using an NXP FRDM microcontroller, ultrasonic sensor, servo, and DC motors. This was my first experience with bare-metal programming, where I configured UART, I2C, PWM, and IRQ handlers directly from the hardware documentation. I learned to debug by checking register values and gained hands-on experience with low-level embedded systems. The robot successfully navigates through rooms with obstacles, demonstrating real-time detection and control without an operating system.',
      projectLink: 'https://github.com/asbabbit/FRDM_Object_Detection',
      tags: [Tag.C, Tag.MCU, Tag.MCUXPresso],
      pictures: ["assets/FRDM.gif","assets/FRDM_Board.webp"]
    },
    {
      id: 3,
      name: 'Differential Amp',
      summary: 'Constructed a differential amplifier given specifications',
      description: 'I designed and simulated a differential amplifier with passive loads and current source biasing in Cadence. I calculated theoretical performance metrics like differential gain, output swing, and current, then compared them to simulated results to ensure the design met power and gain specifications. Through this project, I learned how to balance theoretical calculations with practical design constraints and validated my design choices.',
      projectLink: 'https://github.com/asbabbit/',
      tags: [Tag.CADENCE],
      pictures: ["assets/Specification.png","assets/Ideal-Calc.png","assets/Non-Ideal-Calc.png","assets/Non-Ideal.png","assets/Waveform.png"]
    },
    {
      id: 4,
      name: 'Infix2Postfix Machine',
      summary: 'Created a system in Verilog to convert infix expressions to postfix notation.',
      description: 'I coded a machine in Verilog that converts infix expressions to postfix notation using multiple stacks, and simulated it on the Artix 7 FPGA. This design optimizes the conversion process, improving speed and efficiency, which is beneficial for applications like compilers and calculators. Through this project, I gained experience in hardware design, FPGA simulation, and stack-based algorithms.',
      projectLink: 'https://github.com/asbabbit/Infix2Postfix',
      tags: [Tag.VERILOG, Tag.FPGA, Tag.VIVADO],
      pictures: ["assets/Infix2Postfix.png","assets/StrobeOutput.png","assets/ControlDiagram.png"]
    },
    {
      id: 5,
      name: 'Distributed Hash Table',
      summary: "Implemented a DHT maintained by peers in the network",
      description: 'I developed a distributed application using socket programming where processes communicate to build and query a ring-based Distributed Hash Table (DHT). I implemented a manager to coordinate peers and handle DHT maintenance, along with a peer program that supports hot potato query processing. This project taught me how to manage inter-process communication, handle peer churn, and design distributed protocols. I also gained experience with version control and collaborative development. The system successfully supports dynamic DHT construction and efficient, decentralized query handling.',
      projectLink: 'https://github.com/asbabbit/SocketProject/tree/main',
      tags: [Tag.PYTHON, Tag.WEBSOCKET, Tag.GIT],
      pictures: ["assets/DHT.png"]
    }
  ]
  constructor() { }

  GetProjects(){
    return this.projects;
  }

  GetProjectById(id: number) : Project{
    let project = this.projects.find(project => project.id === id);

    if (project === undefined){
      throw new TypeError('No project with provided id' + id)
    }

    return project;
  }
}
