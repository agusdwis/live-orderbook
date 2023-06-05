/* eslint-disable prettier/prettier */
import { FunctionComponent } from 'react';

import { OrderType } from '@/constants/common';

interface DepthVisualizerProps {
  depth: number;
  orderType: number;
  isMobile: boolean;
}

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({
  depth,
  orderType,
  isMobile,
}) => {
  const isBorderCustom = orderType === OrderType.BIDS && !isMobile;
  return (
    <div
      style={{
        backgroundColor: `${orderType === OrderType.BIDS ? '#113534' : '#3d1e28'
          }`,
        height: '20px',
        width: `${depth}%`,
        maxWidth: '100%',
        position: 'absolute',
        top: 0,
        right: `${isBorderCustom ? 0 : 'unset'}`,
        zIndex: 1,
        opacity: 0.9,
        borderTopLeftRadius: `${isBorderCustom ? '6px' : 0}`,
        borderBottomLeftRadius: `${isBorderCustom ? '6px' : 0}`,
        borderTopRightRadius: `${isBorderCustom ? 0 : '6px'}`,
        borderBottomRightRadius: `${isBorderCustom ? 0 : '6px'}`,
      }}
    />
  );
};

export default DepthVisualizer;
