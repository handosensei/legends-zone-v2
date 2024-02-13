import React, {useState, useEffect} from 'react';
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";
import ReactApexChart from "react-apexcharts";
import {
  getHolderHoldingRewards,
  getHolderLegends,
} from "../../client/ApiMetaLegends";

import {getContractHealingDrone, getContractHoldingRewards} from "../../client/Contracts";

const BarGraph = ({ holderWallet, dataColors }) => {

  const [series, setSeries] = useState([]);

  const estimateQuantity = async (wallet) => {
    const holdingRewards = [
      { tokenId: 1, code:'cyber-weapon', quantity: 0, quantitySaved: 0},
      { tokenId: 2, code:'cyber-armor', quantity: 0, quantitySaved: 0},
      { tokenId: 3, code:'rough-pet', quantity: 0, quantitySaved: 0},
      { tokenId: 4, code:'roboter-weapon', quantity: 0, quantitySaved: 0},
      { tokenId: 5, code: 'matrix-angel-car', quantity: 0, quantitySaved: 0},
      { tokenId: null, code: 'healing-drone', quantity: 0, quantitySaved: 0},
      { tokenId: 6, code: 'ml-network-pass', quantity: 0, quantitySaved: 0},
      { tokenId: 7, code: 'particles-cosmetic-effect', quantity: 0, quantitySaved: 0},
      { tokenId: 8, code: 'shadow-gem', quantity: 0, quantitySaved: 0},
    ];
    const legends = await getHolderLegends(wallet);
    legends.forEach((legend) => {
      holdingRewards.forEach((holdingReward) => {
        if (legend.holdingRewards[holdingReward.code] === true) {
          holdingReward.quantity++;
        }
      });
    });

    const rewardsSaved = await getHolderHoldingRewards(wallet);
    const contract = await getContractHoldingRewards();
    const contractHealingDrone = await getContractHealingDrone();

    holdingRewards.forEach((holdingReward) => {
      holdingReward.quantitySaved = rewardsSaved[holdingReward.code].length;
    });

    const res = await contract.methods.holderEligibilities(wallet, 1).call();
    holdingRewards[0]['total'] = Number(res.total);
    holdingRewards[0]['claimed'] = Number(res.claimed);
    const res1 = await contract.methods.holderEligibilities(wallet, 2).call();
    holdingRewards[1]['total'] = Number(res1.total);
    holdingRewards[1]['claimed'] = Number(res1.claimed);
    const res2 = await contract.methods.holderEligibilities(wallet, 3).call();
    holdingRewards[2]['total'] = Number(res2.total);
    holdingRewards[2]['claimed'] = Number(res2.claimed);
    const res3 = await contract.methods.holderEligibilities(wallet, 4).call();
    holdingRewards[3]['total'] = Number(res3.total);
    holdingRewards[3]['claimed'] = Number(res3.claimed);
    const res4 = await contract.methods.holderEligibilities(wallet, 5).call();
    holdingRewards[4]['total'] = Number(res4.total);
    holdingRewards[4]['claimed'] = Number(res4.claimed);
    const res5 = await contractHealingDrone.methods.eligibilities(wallet).call();
    holdingRewards[5]['total'] = Number(res5.total);
    holdingRewards[5]['claimed'] = Number(res5.claimed);
    const res6 = await contract.methods.holderEligibilities(wallet, 6).call();
    holdingRewards[6]['total'] = Number(res6.total);
    holdingRewards[6]['claimed'] = Number(res6.claimed);
    const res7 = await contract.methods.holderEligibilities(wallet, 7).call();
    holdingRewards[7]['total'] = Number(res7.total);
    holdingRewards[7]['claimed'] = Number(res7.claimed);
    const res8 = await contract.methods.holderEligibilities(wallet, 8).call();
    holdingRewards[8]['total'] = Number(res8.total);
    holdingRewards[8]['claimed'] = Number(res8.claimed);

    const data = {
      eligibility: [],
      saved: [],
      claimable: [],
      minted: [],
    }

    holdingRewards.forEach((holdingReward) => {
      data.eligibility.push(holdingReward.quantity);
      data.saved.push(holdingReward.quantitySaved);
      data.claimable.push(holdingReward.total);
      data.minted.push(holdingReward.claimed);
    });

    return [
      {
        name: "Eligibility",
        data: data.eligibility,
      },
      {
        name: "Saved",
        data: data.saved,
      },
      {
        name: "Claimable",
        data: data.claimable,
      },
      {
        name: "Minted",
        data: data.minted,
      },
    ];
  }

  var chartGroupbarColors = getChartColorsArray(dataColors);
  var options = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: [
        'Cyber weapon',
        'Cyber armor',
        'Rough pet',
        'Roboter weapon',
        'Matrix-Angel car',
        'Healing drone',
        'ML Network pass',
        'Particles cosmetic effect',
        'Shadow gem'
      ],
    },
    colors: chartGroupbarColors
  };

  useEffect(() => {
    console.log(holderWallet);
    estimateQuantity(holderWallet).then((res) => {
      setSeries(res)
    });
  }, []);

  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        className="apex-charts"
        options={options}
        series={series}
        type="bar"
        height={510}
      />
    </React.Fragment>
  );
};

export default BarGraph;
