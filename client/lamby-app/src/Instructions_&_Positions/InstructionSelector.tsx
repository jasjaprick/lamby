import { ICode} from '../interfaces/ICode';


const instructionSelector = (position: string, instructions , setInstruction): ICode => {

  let instruction;
  switch (position) {
    case 'GK':
      instruction = [
        { code: 'gk gk-sb', content: 'Stay back' },
        { code: 'gk gk-jp', content: 'Join play' },
      ];
      break;
    case 'LCB':
      instruction = [
        { code: 'lcb lcb-sb', content: 'Stay back' },
        { code: 'lcb lcb-ja', content: 'Join attack' },
      ];
      break;
    case 'RCB':
      instruction = [
        { code: 'rcb rcb-sb', content: 'Stay back' },
        { code: 'rcb rcb-ja', content: 'Join attack' },
      ];
      break;
    case 'LB':
      instruction = [
        { code: 'lb lb-sb', content: 'Cut inside' },
        { code: 'lb lb-ja', content: 'Give crosses' },
      ];
      break;
    case 'RB':
      instruction = [
        { code: 'rb rb-ot', content: 'Cut inside' },
        { code: 'rb rb-sb', content: 'Give crosses' },
      ];
      break;
    case 'LDM':
      instruction = [
        { code: 'ldm ldm-ot', content: 'Cover center' },
        { code: 'ldm ldm-sb', content: 'Cover wing' },
      ];
      break;
    case 'RDM':
      instruction = [
        { code: 'rdm rdm-ot', content: 'Cover center' },
        { code: 'rdm rdm-sb', content: 'Cover wing' },
      ];
      break;
    case 'CAM':
      instruction = [
        { code: 'cam cam-ot', content: 'Free roam' },
        { code: 'cam cam-sb', content: 'Stay Back' },
      ];
      break;
    case 'LW':
      instruction = [
        { code: 'lw lw-ci', content: 'Cut inside' },
        { code: 'lw lw-sw', content: 'Stay wide' },
      ];
      break;
    case 'RW':
      instruction = [
        { code: 'rw rw-ot', content: 'Cut inside' },
        { code: 'rw rw-sb', content: 'Give crosses' },
      ];
      break;
    case 'ST':
      instruction = [
        { code: 'st st-ot', content: 'False 9' },
        { code: 'st st-sb', content: 'Give crosses' },
      ];
      break;
  }
  setInstruction(instruction);
  return instructions[0];
};


export default instructionSelector;