// import React, { useContext } from 'react'
// import LiveChart from '../blocks/LiveChart'
// import { DContext } from '../../context/Datacontext'


// export const PatientChart = () => {
//     const { fieldOne, fieldTwo, fieldThree, fieldFour,fieldFive, controls ,recentFieldFive , currentUser , userData} = useContext(DContext)

//      console.log("userData",userData)
//      console.log("currentUser" , currentUser)

//     if (!fieldOne || !fieldTwo || !fieldThree || !fieldFour ) {
//         return <div>Loading...</div>
//     }
//   return (
//     //   <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
//     //       {[fieldOne, fieldTwo, fieldThree, fieldFour, fieldFive].map((chartData, i) => (
//     //           <div
//     //               className="border rounded-xl shadow-md bg-white w-full md:w-[45%] p-3"
//     //               key={i}
//     //           >
//     //               <LiveChart
//     //                   data={[chartData]}
//     //                   color={chartData.color}
//     //                   title={chartData.seriesName}
//     //                   lineStyle="straight"
//     //                   lineWidth={2}
//     //                   chartType="line"
//     //                   controls={controls}
//     //               />
//     //           </div>
//     //       ))}
//     //        </div>

//  <div className='px-10'>
//           <div className="border rounded-xl shadow-md bg-white w-full p-4 mt-6">
//               <LiveChart
//                   data={[
//                       fieldOne,
//                       fieldTwo,
//                       fieldThree,
//                       fieldFour,
//                   ]}
//                   lineStyle="straight"
//                   lineWidth={2}
//                   chartType="line"
//                   controls={controls}
//               />
//           </div>
//  </div>
//   )
// }



import React, { useContext } from "react";
import LiveChart from "../blocks/LiveChart";
import { DContext } from "../../context/Datacontext";

export const PatientChart = () => {

  const { userData, currentUser, controls } = useContext(DContext);

  if (!userData || !userData.feeds) {
    return <div>Loading...</div>;
  }

  // filter patient data
  const filteredFeeds = userData.feeds.filter(
    (item) => Number(item.field5) === Number(currentUser.id)
  );

  if (filteredFeeds.length === 0) {
    return <div className="text-center mt-10">No Data</div>;
  }

  const timeAxis = filteredFeeds.map(i => i.created_at);

  const fieldOne = {
    seriesName: "Temperature",
    color: "#ff6384",
    "x-axis": timeAxis,
    "y-axis": filteredFeeds.map(i => Number(i.field1))
  };

  const fieldTwo = {
    seriesName: "Air Pressure",
    color: "#36a2eb",
    "x-axis": timeAxis,
    "y-axis": filteredFeeds.map(i => Number(i.field2))
  };

  const fieldThree = {
    seriesName: "Heart Rate",
    color: "#4bc0c0",
    "x-axis": timeAxis,
    "y-axis": filteredFeeds.map(i =>
      Number(i.field3) === -999 ? null : Number(i.field3)
    )
  };

  const fieldFour = {
    seriesName: "SpO2",
    color: "#9966ff",
    "x-axis": timeAxis,
    "y-axis": filteredFeeds.map(i => Number(i.field4))
  };

  return (
    <div className="px-10">
      <div className="border rounded-xl shadow-md bg-white w-full p-4 mt-6">

        <LiveChart
          data={[
            fieldOne,
            fieldTwo,
            fieldThree,
            fieldFour
          ]}
          lineStyle="straight"
          lineWidth={2}
          chartType="line"
          controls={controls}
        />

      </div>
    </div>
  );
};