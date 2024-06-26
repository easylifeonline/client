import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import api from "../helpers/api";
import { useUser } from './UserContext';
import '../styles/views/ClickedProductsChart.scss';

const ClickedProductsChart = () => {
  const [clickedProducts, setClickedProducts] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useUser();
  const [chartType, setChartType] = useState('Bar');

  useEffect(() => {
    const fetchClickedProducts = async () => {
      try {
        const response = await api.get('clicked-products/');
        setClickedProducts(response.data);
      } catch (error) {
        console.error('Error fetching clicked products:', error);
        setErrorMessage('Failed to load clicked products.');
      }
    };

    const fetchVendorProducts = async () => {
      if (user && user.username) {
        try {
          const response = await api.get('products/', {
            params: { vendor: user.username },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setVendorProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchClickedProducts();
    fetchVendorProducts();
  }, [user]);

  // Map product IDs to product titles
  const productTitleMap = vendorProducts.reduce((map, product) => {
    map[product.id] = product.title;
    return map;
  }, {});

  // Generate dynamic colors
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * 30 % 360}, 70%, 50%)`);
    }
    return colors;
  };

  const labels = clickedProducts.map(item => productTitleMap[item.product] || 'Unknown Product');
  const dataCounts = clickedProducts.map(item => item.count);
  const backgroundColors = generateColors(labels.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Product Click Frequency',
        data: dataCounts,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false,
      }
    ]
  };

  const radarChartData = {
    labels,
    datasets: [
      {
        label: 'Product Click Frequency',
        data: dataCounts,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  const renderChart = () => {
    switch (chartType) {
      case 'Line':
        return <Line data={chartData} />;
      case 'Pie':
        return <Pie data={chartData} />;
      case 'Doughnut':
        return <Doughnut data={chartData} />;
      case 'Radar':
        return <Radar data={radarChartData} />;
      case 'Bar':
      default:
        return <Bar data={chartData} />;
    }
  };

  return (
    <div className="chart-container">
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="chartType">Select Chart Type: </label>
        <select id="chartType" value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="Bar">Bar</option>
          <option value="Line">Line</option>
          <option value="Pie">Pie</option>
          <option value="Radar">Radar</option>
          <option value="Doughnut">Doughnut</option>
        </select>
      </div>
      <div className={`chart ${chartType.toLowerCase()}-chart`}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ClickedProductsChart;
