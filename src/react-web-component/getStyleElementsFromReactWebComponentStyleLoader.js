/*
 * @Author: 姜跃龙
 * @Date: 2022-04-14 21:27:00
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-16 13:11:55
 * @Description: file content
 */
/**
 * react-web-component-style-loader用于处理打包时单独生成的css文件，会在加载时注入到shadow-dom中
 * An optional library which is conditionally added
 * @returns {[Node]}
 */
export default () => {
  return document.querySelectorAll(
    "style-store[data-web-component-style='antd-tree']"
  );
};
