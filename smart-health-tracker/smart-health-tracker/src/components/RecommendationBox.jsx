import React from 'react';

const RecommendationBox = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendation-box card">
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index} className="recommendation-item">
            <span className="icon">💡</span> {rec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationBox;
