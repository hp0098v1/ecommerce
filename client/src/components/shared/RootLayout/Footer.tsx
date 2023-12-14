import { FOOTER_SOCIAL_MEDIA_ICONS } from "@/constants";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="footer common-container">
        <img
          className="h-6 md:h-8"
          src="/assets/images/logo-white.svg"
          alt="logo"
        />
        <p>©2023 Tech Haven. All Rights are reserved</p>
        <ul className="footer__social-list">
          {FOOTER_SOCIAL_MEDIA_ICONS.map((item) => (
            <li key={`footer-social-media-${item.alt}`}>
              <a href={item.url} target="_blank">
                <img className="w-7 h-7" src={item.imageUrl} alt={item.alt} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
