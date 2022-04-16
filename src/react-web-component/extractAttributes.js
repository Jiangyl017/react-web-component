/*
 * @Author: 姜跃龙
 * @Date: 2022-04-14 21:27:00
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-16 03:27:21
 * @Description: file content
 */
/**
 * @description: 获取节点的属性并转换为驼峰格式
 * @param {*} nodeMap
 * @return {*}
 */
export default function extractAttributes(nodeMap) {
  if (!nodeMap.attributes) {
    return {};
  }

  let obj = {};
  let attribute;
  const attributesAsNodeMap = [...nodeMap.attributes];
  const attributes = attributesAsNodeMap.map((attribute) => ({
    [attribute.name]: attribute.value,
  }));

  for (attribute of attributes) {
    const key = Object.keys(attribute)[0];
    const camelCasedKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    obj[camelCasedKey] = attribute[key];
  }

  return obj;
}
