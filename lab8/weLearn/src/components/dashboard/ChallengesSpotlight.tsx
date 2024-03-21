// ChallengesSpotlight.js
import React from 'react';

type challenge = {
    title: string,
    description : string, 
    id: number,
}

const ChallengeCard = ({ challenge } : {challenge : challenge}) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{challenge.title}</h2>
      <p>{challenge.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-accent">Join Challenge</button>
      </div>
    </div>
  </div>
);

const ChallengesSpotlight = ({ challenges } : {challenges : challenge[]}) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Challenges Spotlight</h2>
    <div className="flex flex-wrap gap-4">
      {challenges.map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}
    </div>
  </div>
);

export default ChallengesSpotlight;