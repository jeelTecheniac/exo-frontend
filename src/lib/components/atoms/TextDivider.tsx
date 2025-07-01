import Typography from "./Typography";

interface Props {
  text: string;
}

const TextDivider = ({ text }: Props) => {
  return (
    <div className="flex w-full gap-2.5 items-center">
      <div className="h-px w-full bg-secondary-30"></div>
      <Typography
        className="text-secondary-60"
        element="p"
        size="base"
        weight="normal"
      >
        {text}
      </Typography>
      <div className="h-px w-full bg-secondary-30"></div>
    </div>
  );
};
export default TextDivider;
