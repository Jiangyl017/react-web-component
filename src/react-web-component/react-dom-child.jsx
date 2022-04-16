/*
 * @Author: 姜跃龙
 * @Date: 2022-04-16 00:05:05
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-16 03:24:32
 * @Description: file content
 */
import React from "react";
import "child-replace-with-polyfill";
import createRef from "react-create-ref";

/**
 * @description: 包装子节点，将原生节点替换为React节点
 * @param {*}
 * @return {*}
 */
export class ReactDomChild extends React.Component {
  ref = createRef();
  componentDidMount() {
    const childNodes = this.props.children;
    this.ref.current.replaceWith(...childNodes);
  }
  render() {
    return <div ref={this.ref} />;
  }
}
