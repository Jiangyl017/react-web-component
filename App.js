/*
 * @Author: 姜跃龙
 * @Date: 2022-04-14 19:44:54
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-14 19:44:54
 * @Description: file content
 */
/*
 * @Author: 姜跃龙
 * @Date: 2022-04-13 21:19:06
 * @LastEditors: 姜跃龙
 * @LastEditTime: 2022-04-13 22:23:31
 * @Description: file content
 */
import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const { TreeNode } = TreeSelect;

const Demo = () => {
  const [value, setValue] = useState(undefined);
  const onChange = () => {
    setValue(value);
  };
  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
          <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
        </TreeNode>
      </TreeNode>
    </TreeSelect>
  );
};


export default Demo;
