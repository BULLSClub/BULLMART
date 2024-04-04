import React from 'react';
import axios from 'axios';
import Image from 'next/image';

class AdviceCard extends React.Component {
  state = {
    advice: '',
  }

  componentDidMount() {
    this.fetchAdvice();
  }
  
  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;

        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({ isShaking: true });

    // Reset the shaking animation after a short delay
    setTimeout(() => {
      this.setState({ isShaking: false });
    }, 400);
  };







  render() {
    return (
      




      <div className="center-card bg-transperant">
 <div
          className="bg-transperant"
          style={{
            width: "fit-content",
            textAlign: "center",
            margin: "auto",
            padding: "15px",
          }}>
<h1 className="heading text-black text-sm " style={{ textShadow: "0px 0px 1px #fff" }}>
  {this.state.advice}
</h1>









        </div>
        </div>
    );
  }
}

export default AdviceCard;