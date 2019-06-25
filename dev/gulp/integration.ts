import { parallel, task } from 'gulp';

import './backend';
import './dev-server';

task('integration', parallel('devServer', 'backend'));
