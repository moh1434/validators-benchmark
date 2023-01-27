import * as express from 'express';
import Benchmark from 'benchmark';

import MessageResponse from '../interfaces/MessageResponse';
import { withZod } from '../validators/withZod';
import { user } from '../data/data';
import { withClassValidator } from '../validators/withClassValidator';

const router = express.Router();
const suite = new Benchmark.Suite();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.get<{}, any>('/test', async (req, res) => {
  suite
    .add('ClassValidator', function () {
      withClassValidator(user);
    })
    .add('Zod', function () {
      withZod(user);
    })
    // add listeners
    .on('cycle', function (event) {
      console.log(String(event.target));
    })
    .on('complete', function () {
      const result = 'Fastest is ' + this.filter('fastest').map('name');

      console.log(result);
      return result;
    })
    // run async
    .run({ async: true });

  return 'see the console';
});

export default router;
