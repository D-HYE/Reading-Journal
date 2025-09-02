import React, { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'


type StarRateProps = {
    rateVal?: number;
    onChange?: (rate: number) => void;
    readOnly?: boolean;
}


export default function StarRate({rateVal = 0, onChange, readOnly = false}:StarRateProps) {
  const [rating, setRating] = useState(rateVal)

  useEffect(() => {
    setRating(rateVal);
  }, [rateVal]);

  const handleRating = (rate: number) => {
    if(readOnly) return;
    setRating(rate);
    onChange?.(rate);
  }

  return (
    <Rating
      readonly={readOnly}
      initialValue={rateVal ?? rating}
      onClick={handleRating}
      size={36}
      transition
      allowFraction
      fillColor='var(--c-point)'
      emptyColor='var(--d-gr2)'
      showTooltip
      tooltipDefaultText='0.0'
      tooltipClassName='tooltip'
    />

  )
}
