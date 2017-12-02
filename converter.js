/* eslint-disable */
import fs from 'fs';

import * as React_04 from './challenges/react/React_04';
import * as React_08 from './challenges/react/React_08';

const challenges = [
  React_04,
  React_08
];

const challengeTemplate = {
  id: '',
  title: '',
  description: [],
  files: {
    indexjsx: {
      key: 'indexjsx',
      ext: 'jsx',
      name: 'index',
      contents: []
    }
  },
  tests: [],
  solutions: [],
  type: 'modern',
  isRequired: false,
  translations: {}
};

// make a deep copy of challengeTemplate
// NOTE: is this necessary?
function copyChallengeTemplate(temp) {
  return JSON.parse(JSON.stringify(temp));
}

// construct challenge
function challengify (challenge) {
  const newChallenge = copyChallengeTemplate(challengeTemplate);
  // try to do some replacements
  const description = challenge.challengeText.slice(39)
    .replace(/<pre>\s*<code class="codeBlock">/g, '<blockquote>')
    .replace(/<\/code>\s*<\/pre>/g, '</blockquote>')
    .replace(/<br><br>|<br \/><br \/>/g, '') // got cut off working on this, need to replace two diff styles of <br>. breaks will be from \n
    .split('\n');
  // will prob need to do some replacements here too
  const instructions = challenge.challengeText.slice(46).split('\n');

  newChallenge.title = challenge.challengeTitle.slice(42);
  // concat description and instructions with <hr> inbetween
  newChallenge.description = description.concat(['<hr>'], instructions);
  newChallenge.files.indexjsx.contents = challenge.seedCode.split('\n');
  newChallenge.solutions.push(challenge.solutionCode);
  return newChallenge;
}

// json file to write to
const writeFile = './conversions/react.json';

// parse, push, write
function appendChallengeToJSON(challenge) {
  fs.readFile(writeFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data); //now it an object
      obj.challenges.push(challenge); //add some data
      const json = JSON.stringify(obj, null, 2); //convert it back to json
      fs.writeFile(writeFile, json, 'utf8', (err) => {
        if (err) console.log(err);
      });
    }
  });
}

// loop through challenges and convert
challenges.forEach(challenge => {
  const newChallenge = challengify(challenge);
  appendChallengeToJSON(newChallenge);
});
