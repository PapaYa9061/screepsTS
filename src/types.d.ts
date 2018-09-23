// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  taskforce: string;
  available: boolean;
  state: any;
}

interface Memory {
  governmentEstablished: boolean;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
