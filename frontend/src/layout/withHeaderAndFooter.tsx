import React from "react";
import { ComponentType } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function withHeaderAndFooter(Component: ComponentType, title?: string) {
  return class extends React.Component {
    render() {
      return (
        <div className="flex flex-col h-full">
          <Header title={title} />
          <Component />
          <Footer />
        </div>
      );
    }
  };
}
