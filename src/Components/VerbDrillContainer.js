import React, { Component } from 'react'
import * as firebase from 'firebase'
import Question from './Question'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'

let audioContext;

const firebaseConfig = {
  apiKey: "",
  authDomain: "frenchverbs.firebaseapp.com",
  databaseURL: "https://frenchverbs.firebaseio.com",
  projectId: "firebase-frenchverbs",
  storageBucket: "",
  messagingSenderId: "156765582776"
};

class VerbDrillContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      question: [],
      pronoun: {},
      totalAnswered: 0,
      totalCorrect: 0,
      streak: 0,
      showRevision: false
    }

    this.checkAnswer = this.checkAnswer.bind(this)

  }

  componentWillMount() {

    window.AudioContext = window.AudioContext || window.webkitAudioContext
    audioContext = new window.AudioContext()

    firebase.initializeApp(firebaseConfig)
    firebase.database().ref('/verbs').once('value').then((snapshot) => {
      const question = this.getQuestion({verbs: snapshot.val()})
      this.setState({
        data: {verbs: snapshot.val()},
        question
      })
    })
  }

  /*
   * Display the question, answer and stats components
  */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="question-card" className="col-xs-11 col-sm-11 col-md-6 col-lg-6 col-centered">
            <Question question={this.state.question} pronoun={this.state.question.pronoun} />
            <Answer pronoun={this.state.question.pronoun} checkAnswer={this.checkAnswer} onTouchEnd={this.handleTouchEnd} />
            <Stats totalAnswered={this.state.totalAnswered} totalCorrect={this.state.totalCorrect} streak={this.state.streak} />
          </div>
          <div id="revision-card" className="col-xs-11 col-sm-11 col-md-6 col-lg-6 col-centered">
            { this.state.showRevision && <Revision data={this.state.question.revisionData} /> }
          </div>
        </div>
      </div>
    );
  }

  /*
   * Randomly select a new verb, tense and pronoun, and return a question object
  */
  getQuestion(data) {
    var verbIndex = this.getRandomIndex(0, (data.verbs.length - 1));
    var tenseIndex = this.getRandomIndex(0, (data.verbs[verbIndex].tenses.length - 1));
    var pronounIndex = this.getRandomIndex(0, (data.verbs[verbIndex].tenses[tenseIndex].pronouns.length - 1));
    const questionData = {
      'infinitive': data.verbs[verbIndex].infinitive,
      'translation': data.verbs[verbIndex].translation,
      'tense': data.verbs[verbIndex].tenses[tenseIndex].name,
      'pronoun': data.verbs[verbIndex].tenses[tenseIndex].pronouns[pronounIndex],
      'revisionData': data.verbs[verbIndex]
    };
    return questionData;
  }

  /*
   * Return a random integer with max and min.  Used to select a question array index.
  */
  getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /*
   * Check submitted answer against data, disregarding accents.
  */
  checkAnswer(event) {
    event.preventDefault();
    this.setState({ showRevision: false });

    const answerWithoutAccents = this.foldAccents(this.state.question.pronoun.answer);
    const answer = this.state.question.pronoun.answer.toLowerCase();
    const guess = event.target.guess.value.toLowerCase().trim();

    if (guess === answer || guess === answerWithoutAccents) {
      this.randomPositiveSound();
      this.setState({ totalAnswered: this.state.totalAnswered + 1, totalCorrect: this.state.totalCorrect + 1, streak: this.state.streak + 1, question: this.getQuestion(this.state.data) });
      event.target.guess.value = '';
    } else {
      this.randomNegativeSound();
      event.target.guess.value = '';
      this.setState({ streak: 0, totalAnswered: this.state.totalAnswered + 1, showRevision: true });
    }
  }

  /*
   * Substitute accented characters in a string
  */
  foldAccents(inputString) {
    var accentMap = {'á':'a', 'é':'e', 'ê':'e', 'í':'i','ó':'o','ú':'u'};
    if (!inputString) { return ''; }
    var returnString = '';
    for (var i = 0; i < inputString.length; i++) {
      returnString += accentMap[inputString.charAt(i)] || inputString.charAt(i);
    }
    return returnString;
  }

  capitalisePronouns(data) {
    data.verbs.map((verb, verbId) => {
      verb.tenses.map((tense, tenseId) => {
        tense.pronouns.map((pronoun, pronounId) => {
          data.verbs[verbId].tenses[tenseId].pronouns[pronounId].pronoun = this.capitalise(data.verbs[verbId].tenses[tenseId].pronouns[pronounId].pronoun);
        });
      });
    });
    return data;
  }

  capitalise(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  /*
   * Hack to unlock HTML5 Audio on iOS
  */
  handleTouchEnd() {
    var buffer = audioContext.createBuffer(1, 1, 22050);
    var sourceBuffer = audioContext.createBufferSource();
    sourceBuffer.buffer = buffer;
    sourceBuffer.connect(audioContext.destination);
    sourceBuffer.start(audioContext.currentTime);
    //sourceBuffer.noteOn(0);
  }

  playSound(buffer) {
    var sourceBuffer = audioContext.createBufferSource();
    sourceBuffer.buffer = buffer;
    sourceBuffer.connect(audioContext.destination);
    sourceBuffer.start(audioContext.currentTime);
  }

  loadSound(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.responseType = 'arraybuffer';
    var that = this;
    request.onload = function () {
      var undecodedAudio = request.response;
      audioContext.decodeAudioData(undecodedAudio, function(buffer) {
        that.playSound(buffer);
      });
    };
    request.send();
  }

  randomPositiveSound() {
    var positives = ['sounds/oooooui.mp3', 'sounds/oui-tres-bien.mp3', 'sounds/voila.mp3', 'sounds/exactement.mp3'];
    this.loadSound(positives[Math.floor(Math.random() * positives.length)]);
  }

  randomNegativeSound() {
    var negatives = ['sounds/cest-non.mp3', 'sounds/je-repond-non.mp3'];
    this.loadSound(negatives[Math.floor(Math.random() * negatives.length)]);
  }

}

export default VerbDrillContainer
