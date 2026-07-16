import React from "react";

interface ProjectCardProps {
  imageUrl: string;
  webPath: string;
  title: string;
  description: string;
  className?: string;
  name: string;
  setTop: (v: number) => void;
  id: number;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  webPath,
  title,
  description,
  className = "",
  style,
  name,
  setTop,
  id,
}) => {
  return (
    <div
      className={`
    w-64
    rounded-xl
    overflow-hidden
    border border-white/20
    bg-gradient-to-b from-[var(--card-1)] to-[var(--card-2)]
    shadow-[0_10px_25px_rgba(0,0,0,.35)]
    transition-all
    ${className}
  `}
      style={style}
      onClick={() => setTop(id)}
    >
      <img src={imageUrl} alt={title} width={200} height={160} className="h-40 w-full object-cover" />
      <div className="p-4 text-center min-h-32 flex flex-col justify-between">
        <a
          href={webPath}
          title={name}
          target="_blank"
          className="text-xl decoration underline underline-offset-4 font-bold text-[var(--text-color-2)] "
        >
          {title}
        </a>
        <p className="text-sm text-[var(--text-color)] ">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
