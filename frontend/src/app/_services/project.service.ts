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
      name: 'Distributed Hash Table P2P Network',
      summary: "Created a DHT maintained by peers in the network",
      description: 'I developed an application where processes communicate using sockets to build and query a Distributed Hash Table (DHT). The system uses a ring topology for DHT management and implements hot potato query processing. The project involved creating two main components: An \"always-on\" manager program that manages the DHT peers, listens on a specified port, and supports communication between peers. A peer program that interacts with the manager for DHT construction, management, and query processing. I used socket programming to implement these components, ensuring that the communication between peers followed a hot potato protocol. The manager oversees the DHT creation and manages peer churn. Throughout the project, I utilized version control to manage the code and regularly committed updates to a private repository.',
      projectLink: 'https://github.com/asbabbit/SocketProject/tree/main',
      tags: [Tag.PYTHON, Tag.WEBSOCKET, Tag.GIT],
      pictures: ["assets/DHT.png"]
    },
    {
      id: 1,
      name: 'FRDM Robot',
      summary: 'Built an object avoidance robot',
      description: 'I developed an obstacle avoidance system using an FRDM microcontroller, integrating an ultrasonic sensor, a servo motor, and dual DC motors. The system detects obstacles in real time and autonomously navigates by adjusting movement based on sensor input. Motor control is handled via TPM0, while the ultrasonic sensor operates through PortA and PortD to measure distances. A servo motor, controlled via TPM1, dynamically scans the surroundings to enhance detection accuracy. Additionally, an interrupt-driven switch (SW1) allows manual intervention. This project successfully demonstrates real-time obstacle detection and autonomous decision-making for smooth navigation.',
      projectLink: 'https://github.com/asbabbit/FRDM_Object_Detection',
      tags: [Tag.C, Tag.MCU, Tag.MCUXPresso],
      pictures: ["assets/Object_Detection.gif","assets/FRDM_Board.webp"]
    },
    {
      id: 2,
      name: 'LLM for Verilog Verification',
      summary: 'Collected data points to fine tune LLM\'s',
      description: 'During my undergraduate studies, I led a research project in collaboration with professors and graduate students to develop an open-source tool that leverages a fine-tuned LLM to generate verification tests for SystemVerilog designs. The goal was to reduce the number of iterations required in hardware verification, enabling engineers to test designs more efficiently. I spearheaded data collection and organization, using GitHub’s API to download and curate hundreds of Verilog and SystemVerilog repositories. Through Python and Bash scripting, I processed raw data into structured datapoints, utilizing graph structures and regular expressions to recursively identify file dependencies and determine the top module for generating Makefiles. To evaluate model performance, I set up batch processes on the ASU supercomputer to benchmark LLaMA 3.1 against various prompts and datapoints, refining extraction methodologies to optimize test case generation. Though I have since graduated and moved on from the project, it remains ongoing as a valuable resource for advancing automated verification in hardware design.',
      projectLink: 'https://github.com/asbabbit/VeriVerif',
      tags: [Tag.BASH, Tag.PYTHON, Tag.GIT, Tag.VERILOG, Tag.COLLAB],
      pictures: ["assets/Data_Point.gif", "assets/Data_Point.png"]
    },
    {
      id: 3,
      name: 'Infix2Postfix Machine',
      summary: 'Created a system in Verilog to convert infix expressions to postfix notation.',
      description: 'Coded in Verilog a machine that converts infix expressions to postfix notation using multiple stacks and then simulating on the Artix 7 FPGA. This system makes the conversion process faster and more efficient, making it useful in applications like compilers and calculators.',
      projectLink: 'https://github.com/asbabbit/Infix2Postfix',
      tags: [Tag.VERILOG, Tag.FPGA, Tag.VIVADO],
      pictures: ["assets/Infix2Postfix.png","assets/StrobeOutput.png","assets/ControlDiagram.png"]
    },
    {
      id: 4,
      name: 'Differential Amp',
      summary: 'Designed a differential amplifier given specifications',
      description: 'Explain what differential amplifiers are for and what you did and learned',
      projectLink: '',
      tags: [Tag.CADENCE],
      pictures: ["assets/Specification.png","assets/Ideal-Calc.png","assets/Non-Ideal-Calc.png","assets/Non-Ideal.png","assets/Waveform.png"]
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
