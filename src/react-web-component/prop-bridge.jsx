import React from "react";
import ReactDOM from "react-dom";
import { ReactDomChild } from "./react-dom-child";
import extractAttributes from "./extractAttributes";
/**
 * @description: PropBridge 保存props传递给它的state。然后将它们作为普通props传递给react组件。当你调用setProps时，它将调用setState，并将这些作为props传递给react组件。
 * @param {*} RComponent
 * @param {*} initialProps
 * @param {*} targetNode
 * @return {Promise} PropBridge挂载完成时会resolve返回PropBridgeRef
 */
export const renderReact2Node = (RComponent, initialProps, targetNode) =>
  new Promise((resolve, reject) => {
    class PropBridge extends React.PureComponent {
      state = { ...initialProps };
      setProps = (props) => this.setState(() => props);
      render() {
        return <RComponent {...this.props} {...this.state} />;
      }
    }
    // 初始化渲染
    const root = ReactDOM.createRoot(targetNode);
    root.render(
      <PropBridge
        ref={(propBridgeRef) => {
          resolve({ propBridgeRef });
        }}
      />
    );
  });

/**
 * @description: 发送props到react组件
 * @param {*} propBridgeRef
 * @param {*} props
 * @return {*}
 */
export const sendPropsToReact = (propBridgeRef, props) => {
  if (propBridgeRef && propBridgeRef.current) {
    propBridgeRef.current.setProps(props);
  }
};

/**
 * @description: 从自定义节点获取props及子节点
 * @param {*} node
 * @return {*}
 */
export const getPropsFromNode = (node) => {
  const mappedProps = extractAttributes(node);
  console.log(mappedProps);
  const children = Array.from(node.childNodes).map((e) => e.cloneNode(true));
  mappedProps.children = <ReactDomChild>{children}</ReactDomChild>;
  return mappedProps;
};
