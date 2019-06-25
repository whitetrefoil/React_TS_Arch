// import { ReceptionistsState } from './types';

import { ReceptionistsState } from './types';

export const getGreeting = (state: ReceptionistsState) =>
  state.receptionist == null
    ? 'Waiting for the receptionist...'
    : `${state.receptionist.name}: Hello!`;
