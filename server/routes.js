const controller = require('./controllers');
const { Router } = require('express');

const router = Router();

router.get('/questions', controller.questions.get);

router.post('/questions/:questionid', controller.questions.post);

router.patch('/questions/:question_id/helpful', controller.questions.helpful);

router.patch('/questions/:question_id/report', controller.questions.report);

router.route('/questions/:questionid/answers')
  .get(controller.answers.get)
  .post(controller.answers.post)

// router.get('/questions/:questionid/answers', controller.answers.get);

// router.post('/questions/:questionid/answers', controller.answers.post);

router.patch('/answers/:answer_id/helpful', controller.answers.helpful);

router.patch('/answers/:answer_id/report', controller.answers.report);

module.exports = router;