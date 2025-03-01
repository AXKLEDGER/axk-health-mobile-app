import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/Utils/Colors';

const { width: screenWidth } = Dimensions.get('window');

// Mock data generation function
const generateMockData = (period) => {
  switch (period) {
    case 'week':
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)),
        }],
        total: 0
      };
    case 'month':
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 30)),
        }],
        total: 0
      };
    case 'sixMonths':
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50)),
        }],
        total: 0
      };
    default:
      return {
        labels: [],
        datasets: [{ data: [] }],
        total: 0
      };
  }
};

export default function AdvancedBarChartComponent() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('week');

  // Time period options
  const timePeriods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'sixMonths', label: 'Last 6 Months' }
  ];

  // Generate and memoize chart data
  const chartData = useMemo(() => {
    const data = generateMockData(selectedTimePeriod);

    // Calculate total
    data.total = data.datasets[0].data.reduce((a, b) => a + b, 0);

    return data;
  }, [selectedTimePeriod]);

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: Colors.WHITE,
    backgroundGradientTo: Colors.WHITE,
    color: (opacity = 1) => `rgba(21, 134, 140, ${opacity})`,
    barPercentage: 0.6,
    fillShadowGradient: Colors.PRIMARY,
    fillShadowGradientOpacity: 0.5,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#e3e3e3',
      strokeDasharray: '0',
    },
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Pro Activity</Text>

          {/* Time Period Selector */}
          <View style={styles.periodSelectorContainer}>
            {timePeriods.map((period) => (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.periodButton,
                  selectedTimePeriod === period.key && styles.activePeriodButton
                ]}
                onPress={() => setSelectedTimePeriod(period.key)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedTimePeriod === period.key && styles.activePeriodButtonText
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Total Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Ionicons
              name="trending-up"
              size={24}
              color={Colors.PRIMARY}
            />
            <Text style={styles.metricLabel}>Total</Text>
            <Text style={styles.metricValue}>{chartData.total}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons
              name="stats-chart"
              size={24}
              color={Colors.PRIMARY}
            />
            <Text style={styles.metricLabel}>Average</Text>
            <Text style={styles.metricValue}>
              {(chartData.total / chartData.datasets[0].data.length).toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
            width={screenWidth - 70}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            showValuesOnTopOfBars
            fromZero
            withInnerLines={false}
            style={styles.chart}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerContainer: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: screenWidth * 0.045,
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    marginBottom: 10,
  },
  periodSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  periodButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  activePeriodButton: {
    backgroundColor: Colors.PRIMARY,
  },
  periodButtonText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
  },
  activePeriodButtonText: {
    color: Colors.WHITE,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontFamily: 'Poppins-Medium',
    color: Colors.SECONDARY,
    fontSize: 12,
    marginTop: 5,
  },
  metricValue: {
    fontFamily: 'Poppins-Medium',
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});