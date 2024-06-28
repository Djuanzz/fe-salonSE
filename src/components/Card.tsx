import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Title = (props: Props) => {
  const { children } = props;
  return (
    <div className={"p-4 border-b"}>
      <h1 className={"text-2xl"}>{children}</h1>
    </div>
  );
};

const Body = (props: Props) => {
  const { children } = props;
  return <div className={"leading-release p-4"}>{children}</div>;
};

const Footer = (props: Props) => {
  const { children } = props;
  return <div className={"bg-slate-100 p-4 flex justify-end"}>{children}</div>;
};

const Card = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={`${className}bg-white text-black max-w-md w-full rounded overflow-hidden shadow-lg`}>
      <h1>{children}</h1>
    </div>
  );
};

Card.Title = Title;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
