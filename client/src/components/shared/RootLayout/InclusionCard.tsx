export type Inclusion = {
  icon: string;
  title: string;
  subtitle: string;
};
type InclusionCardProps = {
  inclusion: Inclusion;
};

const InclusionCard = ({ inclusion }: InclusionCardProps) => {
  return (
    <li>
      <img src={inclusion.icon} alt={inclusion.title} className="mb-4" />
      <h5 className="text-[18px] md:text-[22px] font-semibold">
        {inclusion.title}
      </h5>
      <p>{inclusion.subtitle}</p>
    </li>
  );
};

export default InclusionCard;
