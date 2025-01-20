import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

const Footer = () => {
  return (
    <div className="p-2.5">
      <Card>
        <div className="p-4">
          <div className="text-center text-default-500">
            <p>© {new Date().getFullYear()} Build by Yangwei. All rights reserved.</p>
            <p className="mt-1">
              Powered by{" "}
              <Link
                to="/13.com"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                NEST.REACT
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Footer; 