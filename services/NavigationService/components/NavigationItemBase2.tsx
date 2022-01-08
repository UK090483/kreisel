import Svg from "@components/Svg";

export type NavItemBaseProps = {
  icon?: boolean;
  hover?: boolean;
  bold?: boolean;
};

export const NavigationModulItemBase: React.FC<NavItemBaseProps> = ({
  children,
  icon,
  hover,
  bold,
}) => {
  console.log("NavigationModulItemBase");

  return (
    <span
      className={`block px-5 bg-green-400 py-12 leading-none  text-base  ${
        bold ? " font-bold " : ""
      } `}
    >
      {children}
      {icon && (
        <Svg
          className={`transition-transform  ${
            hover ? "transform rotate-90 translate-x-1 scale-100" : "scale-75"
          }`}
          icon="chevronRight"
        />
      )}
    </span>
  );
};

export default NavigationModulItemBase;

interface NavigationModulButton {
  variant: "listHeader" | "Link" | "Button";
}

export const NavigationModulListHeader: React.FC<NavigationModulButton> = ({
  children,
}) => {
  return <NavigationModulItemBase>{children}</NavigationModulItemBase>;
};
