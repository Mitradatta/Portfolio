import React from 'react';
import { Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">{skill.category}</h3>
      <div className="flex flex-wrap gap-2">
        {skill.list.map((item, index) => (
          <span 
            key={index} 
            className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 text-sm font-medium rounded-md shadow-sm transition-transform hover:scale-105"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
