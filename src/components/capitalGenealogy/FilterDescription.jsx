import React, { memo } from 'react';

const FILTER_DESCRIPTIONS = {
  cashcow: '筛选条件：外地企业、级别为核心/一级/二级、营收不低于1亿元',
  newproject: '筛选条件：外地企业、级别为核心/一级/二级、近3年成立、注册资本不低于5000万元'
};

const FilterDescription = memo(({ type }) => (
  <div className="mb-4 text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded">
    {FILTER_DESCRIPTIONS[type] || ''}
  </div>
));

FilterDescription.displayName = 'FilterDescription';

export default FilterDescription;
