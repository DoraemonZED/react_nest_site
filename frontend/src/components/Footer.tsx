import { Link } from 'react-router-dom';
import { Card } from "@heroui/card";
import { FadeIn } from './FadeIn';

const Footer = () => {
  return (
    <FadeIn
      delay={0.5}
      duration={0.5}
    >
      <div className="py-2.5">
      <Card>
        <div className="p-4">
          <div className="text-center text-default-500">
            <p>© {new Date().getFullYear()} Build by YANGWEI. All rights reserved.</p>
            <p className="mt-1">
              Powered by{" "}
              <Link
                to="/13.com"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nest&React
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
    </FadeIn>
  );
};

export default Footer; 