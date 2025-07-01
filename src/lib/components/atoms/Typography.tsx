type Size =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "xl_2"
  | "xl_3"
  | "xl_4"
  | "xl_5";
type Weight = "normal" | "semibold" | "bold" | "extrabold";
type Element = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";

export type TypographyProps = {
  size?: Size;
  weight?: Weight;
  element?: Element;
  children?: React.ReactNode;
  className?: string;
};

const fontSize = {
  xs: "text-xs", // size: 12px
  sm: "text-sm", // size: 14 px
  base: "text-base", // size: 16 px
  lg: "text-lg", //size: 18 px
  xl: "text-xl", //size: 20 px
  xl_2: "text-2xl", //size: 24px
  xl_3: "text-3xl", //size: 30px
  xl_4: "text-4xl", //size: 36px
  xl_5: "text-5xl", //size: 48px
};

const fontWeight = {
  normal: "font-normal", //weight: 400
  semibold: "font-medium", //weight: 500
  bold: "font-semibold", //weight: 600
  extrabold: "font-bold", //weight: 700
};

type ElementProp = Pick<TypographyProps, "children" | "className">;

const AvailableTag = {
  h1: (props: ElementProp) => <h1 {...props} />,
  h2: (props: ElementProp) => <h2 {...props} />,
  h3: (props: ElementProp) => <h3 {...props} />,
  h4: (props: ElementProp) => <h4 {...props} />,
  h5: (props: ElementProp) => <h5 {...props} />,
  h6: (props: ElementProp) => <h6 {...props} />,
  p: (props: ElementProp) => <p {...props} />,
  span: (props: ElementProp) => <span {...props} />,
};

const Typography = ({
  size = "sm",
  weight = "normal",
  element = "p",
  className,
  children,
}: TypographyProps) => {
  const Element = AvailableTag[element];

  return (
    <Element
      className={`${fontSize[size]} ${fontWeight[weight]} ${className || ""}`}
    >
      {children}
    </Element>
  );
};

export default Typography;
