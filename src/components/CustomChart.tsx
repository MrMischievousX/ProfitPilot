import React from 'react';
import {LineChart, TLineChartDataProp} from 'react-native-wagmi-charts';
import {COLORS} from '../constants/colors';
import {window} from '../constants/layout';

interface props {
  chartData: TLineChartDataProp;
}

const CustomChart = ({chartData}: props) => {
  return (
    <LineChart.Provider data={chartData} yRange={{min: -10, max: 60}}>
      <LineChart width={window.width - 32} height={200}>
        <LineChart.Path color={COLORS.primary} width={5}>
          {[1, 2, 3].map(item => {
            return <LineChart.Gradient key={item} />;
          })}

          {[1, 6, 12, 18, 24, 28].map(item => {
            return (
              <LineChart.Dot
                color={COLORS.primary}
                size={6}
                outerSize={12}
                hasOuterDot
                pulseBehaviour="always"
                at={item}
                key={item}
              />
            );
          })}
        </LineChart.Path>
        <LineChart.CursorCrosshair
          color={COLORS.primary}
          size={12}
          outerSize={24}>
          <LineChart.Tooltip
            position="top"
            textProps={{
              format: ({value}) => {
                'worklet';
                return `$${value}`;
              },
            }}
            textStyle={{fontSize: 14, fontWeight: '600'}}
          />
          <LineChart.HoverTrap />
        </LineChart.CursorCrosshair>
        <LineChart.CursorLine color={COLORS.primary} />
      </LineChart>
    </LineChart.Provider>
  );
};

export default React.memo(CustomChart);
