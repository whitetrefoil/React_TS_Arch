import { createStandardAction } from 'typesafe-actions';

export const queueMessage = createStandardAction('messages/QUEUE')<string>();

export const dismissMessage = createStandardAction('messages/DISMISS')<void>();
