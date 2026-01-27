import React from "react";
import {
  BrowseChallengesIcon,
  JoinChallengeIcon,
  VideoSubmissionIcon,
  LeaderboardIcon,
  RewardsSystemIcon,
  TrackProgressIcon,
} from "./LandingIcons";

const FeaturesSection = () => {
  const features = [
    {
      icon: <BrowseChallengesIcon />,
      title: "Browse Challenges",
      description:
        "Explore a list of available challenges across different categories.",
    },
    {
      icon: <JoinChallengeIcon />,
      title: "Join a Challenge",
      description: "Select a challenge and participate instantly.",
    },
    {
      icon: <VideoSubmissionIcon />,
      title: "Video Submissions",
      description: "Show your skills in 30–60s clips.",
    },
    {
      icon: <LeaderboardIcon />,
      title: "Leaderboard",
      description: "Track your wins and level up.",
    },
    {
      icon: <RewardsSystemIcon />,
      title: "Rewards System",
      description: "Earn money.",
    },
    {
      icon: <TrackProgressIcon />,
      title: "Track Progress",
      description: "View your completed challenges and activity.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#0C0E12] relative z-10">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-roboto)]">
            <span className="text-white">HiFun Core </span>
            <span className="bg-gradient-to-br from-[#BB877B] from-20% to-[#7B5EED] text-transparent bg-clip-text">
              Features
            </span>
          </h2>
          <p className="text-slate-400 font-[family-name:var(--font-inter)]">
            Everything you need to compete, create, and conquer.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="px-6 py-5 min-h-[190px] h-auto rounded-xl bg-gradient-to-br from-[#181B21] to-[#0F1115] border border-[#2B303B80] hover:border-white/[0.1] transition-colors group flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[linear-gradient(135deg,rgba(255,178,0,0.2)_0%,rgba(123,94,237,0.2)_100%)] border border-[#FFB2004D] flex items-center justify-center mb-4 group-hover:border-[#FFB20080] transition-colors shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[20px] mb-1 font-bold text-white font-[family-name:var(--font-roboto)]">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-[16px] leading-relaxed font-[family-name:var(--font-inter)]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
