import React, {
  Component
} from 'react';

import '../styles/overview.css'
import Slider from '../components/slider.js'
import Footer from '../components/Footer.js'
import TextRow from '../components/TextRow.js'
import Title from '../components/Title.js'
import {
  MockJSON
} from '../components/MockJSON.js'

import Improvements from './Improvements.js'

class Overview extends Component {
  constructor(props) {
    super(props)
    var state = this.props.store.currentState;
    this.state = state;

    this.updateScore = this.updateScore.bind(this);
    this.improvementsPage = this.improvementsPage.bind(this);
  }

  updateScore(newVal, key) {
    var sliders = this.state.sliders;
    var oldVal = sliders[parseInt(key, 10)].value / 600 * 100
    sliders[parseInt(key, 10)].value = newVal;
    this.setState((state) => ({
      currentScore: state.currentScore + (newVal / 600 * 100) -
        oldVal,
      sliders: sliders
    }), function() {

    })
  }

  improvementsPage() {
      var goNext = this.props.history.push,
        newState = this.state;

      this.props.store.currentState = newState;

      goNext('/Improvements');
  }

  render() {
    var img =
      "https://maps.googleapis.com/maps/api/streetview?parameters&size=1350x1350&key=" +
      "AIzaSyBy3Ect_uyKDDhuRCQvUC0n7KQa5mbbiZg&location=" + this.state.address;

    return(
      <div className="container">
        <Title title={'Din komfortscore'}/>
        <div className="row">
          <div className="col-sm-8 col-xs-12 housePicture text-center">
            <img className="rounded img-fluid" alt="house" src={img}/>
            <p>{this.state.address}</p>
          </div>
          <div className="col-sm-4 komforScore col-xs-12 d-flex align-items-center">
            <div>
              <p className="score">{Math.floor(this.state.currentScore)}%</p>
              <p>Din nuværende komfortscore</p>
            </div>
          </div>
        </div>
        <TextRow text = {'Andre der bor i et hus, der minder om dette, har \
          vurderet komforten på de nedenstående parametre sådan her - juster på\
          parametrene, hvis du ikke er enig i komfortvurderingerne'}
        />
        {this.state.sliders.map(
          (slider, index) =>
          <Slider
            key={index}
            index={index}
            updateScore={this.updateScore}
            parameter={slider.name}
            value={this.state.sliders[index].value}/>
        )}

        <div>Se hvad du kan gøre ved dit hus for at forbedre din komfortscore?</div>
        <div className="btn btn-success" onClick={this.improvementsPage}>Ja, inspirer mig nu</div>
      </div>
    )
  }
}

export default Overview;
