import positionCodes from '../Instructions_&_Positions/PositionCodes';
import instructionSelector from '../Instructions_&_Positions/InstructionSelector';

const positionChange = (num, instructions, setInstruction, setPosition, setFinalInstruction) => {
  const pos = positionCodes[num];
  const newPos = instructionSelector(pos.code, instructions, setInstruction);
  setPosition(pos.code);
  setFinalInstruction(newPos.code);
};




export default positionChange;