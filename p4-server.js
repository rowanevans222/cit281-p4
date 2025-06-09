const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import functions from your module
const {
  getQuestions,
  getAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
} = require('./p4-module');

// Enable JSON parsing if needed for future POST requests
app.use(express.json());

/*
  Route: /cit/question
  Returns: { error: "", questions: [...] }
*/
app.get('/cit/question', (req, res) => {
  res.json({
    error: "",
    questions: getQuestions()
  });
});

/*
  Route: /cit/answer
  Returns: { error: "", answers: [...] }
*/
app.get('/cit/answer', (req, res) => {
  res.json({
    error: "",
    answers: getAnswers()
  });
});

/*
  Route: /cit/questionanswer
  Returns: { error: "", questions_answers: [...] }
*/
app.get('/cit/questionanswer', (req, res) => {
  res.json({
    error: "",
    questions_answers: getQuestionAnswer()
  });
});

/*
  Route: /cit/question/:number
  Returns one question by number
*/
app.get('/cit/question/:number', (req, res) => {
  const number = parseInt(req.params.number);
  const question = getQuestion(number);
  if (question === "") {
    res.json({
      error: "Question not found",
      number
    });
  } else {
    res.json({
      error: "",
      question,
      number
    });
  }
});

/*
  Route: /cit/answer/:number
  Returns one answer by number
*/
app.get('/cit/answer/:number', (req, res) => {
  const number = parseInt(req.params.number);
  const answer = getAnswer(number);
  if (answer === "") {
    res.json({
      error: "Answer not found",
      number
    });
  } else {
    res.json({
      error: "",
      answer,
      number
    });
  }
});

/*
  Route: /cit/questionanswer/:number
  Returns one question and its answer by number
*/
app.get('/cit/questionanswer/:number', (req, res) => {
  const number = parseInt(req.params.number);
  const qa = getQuestionAnswer(number);
  if (qa === "") {
    res.json({
      error: "Question and answer not found",
      number
    });
  } else {
    res.json({
      error: "",
      question: qa.question,
      answer: qa.answer,
      number
    });
  }
});

app.post('/questions', (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Both question and answer are required.' });
  }

  const newId = qaData.length ? Math.max(...qaData.map(q => q.id)) + 1 : 1;
  const newEntry = { id: newId, question, answer };
  qaData.push(newEntry);

  res.status(201).json(newEntry);
});

app.put('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const questionToUpdate = qaData.find(q => q.id === id);

  if (!questionToUpdate) {
    return res.status(404).json({ error: `No question with id ${id}` });
  }

  const { question, answer } = req.body;

  if (question) questionToUpdate.question = question;
  if (answer) questionToUpdate.answer = answer;

  res.json(questionToUpdate);
});

app.delete('/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = qaData.findIndex(q => q.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No question with id ${id}` });
  }

  qaData.splice(index, 1);

  res.json({ message: `Deleted question with id ${id}` });
});

app.get('/questions/random', (req, res) => {
  if (qaData.length === 0) {
    return res.status(404).json({ error: 'No questions available.' });
  }

  const randomIndex = Math.floor(Math.random() * qaData.length);
  res.json(qaData[randomIndex]);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});