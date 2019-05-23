import React from 'react';

const Recommendation = (props) => {
  if (props.currentOdometerReading - props.prevOdometerReading < props.suggestedInterval) {
    return(
      <div className="negResp">Nah, you're good  💁🏻‍ You'll need an oil change in {props.suggestedInterval - (props.currentOdometerReading - props.prevOdometerReading)} miles</div>
    )
  } else {
    return (
      <div>Yep, it's time for an oil change 👩🏻‍🔧 You're {(props.currentOdometerReading - props.prevOdometerReading) - props.suggestedInterval} over the recommended mileage</div>
    )
  }
}

export default Recommendation;