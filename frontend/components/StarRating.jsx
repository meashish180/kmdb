import { useState } from 'react';

function StarRating({ totalStars = 10, onRate, currentRating = 0 }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={i}
            className={`star ${starValue <= (hovered || currentRating) ? 'active' : ''}`}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onRate(starValue)}
          >
            ★
          </span>
        );
      })}
      <span className="rating-label">
        {hovered || currentRating > 0 ? `${hovered || currentRating} / ${totalStars}` : 'Rate this movie'}
      </span>
    </div>
  );
}

export default StarRating;