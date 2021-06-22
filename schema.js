const mongoose = require('mongoose');

const { Schema } = mongoose;

let questionSchema = new Schema({
  product_id: {
    type: Number,
    required: true,
  },
  question_id: {
    type: Number,
    required: true,
  },
  question_body: {
    type: String,
    required: true,
  },
  question_date: {
    type: Date,
    default: Date.now,
  },
  question_name: {
    type: String,
    required: true,
  },
  question_helpfulness: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Boolean,
    default: false,
  },
});

let answerSchema = new Schema({
  answer_id: {
    type: Number,
    required: true,
  },
  answer_body: {
    type: String,
    required: true,
  },
  answer_date: {
    type: Date,
    default: Date.now,
  },
  answer_name: {
    type: String,
    required: true,
  },
  answer_helpfulness: {
    type: Number,
    default: 0,
  },
});

let photoSchema = new Schema({
  photo_id: {
    type: Number,
    required: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
});
