import { SPBComponent } from "../types";

export class BlockFactory {
  private static instance: BlockFactory;

  components: { [k: string]: SPBComponent } = {};

  public registerComponent(name: string, props: SPBComponent) {
    this.components[name] = props;
  }

  public registerComponents(components: SPBComponent[]) {
    components.forEach((c) => this.registerComponent(c.name, c));
  }

  public getComponent(name: string, props: any) {
    const C = this.components[name]?.component;
    return C ? <C {...props} /> : null;
  }

  public getRootQuery(rootName: string = "content") {
    const elementQuery = this.getRootElements()
      .map((c) => c.query)
      .join(" , ");
    return `${rootName}[]{${elementQuery}}`;
  }

  public getRootElements() {
    return Object.values(this.components);
  }

  public static getInstance(): BlockFactory {
    if (!BlockFactory.instance) {
      BlockFactory.instance = new BlockFactory();
    }

    return BlockFactory.instance;
  }
}

const blockFactory = BlockFactory.getInstance();

export default blockFactory;
