import Svg from "@components/Svg";

export type NavItemBaseProps = {
  icon?: boolean;
  hover?: boolean;
  bold?: boolean;
  place?: "link" | "dropdown" | "header";
  props: { [k: string]: any };
  active: boolean;
};

export const NavigationItemBase: React.FC<NavItemBaseProps> = ({
  children,
  icon,
  hover,
  bold,
}) => {
  return (
    <span
      className={`block px-5 py-3 leading-none  text-base ${
        bold ? " font-bold " : ""
      } `}
    >
      {children}
      {icon && (
        <Svg
          className={` transition-transform  ${
            hover ? "transform rotate-90 translate-x-1 scale-100" : "scale-75"
          }`}
          icon="chevronRight"
        />
      )}
    </span>
  );
};

export default NavigationItemBase;
