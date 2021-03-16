import { IPlayerPosition } from '../interfaces/IPlayerPosition';

 const InstructionsPlayer : IPlayerPosition[] = [
  { code: 'GK', move: 'gk-sb', content: 'Goal keeper stay back' },
  { code: 'GK', move: 'gk-jp', content: 'Goal keeper join play' },
  { code: 'LCB', move: 'lcb-sb', content: 'Stay back during the game' },
  { code: 'LCB', move: 'lcb-ja', content: 'Join attack whenever possible' },
  { code: 'RCB', move: 'rcb-sb', content: 'Stay back during the game' },
  { code: 'RCB', move: 'rcb-ja', content: 'Join the attack whenever possible' },
  {
    code: 'LB',
    move: 'lb-sb',
    content: 'Go wide and give crosses on attacking runs',
  },
  { code: 'LB', move: 'lb-ja', content: 'Cut inside when joining the attack' },
  {
    code: 'RB',
    move: 'rb-ja',
    content: 'Go wide and give crosses on attacking runs',
  },
  { code: 'RB', move: 'rb-sb', content: 'Cut inside when joining the attack' },
  { code: 'LDM', move: 'ldm-ot', content: 'Cover center' },
  { code: 'LDM', move: 'ldm-sb', content: 'Cover wing' },
  { code: 'RDM', move: 'rdm-ot', content: 'Cover center' },
  { code: 'RDM', move: 'rdm-sb', content: 'Cover wing' },
  { code: 'CAM', move: 'cam-ot', content: 'Free roam' },
  { code: 'CAM', move: 'cam-sb', content: 'Stay Back' },
  { code: 'LW', move: 'lw-sw', content: 'Stay wide and give crosses' },
  {
    code: 'LW',
    move: 'lw-ci',
    content: 'Cut inside and go for the action',
  },
  { code: 'RW', move: 'rw-sw', content: 'Stay wide and give crosses' },
  {
    code: 'RW',
    move: 'rw-ci',
    content: 'Cut inside and go for the action',
  },
  {
    code: 'ST',
    move: 'st-ot',
    content: 'Drop back and act like a false 9',
  },
  {
    code: 'ST',
    move: 'st-sb',
    content: "Make runs and get in behind the opponent's defense",
  },
];

export default InstructionsPlayer;