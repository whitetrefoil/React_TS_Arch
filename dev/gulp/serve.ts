import { parallel, task } from 'gulp';

import './dev-server';
import './stubapi';

task('serve', parallel('devServer', 'stubapi'));
