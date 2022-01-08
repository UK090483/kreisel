import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "../types";
import DefaultNavigationItemBase from "./NavigationItemBase";
import DefaultNavigationLink from "./NavigationLink";
import { NavigationModulDropdown } from "./NavigationModulDropdown/NavigationModulDropdown";

export interface NavItemProps extends NavItem {
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
}

const NavigationItem: React.FC<NavItemProps> = (props) => {
  const { label, items, link, NavigationLink, NavigationItemBase } = props;
  const hasItems = !!items && items.length > 0;
  const hasLink = !!link && !!link.href;

  const NavigationLinkComponent = NavigationLink
    ? NavigationLink
    : DefaultNavigationLink;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  if (!hasItems && hasLink) {
    return (
      <NavigationLinkComponent
        NavigationItemBase={NavigationItemBaseComponent}
        {...link}
      >
        {label}
      </NavigationLinkComponent>
    );
  }

  if (hasItems) {
    return (
      <NavigationModulDropdown items={items}>{label}</NavigationModulDropdown>
    );
  }
  return <NavigationItemBaseComponent>{label}</NavigationItemBaseComponent>;
};

export default NavigationItem;
