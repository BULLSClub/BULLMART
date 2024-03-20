import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiOutlinePauseCircle, AiOutlinePlayCircle} from "react-icons/ai";



class HomeRadio extends Component {
    constructor() {
        super();
        this.state = {
          PlayIcon: "d-none",
          PauseIcon: "",
          RadioURL: "",
          RadioTitle: "",
          RadioDescription: "",
        };
      }
    
      componentDidMount() {
        // Set the Radio Streaming URL and Radio Station Title directly
        this.setState({
          RadioURL: "http://stream.zeno.fm/ecem9tuahdhvv",
          RadioTitle: "BULLRADIO",
        });
      }
    
      // Play Radio
      RadioPlay = async () => {
        try {
          await this.audioInput.play();
          this.setState({ PlayIcon: "d-none", PauseIcon: "" });
        } catch (error) {
          console.log(error);
        }
      };
    
      // Pause Radio
      RadioPause = async () => {
        try {
          await this.audioInput.pause();
          this.setState({ PlayIcon: "", PauseIcon: "d-none" });
        } catch (error) {
          console.log(error);
        }
      };
    
      render() {
        return (
          <div>
            <Container>
              <Row>
                <Col md={8} lg={8}>
                  <audio
                    ref={(audio) => (this.audioInput = audio)}
                    src={this.state.RadioURL}
                  />
                </Col>
              </Row>
            </Container>
            <Row>
              <h1 className="radio-point animated slideInDown">
                <AiOutlinePlayCircle
                  onClick={this.RadioPlay}
                  className={this.state.PlayIcon + " radio-play-pause"}
                />
                <AiOutlinePauseCircle
                  onClick={this.RadioPause}
                  className={this.state.PauseIcon + " radio-play-pause"}
                />
              </h1>
            </Row>
          </div>
        );
      }
    }
export default HomeRadio;