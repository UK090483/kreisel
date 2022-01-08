import { useNavigation } from "../../NavigationContext";
import {
  NavigationItemBaseComponent,
  NavigationLinkComponent,
  NavItem,
} from "../../types";

import { NavigationModulDropdown } from "../Dropdown/NavigationModulDropdown";

export interface NavItemProps extends NavItem {
  NavigationLink?: NavigationLinkComponent;
  NavigationItemBase?: NavigationItemBaseComponent;
}

const NavigationItem: React.FC<NavItemProps> = (props) => {
  const { label, items, link, NavigationLink, NavigationItemBase } = props;
  const hasItems = !!items && items.length > 0;
  const hasLink = !!link && !!link.href;

  const {
    NavItemBase: DefaultNavigationItemBase,
    NavItemLink: DefaultNavigationLink,
  } = useNavigation();

  const NavigationLinkComponent = NavigationLink
    ? NavigationLink
    : DefaultNavigationLink;

  const NavigationItemBaseComponent = NavigationItemBase
    ? NavigationItemBase
    : DefaultNavigationItemBase;

  if (!hasItems && hasLink) {
    return (
      <NavigationLinkComponent {...link}>
        <NavigationItemBaseComponent props={props} place="link">
          {label}
        </NavigationItemBaseComponent>
      </NavigationLinkComponent>
    );
  }

  if (hasItems) {
    return (
      <NavigationModulDropdown items={items}>{label}</NavigationModulDropdown>
    );
  }
  return (
    <NavigationItemBaseComponent props={props}>
      {label}
    </NavigationItemBaseComponent>
  );
};

export default NavigationItem;
