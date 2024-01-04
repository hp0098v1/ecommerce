import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="common-container">
      <h2 className="h3-semibold text-center mt-8">Page Not Found</h2>
      <div className="flex justify-center -m-8">
        <img
          className="w-80 h-80 md:w-[25rem] md:h-[25rem] object-cover"
          src="/assets/images/404-error2.png"
          alt="404-not-found"
        />
      </div>
      <div className="flex justify-center">
        <Button onClick={() => navigate("/")}>Back To Home</Button>
      </div>
    </section>
  );
};

export default NotFound;
