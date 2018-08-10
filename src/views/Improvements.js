import React, {
  Component
} from 'react';
import Slider from "react-slick";
import ScoreStatus from '../components/ScoreStatus.js'
import Card from '../components/Card.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'
import {
  Redirect
} from 'react-router-dom'
import '../styles/improvements.css'
import {
  MockJSON
} from '../components/MockJSON.js'


class Improvements extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.done = this.done.bind(this);
    this.willDo = this.willDo.bind(this);
    this.clear = this.clear.bind(this);

    var state = this.props.state;
    state.sliders = this.props.state.improveState.sliders;
    state.cards = this.props.state.improveState.cards;
    state.currentView = 'Improvements';

    console.log('State => ', state);

    if(this.props.state.potentialScore === -1) {
      this.props.state.potentialScore = this.props.location.state.currentScore
      this.props.state.animate = false
    }

    var improwMass = 100 - this.props.state.potentialScore
    var unit = improwMass / this.props.state.cards.length
    this.props.state.unit = unit
    this.state = this.props.state
  };

  getInitialScore() {
      var sliders = this.state.sliders,
            total = 0,
            count = 0,
            score = 0;
      sliders.forEach(function(item) {
          total += item.value;
          count++;
      });

      score = parseInt( total / count );
      return score;
  }

  done() {
    var cards = this.state.cards
    if(cards[this.state.activeSlide].done || cards[this.state.activeSlide].willDo) {
      return
    }
    cards[this.state.activeSlide].done = true
    cards[this.state.activeSlide].willDo = false
    this.setState({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    })
  }

  willDo() {
    var cards = this.state.cards
    if(cards[this.state.activeSlide].done || cards[this.state.activeSlide].willDo) {
      return
    }
    cards[this.state.activeSlide].done = false
    cards[this.state.activeSlide].willDo = true
    this.setState({
      cards: cards,
      animate: true,
      potentialScore: this.state.potentialScore + this.state.unit
    })
  }

  clear() {
    var cards = this.state.cards
    if(cards[this.state.activeSlide].done || cards[this.state.activeSlide].willDo) {
      cards[this.state.activeSlide].done = false
      cards[this.state.activeSlide].willDo = false
      this.setState({
        cards: cards,
        animate: true,
        potentialScore: this.state.potentialScore - this.state.unit
      })
    }
  }

  next() {
    this.slider.slickNext();
    this.setState({
      animate: false
    })
  }
  previous() {
    this.slider.slickPrev();
    this.setState({
      animate: false
    })
  }

  render() {
    var settings = {
      centerMode: true,
      slidesToShow: 1,
      speed: 500,
      dots: true,
      className: "center",
      beforeChange: (current, next) => this.setState({
        activeSlide: next
      })
    };

    if(this.props.state === undefined) {
      return <Redirect to='/'  />
    }

    return(
      <div className="container">
        <Title title={'Forslag til forbedring'}/>
        <ScoreStatus
          current={this.state.currentScore}
          potential={this.state.potentialScore}
          animate={this.state.animate}
        />
        <TextRow text={'Vi har fundet 9 tiltag, der kan forbedre komforten i dit\
          hus. Du kan nu vælge ud de tiltag, du vil gå videre med.'}
        />
        <div className="row" style={{margin: "4% 0%"}}>
          <button  onClick={this.previous} className="nav-btn offset-2 col-3 btn btn-dark">←</button>
          <button  onClick={this.next} className="nav-btn offset-2 col-3 btn btn-dark">→</button>
        </div >
        <div>
          <Slider ref={c => (this.slider = c)} {...settings}>
            {this.state.cards.map((card, index) =>
              <Card title={card.title} description={card.description} key={index}
              done={card.done} willDo={card.willDo} targets={card.targets}
              />)
            }
          </Slider>
        </div>

      <div className="row" style={{margin: "5% 0%"}}>
          <button onClick={this.done} className="offset-2 col-2 btn btn-light">HAR GJORT</button>
          <button onClick={this.willDo} className="offset-1 col-2 col btn btn-light">VIL GØRE</button>
          <button onClick={this.clear} className="offset-1 col-2 btn btn-light">VIL IKKE</button>
      </div>

      <Footer link = "result"
      text = {
        "Se din liste med forbedringstiltag og hvordan du kan gemme den til senere"
      }
      linkText = {
        "Ja, vis resultat"
      }
      passedState={this.state}
      />
    </div >
    )
  }
}

export default Improvements;
