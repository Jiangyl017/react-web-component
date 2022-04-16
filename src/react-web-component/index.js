/*
 * @Author: 姜跃龙
 * @Date: 2022-04-14 21:27:00
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-16 13:35:41
 * @Description: file content
 */
import retargetEvents from "react-shadow-dom-retarget-events";
import getStyleElementsFromReactWebComponentStyleLoader from "./getStyleElementsFromReactWebComponentStyleLoader";
import {
  renderReact2Node,
  getPropsFromNode,
  sendPropsToReact,
} from "./prop-bridge";
import createRef from "react-create-ref";

export default {
  /**
   * @param {JSX.Element} app
   * @param {string} tagName - The name of the web component. Has to be minus "-" delimited.
   * @param {boolean} useShadowDom - If the value is set to "true" the web component will use the `shadowDom`. The default value is true.
   */
  create: (app, tagName, mode) => {
    console.log("create", { app, tagName, mode });
    const proto = class extends HTMLElement {
      constructor() {
        super();
        console.log("constructor", { app, tagName, mode });
        this.propBridgeRef = createRef();
        this.rootNode = null;
        switch (mode) {
          case "closed":
            this.rootNode = this.attachShadow({ mode: "closed" });
            break;
          case "element":
            this.rootNode = this;
            break;
          default:
            this.rootNode = this.attachShadow({ mode: "open" });
            break;
        }
        this.targetNode = document.createElement("div");
        this.rootNode.appendChild(this.targetNode);
        this.addStyle();
        // this.props = getPropsFromNode(this);
        this.mount();
      }

      // 挂载react组件
      async mount() {
        // 保存Ref用于后续更新props
        const { propBridgeRef } = await renderReact2Node(
          app,
          this.props,
          this.targetNode
        );
        this.propBridgeRef.current = propBridgeRef;
        this.setProps(this.props);
        // 修复react事件在shadowDom中不能触发的问题
        retargetEvents(this.targetNode);
      }

      // 更新react组件Props
      setProps = (newProps) => {
        console.log("setProps", { newProps });
        this.props = { ...this.props, ...newProps };
        sendPropsToReact(this.propBridgeRef, this.props);
      };

      /**
       * @description: 添加样式至shadowDom
       * @param {*}
       * @return {*}
       */
      addStyle() {
        const styles = getStyleElementsFromReactWebComponentStyleLoader();
        console.log("addStyle", {
          styles,
          targetNode: this.targetNode,
          rootNode: this.rootNode,
        });
        styles.forEach((style) => {
          const styleElement = document.createElement("style");
          styleElement.innerHTML = style.innerHTML;
          this.rootNode.appendChild(styleElement);
        });
      }

      //当自定义元素第一次被连接到文档DOM时被调用
      connectedCallback() {
        console.log("connectedCallback", {});
      }

      // 当自定义元素与文档DOM断开连接时被调用
      disconnectedCallback() {
        console.log("disconnectedCallback", {});
      }

      // 当自定义元素的一个属性被增加、移除或更改时被调用
      attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        console.log("attributeChangedCallback", {
          attributeName,
          oldValue,
          newValue,
          namespace,
        });
        this.setProps({ [attributeName]: newValue });
      }

      // 当自定义元素被移动到新文档时被调用
      adoptedCallback(oldDocument, newDocument) {
        console.log("adoptedCallback", {
          oldDocument,
          newDocument,
        });
      }
    };

    customElements.define(tagName, proto);
  },
};
