import React from 'react';

interface ProjectCardProps {
  imageUrl: any;
  webPath: string;
  title: string;
  description: string;
  className?: string;
  name: string;
  setTop: any;
  id: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, webPath, title, description, className = '', name, setTop, id }) => {
  return (
    // We add the dynamic className here for styling the card stack
    <div onMouseEnter={() => setTop(id)} onFocus={() => setTop(id)} className={` shadow-[3px_3px_8px_0px_var(--shadow)]
      w-60 bg-gradient-to-b from-[var(--card-1)] to-[var(--card-2)] border-2 border-[var(--border-color)] rounded-lg 
      flex flex-col overflow-hidden transition-all duration-150 ease-in-out
      ${className}
    `}>
      <img src={imageUrl}  alt={title} className="w-full object-cover"  />
      <div className="p-3 text-center transition-all duration-1000 ease-in-out">
        <a href={webPath} title={name} target="_blank" className="text-xl decoration underline underline-offset-4 font-bold text-[var(--text-color-2)] transition-all duration-1000 ease-in-out">{title}</a>
        <p className="text-sm text-[var(--text-color)] transition-all duration-1000 ease-in-out">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;