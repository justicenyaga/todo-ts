import React from "react";

interface IComposeContext {
  components?: React.FC<{ children?: React.ReactNode }>[];
  children: React.ReactNode | undefined;
}

export default function ComposeContext(props: IComposeContext) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
}
