import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";


export let options = {
  stages: [
    { duration: '.5m', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '.5m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};


export default function () {
  const product_id = randomIntBetween(1, 1000011)
  const question_id = randomIntBetween(1, 3518963)
  const answer_id = randomIntBetween(1, 6879296)


  let questions = {
    method: 'GET',
    url: `http://localhost:3001/api/qa/questions/?product_id=${product_id}`,
  };
  let answers = {
    method: 'GET',
    url: `http://localhost:3001/api/qa/questions/${question_id}/answers`,
  };
  let responses = http.batch([questions, answers]);

  check(responses[0], {
    'questions status was 200': (r) => r.status === 200,
    'questions duration < 50ms': (r) => r.timings.duration < 50
  });
  check(responses[1], {
    'answers status was 200': (r) => r.status === 200,
    'answers duration < 50ms': (r) => r.timings.duration < 50
  });
  sleep(1);
};


