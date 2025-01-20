import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@heroui/card";
import { FadeIn } from './FadeIn';
import { Divider } from "@heroui/divider";

const Footer = () => {
  return (
    <FadeIn
      direction="up"
      delay={0.5}
      duration={0.5}
    >
      <div className="p-2.5">
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