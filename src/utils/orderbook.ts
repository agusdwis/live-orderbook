/* eslint-disable no-lonely-if */
const roundToNearest = (value: number, interval: number) => {
  return Math.floor(value / interval) * interval;
};

const groupByPrice = (levels: number[][]): number[][] => {
  return levels
    .map((level, idx) => {
      const nextLevel = levels[idx + 1];
      const prevLevel = levels[idx - 1];

      if (nextLevel && level[0] === nextLevel[0]) {
        return [level[0], level[1] + nextLevel[1]];
      }

      if (prevLevel && level[0] === prevLevel[0]) {
        return [];
      }

      return level;
    })
    .filter((level) => level.length > 0);
};

const groupByPriceReduce = (levels: number[][]): number[][] => {
  const groupedData = levels.reduce((result: number[][], item) => {
    const key = item[0];
    const index = result.findIndex((arr) => arr[0] === key);
    if (index === -1) {
      result.push([key, item[1]]);
    } else {
      result[index][1] += item[1];
    }
    return result;
  }, []);

  return groupedData;
};

const groupByTicketSize = (
  levels: number[][],
  ticketSize: number
): number[][] => {
  return groupByPriceReduce(
    levels.map((level) => [roundToNearest(level[0], ticketSize), level[1]])
  );
};

const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat('en-US').format(arg);
};

const formatPrice = (arg: number): string => {
  return arg.toLocaleString('en', {
    useGrouping: true,
    minimumFractionDigits: 2,
  });
};

const addTotalSums = (orders: number[][]): number[][] => {
  // console.log('DEBUG::  orders', orders)
  const totalSums: number[] = [];

  return orders.map((order: number[], idx) => {
    const size: number = order[1];
    if (typeof order[2] !== 'undefined') {
      return order;
    }

    const updatedLevel = [...order];
    const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
    updatedLevel[2] = totalSum;
    totalSums.push(totalSum);

    return updatedLevel;
  });
};

const addDepths = (orders: number[][], maxTotal: number): number[][] => {
  return orders.map((order) => {
    if (typeof order[3] !== 'undefined') {
      return order;
    }

    const calculatedTotal: number = order[2];
    const depth = (calculatedTotal / maxTotal) * 100;
    const updatedOrder = [...order];
    updatedOrder[3] = depth;
    return updatedOrder;
  });
};

const getMaxTotalSum = (orders: number[][]): number => {
  const maxSecondValue = orders.reduce((max, item) => {
    const secondValue = item[2];
    return Math.max(max, secondValue);
  }, Number.NEGATIVE_INFINITY);

  return maxSecondValue;
};

const removePriceLevel = (price: number, levels: number[][]): number[][] =>
  levels.filter((level) => level[0] !== price);

const updatePriceLevel = (
  updatedLevel: number[],
  levels: number[][]
): number[][] => {
  return levels.map((level) => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  });
};

const levelExists = (
  deltaLevelPrice: number,
  currentLevels: number[][]
): boolean => currentLevels.some((level) => level[0] === deltaLevelPrice);

const addPriceLevel = (
  deltaLevel: number[],
  levels: number[][]
): number[][] => {
  return [...levels, deltaLevel];
};

const applyDeltas = (
  currentLevels: number[][],
  orders: number[][]
): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    // If new size is zero - delete the price level
    if (deltaLevelSize === 0 && updatedLevels.length > 25) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      // If the price level exists and the size is not zero, update it
      if (levelExists(deltaLevelPrice, currentLevels)) {
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else {
        // If the price level doesn't exist in the orderbook and there are less than 25 levels, add it
        if (updatedLevels.length < 25) {
          updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
        }
      }
    }
  });

  return updatedLevels;
};

const convertArrayToNumber = (array: string[][]): number[][] => {
  return array
    .map((item) => [parseFloat(item[0]), parseFloat(item[1])])
    .filter((item) => item[1] !== 0);
};

interface SubArray extends Array<number> {
  0: number;
  1: number;
  2: number;
}

function filterDatabyThreshold(
  data: SubArray[],
  threshold: number,
  useMin: boolean = true
): SubArray[] {
  const firstValues: number[] = data.map((item) => item[0]);
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  const thresholdFunction: (values: number[]) => number = useMin
    ? Math.min
    : Math.max;
  const minMaxValue: number = thresholdFunction(firstValues);
  const filteredData: SubArray[] = data.filter(
    (item) => item[0] >= minMaxValue - threshold
  );

  return filteredData;
}

export {
  roundToNearest,
  groupByPrice,
  groupByPriceReduce,
  groupByTicketSize,
  formatNumber,
  formatPrice,
  addTotalSums,
  addDepths,
  getMaxTotalSum,
  removePriceLevel,
  levelExists,
  addPriceLevel,
  applyDeltas,
  convertArrayToNumber,
  filterDatabyThreshold,
};
