/*
 * @Author: 姜跃龙
 * @Date: 2022-04-14 21:27:00
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-16 03:28:31
 * @Description: file content
 */
import React, { useRef, useState } from "react";
import { Button, TreeSelect } from "antd";
const { TreeNode } = TreeSelect;
const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-1",
      },
      {
        title: "Child Node2",
        value: "0-0-2",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
  },
];
const Demo = () => {
  const [value, setValue] = useState(undefined);
  const tree = useRef(undefined);
  const handleClick = () => {
    console.log(
      tree.current.setProps({
        treeData,
        getPopupContainer: () => tree.current.shadowRoot,
      })
    );
  };
  const handleClick2 = () => {
    console.log(
      tree.current.setProps({
        style: { width: "100%" },
      })
    );
  };
  const onChange = () => {
    setValue(value);
  };
  return (
    <div>
      origin:
      <div>
        <TreeSelect
          showSearch
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={onChange}
        >
          <TreeNode value="parent 1" title="parent 1">
            <TreeNode value="parent 1-0" title="parent 1-0">
              <TreeNode value="leaf1" title="leaf1" />
              <TreeNode value="leaf2" title="leaf2" />
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1">
              <TreeNode
                value="leaf3"
                title={<b style={{ color: "#08c" }}>leaf3</b>}
              />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
      web-component
      <div>
        <Button onClick={handleClick}>设置treeData</Button>
        <Button onClick={handleClick2}>设置宽度</Button>
        <antd-tree ref={tree} />
      </div>
    </div>
  );
};

export default Demo;
