import InclusionCard from "./InclusionCard";

const mockInclusions = [
  {
    icon: "/assets/icons/shipping.svg",
    title: "Free Shipping",
    subtitle: "Free shipping for order above $150",
  },
  {
    icon: "/assets/icons/dollar.svg",
    title: "Money Guarantee",
    subtitle: "Within 30 days for an exchange",
  },
  {
    icon: "/assets/icons/support.svg",
    title: "Online Support",
    subtitle: "24 hours a day, 7 days a week",
  },
  {
    icon: "/assets/icons/payment.svg",
    title: "Flexible Payment",
    subtitle: "Pay with multiple credit cards",
  },
];

const Inclusions = () => {
  return (
    <div className="py-12 sm:py-18 lg:py-24 bg-background/90">
      <ul className="inclusions">
        {mockInclusions.map((inclusion) => (
          <InclusionCard key={inclusion.title} inclusion={inclusion} />
        ))}
      </ul>
    </div>
  );
};

export default Inclusions;
